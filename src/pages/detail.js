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
			left: 'left',
			arrays: [],
			id: 0, //选中的第几张
			startPoint:0,
			startEle:0
		};
	}

	render() {
		const Li = this.state.arrays.map((value, index) => {
			let cls = index === this.state.id ? 'color' : '';
			return(<span key={index} className={cls}></span>)
		})
		return(
			<div className="detail">
        <div className="detail-title">
          <div className="big-pic" onTouchStart={this.Carousel.bind(this)} onTouchMove={this.glide.bind(this)} onTouchEnd={this.lift.bind(this)}>
          	<div id="photograph" ref='myimg' style={this.state.width}>
            <span><img src={`${STATICHOST}${this.state.data.image}`} alt={this.state.data.title} style={this.state.imgwidth}/></span>
            {this.state.arrayss}
            </div>
            <div className="nav" style={this.state.bom}>
            	<div>
            	{Li}
            	</div>
				
			</div>
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
          <div className='collect' onClick={this.collect.bind(this)}>收藏</div>
          <div className="shop-car" onClick={this.addCar.bind(this)}>加入购物车</div>
          <div className="buy" onClick={this.buy.bind(this)}>立即购买</div>
        </div>
      </div>
		);
	}

	share() {

	}
	Carousel(event) {
		let box = document.getElementById('photograph');
		this.setState({
        	startPoint:event.changedTouches[0].pageX,
        	startEle:box.offsetLeft
		})
	}
	
	glide(event){
		let box = document.getElementById('photograph');
		let Span = document.querySelectorAll('.big-pic span');
        let currPoint = event.changedTouches[0].pageX;
        let	disX= currPoint - this.state.startPoint;
        let left = this.state.startEle + disX;	
        if(Span.length===1){
        	box.style.left ='0px';
        }else{
        	box.style.left = left + 'px';
        }

	}
	lift(event){	
		let box = document.querySelector('#photograph');
		let aLi = this.refs.myimg.childNodes;
		let wrap = document.querySelector('.big-pic');
		let left = box.offsetLeft;
		let aLiWidth = wrap.offsetWidth;
        let currNum = Math.round(-left/aLiWidth);
        currNum = currNum>=(aLi.length-1) ? aLi.length-1 : currNum;
        currNum = currNum<=0 ? 0 : currNum;
        box.style.left = -currNum*wrap.offsetWidth + 'px';
         	         this.setState({
         	id:currNum
         })
	}
	collect(event) {
		const url1 = AJAXHOST + 'mall/follow/' + localStorage.uid + '/' + this.state.productId;
		corsPostFetch(url1).then(objt => {
			console.log(objt)
			if(objt.code === 200) {
				alert('你已关注')
			} else {
				alert('取消关注')
			}
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
		this.setState({
			width: {
				width: span.length * 100 + '%'
			}
		})
		for(let i = 0; i < span.length; i++) {			
			arrays.push(span[i]);
		}
		this.setState({
			arrays: arrays
		});
	}
	componentDidMount() {
		const url = AJAXHOST + 'mall/product_detail/' + this.state.productId;
		corsPostFetch(url).then(obj => {
			if(obj.code === 200) {
				let imgwidth = obj.data[0].images === null ? {
					width: '100%'
				} : {
					width: 100 / (obj.data[0].images.split(',').length + 1) + '%'
				}
				let arry = obj.data[0].images === null ? '' : obj.data[0].images.split(',').map((value, index) => {
					return(<span key={index} ><img src={`${STATICHOST}${value}`} alt={this.state.data.title} style={imgwidth} /></span>)
				});
				this.setState({
					data: obj.data[0],
					arrayss: arry,
					imgwidth: imgwidth
				});
				if(obj.data[0].images !== null) {
					this.photograph()
					this.setState({
						bom: {
							marginTop: '-1rem'
						}
					})
				}
			}
		});
	}
	res() {
		localStorage.setItem('id' + JSON.parse(localStorage.getItem('order')).id + '', localStorage.getItem('order'))
	}
}