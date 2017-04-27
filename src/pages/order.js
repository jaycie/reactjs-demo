import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../css/base.css';
import '../css/detail.css';
import '../css/order.css';
import { AJAXHOST, STATICHOST } from '../common/config';
import { corsPostFetch } from '../api/apiFetch';
import Auth from '../components/auth';
import Res from '../components/res';

export default class Order extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      uid: localStorage.uid,
    };
  }

  render() {
    let address = this.state.address ? (
        <div><Link to="/receiving">{this.state.address}</Link></div>
      ):(
        <div><Link to="/address">你没有默认的收获地址，请填写</Link></div>
      );
    
    return (
      <div className="order">
        <div className="address">
          {address}
        </div>
					<Res />
      </div>
    );
  }


  componentDidMount(){
    const url = AJAXHOST+'mall/default_address/'+this.state.uid;
    corsPostFetch(url).then(obj => {
    	let list = obj.data;
    	let arr=[0];
    	let storager=localStorage.getItem('key')
      if(obj.code===200){
        if(obj.data.length>0){
          this.setState({
            address:arr.map((Number) => {
						return(<div  key={Number.toString()} >
					<p>
						收货人:{list[storager].realname}
						<span className="right">{list[storager].tel}</span>
					</p>
					<div>收货地址:{list[storager].rovince_name}{list[storager].city_name}{list[storager].area_name}{list[storager].detail_address}</div>
				</div>)
					})
          });
        }
      }      
    }); 
  }
}

