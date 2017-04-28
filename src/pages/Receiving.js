import React, {
	Component
} from 'react';
import '../css/base.css';
import '../css/Receiving.css';
import { Link } from 'react-router-dom';
import { AJAXHOST} from '../common/config';
import { corsPostFetch } from '../api/apiFetch';
export default class Receiving extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dat:'',
			address: '',
			uid: localStorage.uid,
			className: 'Detail_address'
		}
	}
	componentDidMount() {
		const url = AJAXHOST + 'user/get_address/' + this.state.uid;
		corsPostFetch(url, 'uid=' + this.state.uid).then(obj => {
			let list = obj.data
			console.log(obj)
			if(obj.code === 200) {
				this.setState({
					dat:list,
					address: list.map((Number,index) => {
						const pid = Number.id;
						return(<div className={this.state.className} key={index} onClick={this.click.bind(this)} id={pid}>
					<p id={index}>
						收货人:{Number.realname}
						<span className="right">{Number.tel}</span>
					</p>
					<div id={index}>收货地址:{Number.rovince_name}{Number.city_name}{Number.area_name}{Number.detail_address}</div>
				</div>)
					})
				});
			}
		})
	}
	click(event) {
		const ent=this.state.dat;
		const list=ent[event.target.id];
		localStorage.setItem('key',event.target.id)
		console.log(list)
		const url1 = AJAXHOST + 'user/update_address';
		corsPostFetch(url1, 'id=' + localStorage.getItem('uid') + '&realname=' + list.realname + '&tel=' + list.tel + '&province_id=' + list.province_id + '&province_name=' + list.province_name + '&city_id=' + list.city_id + '&city_name=' + list.city_name + '&area_id=' + list.area_id + '&area_name=' + list.area_name + '&detail_address=' + list.detail_address).then(objt => {
			console.log(objt)
							if(objt.code === 200) {
					window.location.href = "/order";
				}
		})

	}
	render() {
		return(
			<div className='Receiving_address'>
				<div className='header'>
					<i className="fa fa-angle-left"></i>
					管理收货地址
				</div>
				<div className="center">
					{this.state.address}
				</div>
				<div className="foont">
					<button><Link to="/address">新添加收货地址</Link></button>
				</div>
			</div>
		)
	}
}