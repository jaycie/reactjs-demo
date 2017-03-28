
const showLog = true;

/**
 * 日志打印
 * @param requestInfo
 */
const loggerWrap = requestInfo => fetchFunc => {
  if (showLog) {
    let startTime = new Date().getTime();//开始请求时间
    return fetchFunc().then(result => {
     console.log(`${requestInfo}  success  result = ${JSON.stringify(result)} cost time = ${new Date().getTime() - startTime}ms`);
      return result;
    }).catch(err => {
     console.warn(`${requestInfo}  ${err}`);
      return Promise.reject(err);
    });
  }
  return fetchFunc();
};
/**
 * @param url 完整路径
 */
const getFetch = (url, cached) => {
  return fetch(url, {
    method: 'GET',
    headers: {
      Accept: '*/*',
      'Content-Type': 'application/json'
    }
  }).then((res)=>{
    return res.json();
  }).then((json)=>{
    return json;
  }).catch((e)=>{
    console.log(e);
  });
};

/**
 * @param url 完整路径
 */
const postFetch = url => jsonData => {
    return fetch(url, {
        method: 'POST',
        body: jsonData
    }).then((response)=>{
        return response.json();
    }).then((json)=>{
        return json;
    }).catch((e)=>{
       console.log(e);
    });
};

//拼接参数
const getParam = data => {
  return Object.entries(data).map(([key, value]) => {
    return `${key}=${value}`//TODO 是否得用encodeURI函数
  }).join('&');
};


/**
 * @param cached 是否优先本地缓存
 * @param path 相对路径
 */
const get = cached => (path, data) => {
  let url = path;
//  console.log("apiHelper:"+url);
  if (data) {
    url.append(`?${getParam(data)}`)
  }
  return loggerWrap(`GET  ${url}`)(() => {
    return getFetch(url, cached);
  });
};

/**
 * @param path 相对路径
 */
const post = cached => (path, params) => {
//    console.log(params);
    return loggerWrap(`POST  ${path}  ${params}`)(() => {
        return postFetch(path)(params);
    });
};


export function corsPostFetch(path, params){
  return fetch(path, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: params
  }).then(function(res) {
    return res.json();
  }).then(function(json){
    return json;
  }).catch(function(e) {
    console.log("fetch fail", JSON.stringify(params));
  });
};

export const getFetchFromCache = get(true);//缓存
export const getFetchNeverCached = get(false);//不缓存
export const postFetchFromCache = post(true);//缓存
export const postFetchNeverCached = post(false);//不缓存


