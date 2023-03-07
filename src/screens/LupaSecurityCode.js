import React, { Component } from 'react';
import {Text, Image, TouchableOpacity, ActivityIndicator, View, StyleSheet, ScrollView, Alert} from 'react-native';
import {blue, green, screenBackgroundColor, navigatorStyle, WEB_BASE_URL, SECRET_CODE} from '../libs/Constants';
import FloatLabelTextInput from 'react-native-floating-label-text-input'
import {postApi} from '../libs/api';
import Bold from '../components/Bold';
import Button from '../components/Button';
import SpaceBetween from '../components/SpaceBetween';
import getItem from '../libs/getItem';
import Checkmark from '../components/Checkmark';
import generateCounter from '../libs/generateCounter';
import CryptoJS from 'crypto-js';
import moment from 'moment';
import 'moment/locale/id';
import { TabNavigator, NavigationActions, StackActions } from "react-navigation";
import { WebView } from 'react-native-webview';
export default class extends Component {
	static navigatorStyle = navigatorStyle;

	constructor(props){
		super(props);
		this.state = {
			user: null,
			noHp: null,
		}
	}

	componentDidMount() {
		getItem('USER', (user) => {
			this.setState({user: user})
		})
	}

	componentWillMount() {
		// this.props.navigator.setTitle({
		// 	title: 'LUPA SECURITY CODE'
		// })
	}

	onKirim = () => {
		let {noHp, user} = this.state

		let resetmethod = 'phone'
		if(noHp.includes('@')){
			resetmethod = 'email'
		}

		if(!noHp){
			Alert.alert('Info', 'Harap isikan Email / No. Ponsel')
			return
		}

		generateCounter((counter) => {
			let params = {
				command : 'REQUESTRESETPASS',
				idproduk : 'MONEY',
				counter : counter,
				no_telp : noHp, 
				signature : CryptoJS.SHA512(SECRET_CODE + counter.toString()).toString(),
				datetime : moment().format('DD/MM/YYYY hh:mm:ss'),
				resetmethod : resetmethod
			}

			postApi('', params, true, (resp) => {
				if(resp.resultcode == '0000'){
					// this.props.navigator.push({
					// 	screen: 'SignInCode',
					// 	passProps: {
					// 		noPonsel: noHp,
					// 		type: 'forgot',
					// 		durasi_otp: 90
					// 	}
					// })

					// Alert.alert("tes tes")


					this.props.navigation.navigate("SignInCode",{
						noPonsel: noHp,
						type: 'forgot',
						durasi_otp: 90
					})
				}else{
					Alert.alert('Info', resp.result)
				}
			})
		})
	}

	render() {
		let {noHp} = this.state
		return (
			<ScrollView style={{margin:20}}>
				<Text style={{fontSize:20, fontWeight:'600'}}>Lupa Security Code?</Text>

				<Text style={{fontSize:16}}>Masukkan Email atau Nomor Handphone yang terdaftar untuk memperbaharui Security Code Anda</Text>

				<View style={{marginTop:20}}>
					<FloatLabelTextInput 
						onChangeTextValue={(noHp) => this.setState({noHp})}
						autoCorrect={false} 
						placeholder="Email / Nomor Ponsel" />
				</View>	

				<View style={{marginTop:20}}>
					<Button onPress={this.onKirim} text={'Kirim'} />
				</View>

			</ScrollView>
		);
	}
}