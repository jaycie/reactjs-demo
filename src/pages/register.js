import React, { Component } from 'react';
import '../css/base.css';
import '../css/login.css';

import { AJAXHOST } from '../common/config';
import { corsPostFetch } from '../api/apiFetch';

export default class Register extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      username: '',
      password: ''
    };
  }

  render() {
    return (
      <div className="login">
        <div className="header">
          <h1>用户注册</h1>
        </div>
        
        <div className="login-form mt-10">
          <div className="login-list-ctrl bb-1">
            <span>用户名</span> <input type="text"  onChange={(e)=>this.setState({username: e.target.value})} name="username" placeholder="用户名" />
          </div>
          <div className="login-list-ctrl">
            <span>密码</span> <input type="password" name="password" placeholder="输入密码" onChange={(e)=>this.setState({password: e.target.value})} />
          </div>
        </div>

        <div className="submit">
          <button type="submit" className="button" onClick={this.register.bind(this)}>注册</button>
        </div>
        

        <div className="other-link">
          <a href="/login/" className="ft-left">已有账号,登陆?</a>
          <a href="/forgot-password/" className="ft-right">忘记密码</a>
        </div>
      </div>
    );
  }

  register() {
    if(this.state.username===''){
      alert('请填写用户名');
    }else if(this.state.password===''){
      alert('请填写密码');
    }else{
      const url = AJAXHOST+'user/register';
      corsPostFetch(url,'username='+this.state.username+'&password='+this.state.password).then(obj => {
        console.log(obj);
        if(obj.code===200){
          window.location.href="/login";
        }
      });
    }
      
  }

}

