import React, {
	Component
} from 'react';
import '../css/base.css';
import '../css/detail.css';
import { AJAXHOST, STATICHOST } from '../common/config';
import { corsPostFetch } from '../api/apiFetch';
import Auth from '../components/auth';

export default class Detail extends Component {
	constructor(props) {
		super(props);

		this.state = {
			productId: this.props.match.params.productId,
			data: ''
		};
	}

	render() {
		return(
			<div className="detail">
        <div className="detail-title">
          <div className="big-pic">
            <img src={`${STATICHOST}${this.state.data.image}`} alt={this.state.data.title} />
            <p>{this.state.data.title}</p>
          </div>
          <div className="show-price">
            <span className="price">¥{this.state.data.price}</span>  
            <span className="promise">担保交易</span>
            <span className="certification">小二已实名认证</span>            
          </div>
        </div>
        <div className="detail-content">
          {this.state.data.introduce}
        </div>

        <div className="detail-button">
          <div className="shop-car" onClick={this.addCar.bind(this)}>加入购物车</div>
          <div className="buy" onClick={this.buy.bind(this)}>立即购买</div>
        </div>
      </div>
		);
	}

	buy() {
		if(Auth.loggedIn()) {
			console.log('loged');
			localStorage.order = JSON.stringify(this.state.data);
			sessionStorage.setItem('select','0')
			window.location.href = "/order?"+sessionStorage.getItem('select')+"";
		} else {
			window.location.href = "/login";
		}
	}

	addCar() {
		if(Auth.loggedIn()) {
			console.log('loged');
			localStorage.order = JSON.stringify(this.state.data);
			alert('已加了购物车')
			this.res();
		} else {			
			window.location.href = "/login";
		}
	}
	componentDidMount() {
		const url = AJAXHOST + 'mall/product_detail/' + this.state.productId;
		corsPostFetch(url).then(obj => {
			if(obj.code === 200) {
				this.setState({
					data: obj.data[0]
				});
			}
		});
	}
	res() {
		localStorage.setItem('id' + JSON.parse(localStorage.getItem('order')).id + '', localStorage.getItem('order'))
	}
}