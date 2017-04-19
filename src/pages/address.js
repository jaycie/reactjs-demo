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
      
    };
  }

  render() {
    return (
      <div className="address">
        address
      </div>
    );
  }


  componentDidMount(){
    
  }

}

