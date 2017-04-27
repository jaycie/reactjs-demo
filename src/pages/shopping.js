import React, {
	Component
} from 'react';
import '../css/base.css';
import '../css/shopping.css'; 
import { Link } from 'react-router-dom';
import { STATICHOST } from '../common/config';
export default class Shopping extends Component {
	constructor(props) {
		super(props);
		this.state = {
			numbers: 0,
			money: '',		
		}
	}
	componentDidMount() {
		localStorage.setItem('key','')
		let arry = [];
		for(var i =0; i < localStorage.length-4; i++) {
			arry.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
		}
		console.log(arry)
		var numbe=0,
			Index=0;
		this.setState({		
			res: arry.map((Number,index) => {
				numbe+=parseInt(Number.price);
				Index=(index+1)
				return(
					<div className="shopping" key={Number.id}>
          				<span className="span1"><img src={`${STATICHOST}${Number.image}`} alt={Number.title} /></span>
          				<span className="span3">{Number.title}</span>
          				<span className="span1 price">¥{Number.price}</span>
       			</div>
				);
			}),
			money:numbe,
			numbers:Index
		});
	}
	render() {
		return(
			<div id="shopping">
				<div className='header'>
					<a href="javascript:history.go(-1)"><i className="fa fa-angle-left"></i></a>
					购物车({this.state.numbers})
				</div>
				<div className="substance">
					{this.state.res}
				</div>
				<div className='base'>
				 	<div className="detail-button">
          				<div className="shop-info">合计：<span>¥{this.state.money}</span></div>
         				<div className="buy-submit">结算<Link to="/order">({this.state.numbers})</Link></div>
      				</div>					
				</div>
			</div>
		)
	}
}