import React, { Component } from 'react';
import { Link } from 'react-router-dom'

export default class ShowProduct extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      data: this.props.data
    };
  }

  render() {
    let list = '';
    if(this.state.data[0]){
      if(this.state.data[0].cityId){  //从导航进来，带市、区
        list = this.state.data.map((value,index)=> {
          let _list = value.data.map((_value, _index) => {
            return (
              <li key={_index}>
                <Link to={`/detail/${_value.productId}`}>
                  <img src={_value.src} alt={_value.title} />
                  <p>{_value.title}</p>
                </Link>
              </li>
            );
          });
          return (
            <div key={index}>
              <h4>{value.cityName}特产</h4>
                <ul className="product-list">
                  {_list}
                </ul>
            </div>
          );
        });
      }else{ //搜索而来
        console.log('search');
      }
    }
    return (
      <div>
        {list}
      </div>
    )
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      data: nextProps.data
    });
  }
}