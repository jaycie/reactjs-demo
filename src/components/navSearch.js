import React, { Component } from 'react';

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
        <input type="text" placeholder="请输入特产名称" onBlur={this.handerBlur.bind(this)} /> 
       </div>
    );
  }

  handerBlur(e){
    this.setState({
      keywords: e.target.value,
    });
  }

  search(){
    console.log(this.state.keywords);
    window.location.href="/detail";
  }

}

