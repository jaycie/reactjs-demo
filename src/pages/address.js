import React, {
	Component
} from 'react';
import '../css/base.css';
import '../css/address.css';
import { AJAXHOST} from '../common/config';
import { corsPostFetch } from '../api/apiFetch';
export default class Address extends Component {
	constructor(props) {
		super(props);

		this.state = {
			realname: '',
			detail_address: '',
			tel: '',
			province_id: '',
			province_name: '',
			city_id: '',
			city_name: '',
			area_id: '',
			area_name: ''
		};
	}

	render() {
		return(
			<div className="address">
        <div className="select">
          <select name="province" id="province" onChange={this.selectCity.bind(this)}>
            <option value="0">请选择省份</option>
          </select>
        </div>
        <div className="select">
          <select name="city" id="city" onChange={this.city.bind(this)}>
            <option value="0">请选择城市</option>
          </select>
        </div>
        <div className="select">
          <select name="area" id="area" onChange={this.areas.bind(this)}>
            <option value="0">请选择区县</option>
          </select>
        </div>
        <div className="select">
          <input type="text" name="detail_address" placeholder="请输入详细地址" onChange={(e)=>this.setState({detail_address: e.target.value})} />
        </div>
        <div className="select">
          <input type="text" name="realname" placeholder="请输入收货人姓名" onChange={(e)=>this.setState({realname: e.target.value})}/>
        </div>
        <div className="select">
          <input type="number" name="tel" maxLength="11" placeholder="请输入收货人手机号码" onChange={(e)=>this.setState({tel: e.target.value})}/>
        </div>

        <div className="bottom-button" onClick={this.save.bind(this)}>保存地址</div>
      </div>
		);
	}

	save() {
		if(this.state.realname === '') {
			alert('请输入收货人姓名');
		} else if(this.state.province_name === '') {
			alert('请选择省份');
		} else if(this.state.city_name === '') {
			alert('请选择城市');
		} else if(this.state.area_name === '') {
			alert('请选择区域');
		} else if(this.state.detail_address === '') {
			alert('请输入详细地址');
		} else if(this.state.tel === '') {
			alert('请输入收货人手机号码')
		} else {
			const url = AJAXHOST + 'user/address';
			corsPostFetch(url, 'uid=' + localStorage.getItem('uid') + '&realname=' + this.state.realname + '&tel=' + this.state.tel + '&province_id=' + this.state.province_id + '&province_name=' + this.state.province_name + '&city_id=' + this.state.city_id + '&city_name=' + this.state.city_name + '&area_id=' + this.state.area_id + '&area_name=' + this.state.area_name + '&detail_address=' + this.state.detail_address).then(obj => {
				console.log(obj);
				if(obj.code === 200) {
					window.location.href = "/receiving";
				}
			});
		}
	}

	selectCity = (event) => {
		var province = document.getElementById('province'),
			index = province.selectedIndex;
		this.setState({
			province_id: event.target.value,
			province_name: province[index].text
		})
		this.componentDidMount(event.target.value)
	}
	city = (event) => {
		var city = document.getElementById('city'),
			index = city.selectedIndex;
		this.setState({
			city_id: event.target.value,
			city_name: city[index].text
		})
		this.componentDidMount(event.target.value)
	}
	areas = (event) => {
		var areas = document.getElementById('area'),
			index = areas.selectedIndex;
		this.setState({
			area_id: event.target.value,
			area_name: areas[index].text
		})
	}
	componentDidMount(th) {
		var province = document.getElementById('province'),
			city = document.getElementById('city'),
			areas = document.getElementById('area');
			var URL=th===undefined?province.value:th;
			const url1 = AJAXHOST + 'frequent/cities/' +URL
		console.log(url1)
		corsPostFetch(url1).then(dat => {
			const list = dat.data;
			if(dat.code === 200) {
				if(th===province.value){
					for(var i = 0; i < list.length; i++) {
					let op = new Option(list[i].name, list[i].id);
					city.options.add(op);
				}	
				}else if(th===city.value){
					for(let i = 0; i < list.length; i++) {
					let op = new Option(list[i].name, list[i].id);
					areas.options.add(op);
				}						
				}else{
									for(let i = 0; i < list.length; i++) {
					let op = new Option(list[i].name, list[i].id);
					province.options.add(op);
				}
				}
			}
		})
	}

}