import React, { Component } from 'react';
import {Text, Image, TouchableOpacity, ActivityIndicator, View, StyleSheet, ScrollView, Alert} from 'react-native';
import {blue, green, screenBackgroundColor, navigatorStyle, WEB_BASE_URL, SECRET_CODE} from '../libs/Constants';
import FloatLabelTextInput from 'react-native-floating-label-text-input'
import {getApi, postApi} from '../libs/api';
import Bold from '../components/Bold';
import Button from '../components/Button';
import SpaceBetween from '../components/SpaceBetween';
import getItem from '../libs/getItem';
import Checkmark from '../components/Checkmark';
import generateCounter from '../libs/generateCounter';
import CryptoJS from 'crypto-js';
import moment from 'moment';
import 'moment/locale/id';
import MyWebView from 'react-native-webview-autoheight'
import { TabNavigator, NavigationActions, StackActions } from "react-navigation";
import { WebView } from 'react-native-webview';
export default class extends Component {
	static navigatorStyle = navigatorStyle;

	constructor(props){
		super(props);
		this.state = {
			user: this.props.navigation.state.params.user ? this.props.navigation.state.params.user : null,
			teks: null
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
		let {user} = this.state
		generateCounter((counter) => {
			let params = {
				command : 'GETTENTANGKAMI',
				idproduk : 'MONEY',
				counter : counter,
				no_telp : user.no_telp,
				signature : CryptoJS.SHA512(user.access_token + counter.toString()).toString(),
				datetime : moment().format('DD/MM/YYYY hh:mm:ss'),
			}

			postApi('', params, true, (resp) => {
				if(resp.resultcode == '0000'){
					this.setState({teks: resp.teks})
				}else{
					Alert.alert('Info', resp.result)
				}
			})
		})
	}

	componentWillMount() {
		// this.props.navigator.setTitle({
		// 	title: 'Tentang DavestMoney'
		// })
	}

	render() {
		let {teks} = this.state

		return (
			<View style={{width: "100%", height: "100%"}}>

				<WebView
			        originWhitelist={['*']}
			        source={{html: teks}}
			        scalesPageToFit={false}
			    />

			</View>
		);
	}
}