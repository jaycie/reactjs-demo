import React, {
	Component
} from 'react';
import { STATICHOST } from '../common/config';
export default class Res extends Component {
	constructor(props) {
		super(props);
		this.state = {
			res: '',
			data: JSON.parse(localStorage.order)
		}
	}
	componentDidMount() {
		
		let arry = [];
		for(var i = 0; i < localStorage.length - 4; i++) {
			arry.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
		}
		var numbe = 0,
			Index = 0;
		this.setState({
			res: arry.map((Number, index) => {
				numbe += parseInt(Number.price,10);
				Index = (index + 1)
				return(
					<div className="shopping" key={Number.id}>
          				<span className="span1"><img src={`${STATICHOST}${Number.image}`} alt={Number.title} /></span>
          				<span className="span3">{Number.title}</span>
          				<span className="span1 price">¥{Number.price}</span>
       			</div>
				);
			}),
			money: numbe,
			numbers: Index
		});
	}
	render() {
		let url1=document.URL;
		var num=url1.indexOf("?");
   			url1=url1.substr(num+1);
		let res = url1==='0'?
			(
		<div>
			<div className="shopping">
				<span className="span1">
					<img src={`${STATICHOST}${this.state.data.image}`} alt={this.state.data.title} /></span>
				<span className="span3">{this.state.data.title}</span>
				<span className="span1 price">¥{this.state.data.price}</span>
			</div>
        	<div className="detail-button">
         	 	<div className="shop-info">共<span>1</span>件，总金额：<span>¥{this.state.data.price}</span></div>
          		<div className="buy-submit" onClick={this.buy.bind(this)}>提交订单</div>
        	</div>
		</div>	
			): (<div>
				{this.state.res}
				<div className="detail-button">
         	 		<div className="shop-info">共<span>{this.state.numbers}</span>件，总金额：<span>¥{this.state.money}</span></div>
          			<div className="buy-submit" onClick={this.buy.bind(this)}>提交订单</div>
        		</div>				
				</div>
				)
		return(
			<div>
			{res}			
			</div>
		)
	}
  buy() {

  }
}