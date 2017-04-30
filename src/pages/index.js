import React, { Component } from 'react';
import '../css/base.css';
import '../css/index.css';
import '../css/fontAwesome/css/font-awesome.min.css';
import NavSearch from '../components/navSearch';
import ShowProduct from '../components/showProduct';
import { AJAXHOST } from '../common/config';
import { Link } from 'react-router-dom';
import { corsPostFetch } from '../api/apiFetch';

export default class Index extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      cityData: [],
      navCurrentProvinceId: '',  //选中的是哪一个省
      productData:{},  //right side content
    };
  }
  componentWillMount() {
    console.log('componentWillMount');
  }

  render() {
    let serviceShows = this.state.cityData.map((value,index)=>{
      const pid = value.provinceId;
      let cls = pid=== this.state.navCurrentProvinceId ? 'current': '';
      return <li key={pid} className={cls} onClick={this.showProduct.bind(this, pid)}>{value.provinceName}</li>
    })

    return (
      <div className="App">
        <header>
          <NavSearch searchCb={this.searchCb.bind(this)}/>
        </header>
        <div className="wrapper">
          <div className="left-nav">
            <ul>
              {serviceShows}
            </ul>
          </div>

          <div className="right-content">
            <ShowProduct data={this.state.productData} />
          </div>
          
          <div className="button_shopping">
          	<Link to='/shopping'>购物车</Link>
          </div>
        </div>
        
      </div>
    );
  }


  searchCb(data){
    this.setState({
      productData: data
    });
  }

  componentDidMount(){
  	localStorage.setItem('key', '0')
    console.log('componentDidMount');
    // const url = 'http://ic.qingniao8.com/index.php/getnews/getIndex.shtml';
    // corsPostFetch(url, 'type=16&limit=8').then(obj => {
    //   let _list = obj.resultinfo.list;
    //   this.setState({
    //     cityData: _list,
    //   });
    // });

    const url = AJAXHOST+'mall/provinces';
    corsPostFetch(url).then(obj => {
      console.log(obj);
      if(obj.code===200){
        const list = obj.data;
        const provinceId = list[0].provinceId;
        this.setState({
          cityData: list,
          navCurrentProvinceId: provinceId  //首次默认选中第一个
        });
        console.log(list);
        this.getProductByPID(provinceId);
      }
    });
  }

  getProductByPID(provinceId) {
    const url2 = AJAXHOST+'mall/cities/'+provinceId;
    corsPostFetch(url2).then(data => {
      console.log(data);
      if(data.code===200){
        this.setState({
          productData: data.data,
        });
      }
    });
  }

  showProduct(pid){
    this.setState({
      navCurrentProvinceId: pid
    });

    this.getProductByPID(pid);
  }

}

