import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../css/base.css';
import '../css/detail.css';
import '../css/order.css';
import { AJAXHOST, STATICHOST } from '../common/config';
import { corsPostFetch } from '../api/apiFetch';
import Auth from '../components/auth';

export default class Order extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      data: JSON.parse(localStorage.order),
      uid: localStorage.uid
    };
  }

  render() {
    let address = this.state.address ? (
        <div>{this.state.address}</div>
      ):(
        <div><Link to="/address">你没有默认的收获地址，请填写</Link></div>
      );
    return (
      <div className="order">
        <div className="address">
          {address}
        </div>

        <div className="shopping">
          <span className="span1"><img src={`${STATICHOST}${this.state.data.image}`} alt={this.state.data.title} /></span>
          <span className="span3">{this.state.data.title}</span>
          <span className="span1 price">¥{this.state.data.price}</span>
        </div>

        <div className="detail-button">
          <div className="shop-info">共<span>1</span>件，总金额：<span>¥{this.state.data.price}</span></div>
          <div className="buy-submit" onClick={this.buy.bind(this)}>提交订单</div>
        </div>
      </div>
    );
  }


  componentDidMount(){
    const url = AJAXHOST+'mall/default_address/'+this.state.uid;
    corsPostFetch(url).then(obj => {
      console.log(obj);
      if(obj.code===200){
        if(obj.data.length>0){
          this.setState({
            address: obj.data
          });
        }
      }      
    });
  }

  buy() {

  }

}

