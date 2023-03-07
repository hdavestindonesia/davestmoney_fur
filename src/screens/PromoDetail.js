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
import MyWebView from 'react-native-webview-autoheight'
import { TabNavigator, NavigationActions, StackActions } from "react-navigation";
import { WebView } from 'react-native-webview';
let {width, height} = Dimensions.get('window')

export default class extends Component {
	static navigatorStyle = navigatorStyle;

	constructor(props){
		super(props);
		this.state = {
			user: this.props.navigation.state.params.user ? this.props.navigation.state.params.user : null,
			promo: null
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
		let {user} = this.state
		let {data} = this.props.navigation.state.params

		generateCounter((counter) => {
			let params = {
				command : 'GETPROMODETAIL',
				idproduk : 'MONEY',
				counter : counter,
				no_telp : user.no_telp,
				signature : CryptoJS.SHA512(user.access_token + counter.toString()).toString(),
				datetime : moment().format('DD/MM/YYYY hh:mm:ss'),
				id_promo : data.id_promo
			}

			postApi('', params, true, (resp) => {
				if(resp.resultcode == '0000'){
					this.setState({promo: resp})
				}else{
					Alert.alert('Info', resp.result)
				}
			})
		})
	}

	render() {
		let {promo} = this.state

		if(!promo){
			return null
		}

		return (
			<ScrollView style={{flex:1, backgroundColor:'white'}}>		
				
				{promo.url_image ? 
					<Image
		    	  defaultSource={require('../assets/images/placeholder_land.jpg')}
	    	    style={{width, backgroundColor:'#f1eff0', height:150, resizeMode:'cover'}} 
	    	    source={{uri: promo.url_image}} />
	    	  :
	    	  <Image
	    	    style={{width, backgroundColor:'#f1eff0', height:150, resizeMode:'cover'}} 
	    	    source={require('../assets/images/placeholder_land.jpg')} />
				}

				<View style={{backgroundColor:'grey', padding:10}}>
					<Text style={{color:'white'}}>{promo.nama_promo}</Text>
				</View>

				<View style={{}}>

				<WebView
			        originWhitelist={['*']}
			        source={{html: promo.text_content}}
			        scalesPageToFit={false}
			    />

				</View>				

			</ScrollView>
		);
	}
}