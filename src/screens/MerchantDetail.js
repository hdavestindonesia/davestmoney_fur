import React, { Component } from 'react';
import {Text, Image, TouchableOpacity, ActivityIndicator, View, StyleSheet, ScrollView, Dimensions} from 'react-native';
import {blue, green, yellow, screenBackgroundColor, navigatorStyle, WEB_BASE_URL} from '../libs/Constants';
import FloatLabelTextInput from 'react-native-floating-label-text-input'
import {postApi} from '../libs/api';
import Bold from '../components/Bold';
import Button from '../components/Button';
import SpaceBetween from '../components/SpaceBetween';
import getItem from '../libs/getItem';
import chunk from 'chunk';
import moment from 'moment';
import 'moment/locale/id';
import generateCounter from '../libs/generateCounter';
import CryptoJS from 'crypto-js';

let {width, height} = Dimensions.get('window')
import { TabNavigator, NavigationActions, StackActions } from "react-navigation";
import { WebView } from 'react-native-webview';
export default class extends Component {
	static navigatorStyle = navigatorStyle;

	constructor(props){
		super(props);
		this.state = {
			user: this.props.navigation.state.params.user ? this.props.navigation.state.params.user : null,
			promos: [],
			selectedIndex: 0
		}
	}

	componentDidMount() {
		getItem('USER', (user) => {
			this.setState({user: user}, () => {
				this.getData()
			})
		})
	}

	componentWillMount() {
		// this.props.navigator.setTitle({
		// 	title: ''
		// })
	}

	getData = () => {
		let {user, selectedIndex} = this.state
		let {data} = this.props.navigation.state.params

		generateCounter((counter) => {
			let params = {
				command : 'GETMERCHANTPROMO',
				idproduk : 'MONEY',
				counter : counter,
				no_telp : user.no_telp,
				signature : CryptoJS.SHA512(user.access_token + counter.toString()).toString(),
				datetime : moment().format('DD/MM/YYYY hh:mm:ss'),
				id_merchant : data.id_merchant,
				tipe : selectedIndex == 0 ? 'DEALS' : 'PROMO',
				search_query : '',
				page : 1
			}

			postApi('', params, true, (resp) => {
				if(resp.resultcode == '0000'){
					this.setState({promos: resp.promo_list})
				}else{
					Alert.alert('Info', resp.result)
				}
			})
		})
	}

	onPressTab = (index) => {
		this.setState({selectedIndex: index, promos:[]}, () => {
			this.getData()
		})
	}

	onPressPromo = (data) => {
		let {selectedIndex} = this.state

		// this.props.navigator.push({
		// 	screen: 'PromoDetail',
		// 	passProps: {
		// 		data
		// 	}
		// })



		this.props.navigation.navigate("PromoDetail",{
			data
		})


	}

	render() {
		let {promos, selectedIndex} = this.state
		let {data} = this.props.navigation.state.params

		return (
			<View style={{flex:1, backgroundColor:'white'}}>		
				
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

				<SpaceBetween style={{backgroundColor:'white', marginHorizontal:10, borderBottomWidth:1, borderBottomColor:'grey'}}>

					<TouchableOpacity onPress={() => this.onPressTab(0)} style={{backgroundColor:'white', padding:15, flex:1, justifyContent: 'center', alignItems: 'center', borderBottomWidth: selectedIndex == 0 ? 3 : 0, borderBottomColor:blue}}>
						<Text style={{fontWeight:'600'}}>Deals</Text>
					</TouchableOpacity>

					<TouchableOpacity onPress={() => this.onPressTab(1)} style={{backgroundColor:'white', padding:15, flex:1, justifyContent: 'center', alignItems: 'center', borderBottomWidth: selectedIndex == 1 ? 3 : 0, borderBottomColor:blue}}>
						<Text style={{fontWeight:'600'}}>Promo</Text>
					</TouchableOpacity>

				</SpaceBetween>

				<ScrollView style={{flex:1, padding:10}}>
					{promos.map((data, i) => (
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
					))}
				</ScrollView>

			</View>
		);
	}
}