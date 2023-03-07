import React, { Component } from 'react';
import {Text, Image, TouchableOpacity, ActivityIndicator, View, StyleSheet, ScrollView, Dimensions, Alert} from 'react-native';
import {blue, green, yellow, screenBackgroundColor, navigatorStyle, WEB_BASE_URL} from '../libs/Constants';
import FloatLabelTextInput from 'react-native-floating-label-text-input'
import {getApi, postApi} from '../libs/api';
import Bold from '../components/Bold';
import Button from '../components/Button';
import SpaceBetween from '../components/SpaceBetween';
import getItem from '../libs/getItem';
import chunk from 'chunk';
import generateCounter from '../libs/generateCounter';
import CryptoJS from 'crypto-js';
import moment from 'moment';
import 'moment/locale/id';
import { TabNavigator, NavigationActions, StackActions } from "react-navigation";
import { WebView } from 'react-native-webview';
let {width, height} = Dimensions.get('window')

export default class extends Component {
	static navigatorStyle = navigatorStyle;

	constructor(props){
		super(props);
		this.state = {
			user: this.props.navigation.state.params.user ? this.props.navigation.state.params.user : null,
		}
	}

	componentDidMount() {
		getItem('USER', (user) => {
			this.setState({user})
		})
	}

	componentWillMount() {
		// this.props.navigator.setTitle({
		// 	title: 'Verifikasi Email'
		// })
	}

	onProses = () => {
		// this.props.navigator.push({
		// 	screen: 'MasukkanCode',
		// 	passProps: {
		// 		type: 'editphone',
		// 		onSuccess: (securityCode) => {
		// 			this.kirimKode(securityCode)
		// 		}
		// 	}
		// })


		this.props.navigation.navigate("MasukkanCode",{
			type: 'editphone',
			onSuccess: (securityCode) => {
				this.kirimKode(securityCode)
			}
		})
	}

	kirimKode = (securityCode) => {
		let {user} = this.state
		let {email} = this.props.navigation.state.params

		generateCounter((counter) => {
			let params = {
				command : 'VALIDATEEMAIL', 
				idproduk : 'MONEY', 
				counter : counter, 
				no_telp : user.no_telp, 
				signature : CryptoJS.SHA512(user.access_token + counter.toString()).toString(),
				datetime : moment().format('DD/MM/YYYY hh:mm:ss'),
			}

			postApi('', params, true, (resp) => {
				if(resp.resultcode == '0000'){
					// this.props.navigator.push({
					// 	screen: 'SignInCode',
					// 	passProps: {
					// 		noPonsel: user.no_telp,
					// 		email: email,
					// 		type: 'verifikasiemail',
					// 	}
					// })



					this.props.navigation.navigate("SignInCode",{
						noPonsel: user.no_telp,
						email: email,
						type: 'verifikasiemail',
					})
				}else{
					Alert.alert('Info', resp.result)
				}
			})
		})
	}

	render() {
		let {email} = this.props.navigation.state.params
		return (
			<ScrollView style={{backgroundColor:'white'}}>		
				<View style={{marginTop:20, marginHorizontal:20}}>
					<View>
						<Text style={{fontSize:12}}>Email</Text>
						<SpaceBetween style={{marginTop:10, borderBottomWidth:1, borderBottomColor:'lightgrey'}}>
							<View style={{marginLeft:5}}>
								<Text style={{fontSize:16}}>{email} <Text style={{color:'red'}}>Otomatis</Text></Text>
							</View>

							<View>
								<Text style={{color:blue}}></Text>
							</View>
						</SpaceBetween>
					</View>

					<View style={{marginTop:30}}>
						<Button onPress={this.onProses} text={'Kirim Kode Verifikasi'} />
					</View>
				</View>
				
			</ScrollView>
		);
	}
}