import React, { Component } from 'react';
import '../css/base.css';
import '../css/detail.css';
import { AJAXHOST } from '../common/config';
import { corsPostFetch } from '../api/apiFetch';

export default class Detail extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      productId: this.props.match.params.productId,
      data: ''
    };
  }

  render() {
    return (
      <div className="detail">
        <div className="detail-title">
          <div className="big-pic">
            <img src={this.state.data.image} alt={this.state.data.title} />
            <p>{this.state.data.title}</p>
          </div>
          <div className="show-price">
            <span className="price">¥{this.state.data.price}</span>  
            <span className="promise">担保交易</span>
            <span className="certification">小二已实名认证</span>            
          </div>
        </div>
        <div className="detail-content">
          {this.state.data.detail}
        </div>

        <div className="detail-button">
          <div className="shop-car">加入购物车</div>
          <div className="buy">立即购买</div>
        </div>
      </div>
    );
  }

  componentDidMount(){
    const url = AJAXHOST+'_data/micro/product_detail.js';
    corsPostFetch(url).then(obj => {
      console.log(obj);
      if(obj.status===200){
        this.setState({
          data: obj.list
        });
      }
    });
  }

}

