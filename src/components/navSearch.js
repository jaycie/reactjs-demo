import React, { Component } from 'react';
import { AJAXHOST } from '../common/config';
import { corsPostFetch } from '../api/apiFetch';

export default class NavSearch extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      keywords: ""
    };
  }

  render() {
    return (
      <div className="navSearch">
        <i className="fa fa-angle-left"></i>
        <i className="fa fa-search" onClick={this.search.bind(this)}></i>
        <input type="text" placeholder="请输入城市名称" onBlur={this.handerBlur.bind(this)} /> 
       </div>
    );
  }

  handerBlur(e){
    this.setState({
      keywords: e.target.value,
    });
  }

  search(){
    const url2 = AJAXHOST+'mall/search';
    const that = this;
    corsPostFetch(url2,'keywords='+this.state.keywords).then(data => {
      if(data.code===200){
        that.props.searchCb(data.data);
      }
    });
  }

}

