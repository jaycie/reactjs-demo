import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../css/base.css';
import '../css/address.css';
import { AJAXHOST, STATICHOST } from '../common/config';
import { corsPostFetch } from '../api/apiFetch';
import Auth from '../components/auth';

export default class Address extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      realname: '',
      detail_address: '',
      tel: ''
    };
  }

  render() {
    return (
      <div className="address">
        <div className="select">
          <select name="province" id="province" onChange={this.selectCity.bind(this)}>
            <option value="0">请选择省份</option>
            <option value="1">广东省</option>
            <option value="2">浙江省</option>
            <option value="3">江西省</option>
          </select>
        </div>
        <div className="select">
          <select name="city" id="city">
            <option value="0">请选择城市</option>
            <option value="1">广东省</option>
            <option value="2">浙江省</option>
            <option value="3">江西省</option>
          </select>
        </div>
        <div className="select">
          <select name="area" id="area">
            <option value="0">请选择区县</option>
            <option value="1">广东省</option>
            <option value="2">浙江省</option>
            <option value="3">江西省</option>
          </select>
        </div>
        <div className="select">
          <input type="text" name="detail_address" placeholder="请输入详细地址" onChange={(e)=>this.setState({detail_address: e.target.value})} />
        </div>
        <div className="select">
          <input type="text" name="realname" placeholder="请输入收货人姓名" onChange={(e)=>this.setState({realname: e.target.value})}/>
        </div>
        <div className="select">
          <input type="number" name="tel" maxLength="11" placeholder="请输入收货人手机号码" onChange={(e)=>this.setState({tel: e.target.value})}/>
        </div>

        <div className="bottom-button" onClick={this.save.bind(this)}>保存地址</div>
      </div>
    );
  }

  save() {

  }

  selectCity = (e)=> {
    console.log(e.target);
    console.log(e.target.value);
    console.log(e.target.text);
  }

  componentDidMount(){
    
  }

}

