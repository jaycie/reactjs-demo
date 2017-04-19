import { AJAXHOST } from '../common/config';
import { corsPostFetch } from '../api/apiFetch';

module.exports = {
  login(email, pass, cb) {
    cb = arguments[arguments.length - 1]
    if (localStorage.token) {
      if (cb) cb(true)
      this.onChange(true)
      return
    }
    if(email===''){
      alert('请填写用户名');
      return;
    }else if(pass===''){
      alert('请填写密码');
      return;
    }else{
      pretendRequest(email, pass, (res) => {
        if (res.authenticated) {
          localStorage.token = res.token
          if (cb) cb(true)
          this.onChange(true)
        } else {
          if (cb) cb(false)
          this.onChange(false)
        }
      })
    }
      
  },

  getToken() {
    return localStorage.token
  },

  logout(cb) {
    delete localStorage.token
    if (cb) cb()
    this.onChange(false)
  },

  loggedIn() {
    return !!localStorage.token
  },

  onChange() {}
}

function pretendRequest(email, pass, cb) {
  const url = AJAXHOST+'user/login/'+email+'/'+pass;
    corsPostFetch(url).then(obj => {
      console.log(obj);
      if(obj.code===200 && obj.data){
        localStorage.uid = obj.data.uid;
        cb({
          authenticated: true,
          token: Math.random().toString(36).substring(7)
        })
      }else{
        cb({ authenticated: false })
      }
    });
}