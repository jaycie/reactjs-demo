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
			data: '',
			left:'left',
			arrays:[],
			id:0 //选中的第几张
		};
	}

	render() {
			const Li=this.state.arrays.map((value,index)=>{
				let cls= index===this.state.id?'color':'';
				return(<li key={index} className={cls} onClick={this.Carousel.bind(this,index)}></li>)
			})
		return(
			<div className="detail">
        <div className="detail-title">
          <div className="big-pic">
          	<div id="photograph" ref='myimg'>
            	<span><img src={`${STATICHOST}${this.state.data.image}`} alt={this.state.data.title} /></span>
            	<span><img src={`${STATICHOST}${this.state.data.image}`} alt={this.state.data.title} /></span>
            	<span><img src={`${STATICHOST}${this.state.data.image}`} alt={this.state.data.title} /></span>
            	<span><img src={`${STATICHOST}${this.state.data.image}`} alt={this.state.data.title} /></span>
            </div>
            <ul className="nav">
				{Li}
			</ul>
            <p>{this.state.data.title}</p>
          </div>
          <div className="show-price">
            <span className="price">¥{this.state.data.price}</span>  
            <span className="promise">担保交易</span>
            <span className="certification">小二已实名认证</span>
            <span className="share">分享</span>
          </div>
        </div>
        <div className="detail-content">
          {this.state.data.introduce}
        </div>

        <div className="detail-button">
          <div className='collect' onClick={this.collect.bind(this)} style={{color: '#333'}}>收藏</div>
          <div className="shop-car" onClick={this.addCar.bind(this)}>加入购物车</div>
          <div className="buy" onClick={this.buy.bind(this)}>立即购买</div>
        </div>
      </div>
		);
	}

	share() {

	}

	collect(event) {
		if(event.target.style.color === 'rgb(51, 51, 51)') {
			alert('已收藏')
			event.target.style = 'color:red'
		} else {
			alert('取消收藏')
			event.target.style = 'color:#333'
		}
		const url1 = AJAXHOST + 'mall/follow/' + localStorage.uid + '/' + this.state.productId;
		corsPostFetch(url1).then(objt => {
			console.log(objt)
		})
	}

	buy() {
		if(Auth.loggedIn()) {
			console.log('loged');
			localStorage.order = JSON.stringify(this.state.data);
			sessionStorage.setItem('select', '0')
			window.location.href = "/order?" + sessionStorage.getItem('select') + "";
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

	photograph() {
		let span = this.refs.myimg.childNodes;
		let arrays = [];
		for(let i = 0; i < span.length; i++) {
			arrays.push(span[i])
			span[i].setAttribute(this.state.left, span[i].offsetLeft)
		}
  		this.setState({
  			arrays:arrays
  		})
	}
	Carousel(pid){
		let span = this.refs.myimg.childNodes;
		this.setState({id:pid});
		this.refs.myimg.style='margin-left:-'+span[pid].getAttribute(this.state.left)+'px'
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
		this.photograph()
	}
	res() {
		localStorage.setItem('id' + JSON.parse(localStorage.getItem('order')).id + '', localStorage.getItem('order'))
	}
}