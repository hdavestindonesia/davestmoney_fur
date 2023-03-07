import React, { Component } from 'react';
import {Text, Image, TouchableOpacity, ActivityIndicator, View, StyleSheet, ScrollView, Dimensions} from 'react-native';
import {blue, green, yellow, screenBackgroundColor, navBarHidden, WEB_BASE_URL} from '../libs/Constants';
import FloatLabelTextInput from 'react-native-floating-label-text-input'
import {postApi} from '../libs/api';
import Bold from '../components/Bold';
import Button from '../components/Button';
import SpaceBetween from '../components/SpaceBetween';
import getItem from '../libs/getItem';
import chunk from 'chunk';
import SwitchSelector from '../components/SwitchSelector';
import moment from 'moment';
import 'moment/locale/id';
import generateCounter from '../libs/generateCounter';
import CryptoJS from 'crypto-js';
import { TabNavigator, NavigationActions, StackActions } from "react-navigation";
import { WebView } from 'react-native-webview';
let {width, height} = Dimensions.get('window')

const selectorOptions = [
	{
		label: 'DEALS', value: 0
	},
	{
		label: 'PROMO', value: 1
	},
	{
		label: 'MERCHANT', value: 2
	}
]

export default class extends Component {
	static navigatorStyle = navBarHidden;

	constructor(props){
		super(props);
		this.state = {
			switchSelected: 0,
			user: null,
			key: null,
			datas: null,
			page: 1
		}
	}

	componentDidMount() {
		getItem('USER', (user) => {
			this.setState({user: user}, () => {
				this.getData()
			})
		})
	}

	getData = () => {
		let {user, key, switchSelected, page} = this.state

		if(switchSelected == 0){

			generateCounter((counter) => {
				let params = {
					command : 'GETPROMOLIST',
					idproduk : 'MONEY',
					counter : counter,
					no_telp : user.no_telp,
					signature : CryptoJS.SHA512(user.access_token + counter.toString()).toString(),
					datetime : moment().format('DD/MM/YYYY hh:mm:ss'),
					tipe: 'DEALS',
					search_query: key ? key : '',
					page: page
				}

				postApi('', params, false, (resp) => {
					if(resp.resultcode == '0000'){
						this.setState({datas: resp.promo_list})
					}else{
						//Alert.alert('Info', resp.result)
					}
				})
			})

		}else if(switchSelected == 1){

			generateCounter((counter) => {
				let params = {
					command : 'GETPROMOLIST',
					idproduk : 'MONEY',
					counter : counter,
					no_telp : user.no_telp,
					signature : CryptoJS.SHA512(user.access_token + counter.toString()).toString(),
					datetime : moment().format('DD/MM/YYYY hh:mm:ss'),
					tipe: 'PROMO',
					search_query: key ? key : '',
					page: page
				}

				postApi('', params, false, (resp) => {
					if(resp.resultcode == '0000'){
						this.setState({datas: resp.promo_list})
					}else{
						//Alert.alert('Info', resp.result)
					}
				})
			})

		}else if(switchSelected == 2){

			generateCounter((counter) => {
				let params = {
					command : 'GETMERCHANTLIST',
					idproduk : 'MONEY',
					counter : counter,
					no_telp : user.no_telp,
					signature : CryptoJS.SHA512(user.access_token + counter.toString()).toString(),
					datetime : moment().format('DD/MM/YYYY hh:mm:ss'),
					//tipe: 'PROMO',
					search_query: key ? key : '',
					page: page
				}

				postApi('', params, false, (resp) => {
					if(resp.resultcode == '0000'){
						this.setState({datas: resp.merchant_list})
					}else{
						//Alert.alert('Info', resp.result)
					}
				})
			})
		}
	}

	onPressPromo = (data) => {
		let {switchSelected} = this.state

		if(switchSelected == 0 || switchSelected == 1){
			// this.props.navigator.push({
			// 	screen: 'PromoDetail',
			// 	passProps: {
			// 		data
			// 	}
			// })

			this.props.navigation.navigate("PromoDetail",{
				data
			})
		}else{
			// this.props.navigator.push({
			// 	screen: 'MerchantDetail',
			// 	passProps: {
			// 		data
			// 	}
			// })

			this.props.navigation.navigate("MerchantDetail",{
				data
			})
		}
	}

	render() {
		let {datas, key} = this.state

		return (
			<View style={{backgroundColor:'white', minHeight:height}}>

				<View style={{borderBottomWidth:2, borderBottomColor:'lightgrey'}}>
					<View style={{marginVertical:20, marginHorizontal:40}}>
						<SwitchSelector backgroundColor={'whitesmoke'} borderColor={'grey'} buttonColor={yellow} selectedColor={'white'} bold={true} options={selectorOptions} initial={0} onPress={(value) => this.setState({switchSelected: value, datas:[], key: null, page:1}, () => this.getData())} />
					</View>

					<ScrollView style={{marginHorizontal:50, marginBottom:20}}>
						<FloatLabelTextInput 
							value={key}
							onChangeTextValue={(key) => this.setState({key}, () => this.getData())}
							autoCorrect={false} 
							placeholder="Cari" />
					</ScrollView>
				</View>

				{datas ? (
					<View style={{flex:1, marginBottom:150}}>
						<ScrollView style={{flex:1, padding:10}}>
							<View>
								{datas.length > 0 ? datas.map((data, i) => (
									<TouchableOpacity key={i} onPress={() => this.onPressPromo(data)} style={{marginBottom:10}}>
										{data.url_image ? 
											<Image
								    	  defaultSource={require('../assets/images/placeholder_land.jpg')}
							    	    style={{width, backgroundColor:'#f1eff0', height:150, resizeMode:'cover'}} 
							    	    source={{uri: data.url_image}} />
							    	  :
							    	  <Image
							    	    style={{width, backgroundColor:'#f1eff0', height:150, resizeMode:'cover'}} 
							    	    source={require('../assets/images/placeholder_land.jpg')} />
										}
					    	  </TouchableOpacity>
								)) : (
									<View>
										<Text style={{textAlign:'center'}}>Data tidak ditemukan</Text>
									</View>
								)}
							</View>
						</ScrollView>
					</View>
				) : null}

			</View>
		);
	}
}