import React, { Component } from 'react';
import {Text, Image, TouchableOpacity, ActivityIndicator, View, StyleSheet, ScrollView, Alert} from 'react-native';
import {blue, green, screenBackgroundColor, navigatorStyle, WEB_BASE_URL, SECRET_CODE} from '../libs/Constants';
import FloatLabelTextInput from 'react-native-floating-label-text-input'
import {postApi} from '../libs/api';
import Bold from '../components/Bold';
import Button from '../components/Button';
import SpaceBetween from '../components/SpaceBetween';
import getItem from '../libs/getItem';
import setItem from '../libs/setItem';
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
			securityCode: null,
			securityCodeConfirm: null,
		}
	}

	componentDidMount() {
		getItem('USER', (user) => {
			this.setState({user: user})
		})
	}

	componentWillMount() {
		// this.props.navigator.setTitle({
		// 	title: 'SECURITY CODE BARU'
		// })
	}

	onKirim = () => {
		let {securityCode, securityCodeConfirm, user} = this.state

		if(!securityCode){
			Alert.alert('Info', 'Harap isikan Security Code Baru')
			return
		}
		
		if(!securityCodeConfirm){
			Alert.alert('Info', 'Harap isikan Konfirmasi Security Code Baru')
			return
		}

		if(securityCode !== securityCodeConfirm){
			Alert.alert('Info', 'Kode Yang dimasukkan Harus Sama !!')
			return
		}


		generateCounter((counter) => {
			let params = {
				command : 'RESETPASS',
				idproduk : 'MONEY',
				counter : counter,
				no_telp : user.no_telp, 
				signature : CryptoJS.SHA512(SECRET_CODE + counter.toString()).toString(),
				datetime : moment().format('DD/MM/YYYY hh:mm:ss'),
				securitycode : securityCode
			}

			postApi('', params, true, (resp) => {
				if(resp.resultcode == '0000'){
					setItem('SECURITY_CODE', securityCode)
					// this.props.navigator.resetTo({
					// 	screen: 'SignIn',
					// })

					this.props.navigation.dispatch(
						StackActions.reset({
					  		index: 0,
					  		actions: [NavigationActions.navigate({ routeName: "SignIn" })]
						})
					)
				}else{
					Alert.alert('Info', resp.result)
				}
			})
		})
	}

	render() {
		let {securityCode, securityCodeConfirm} = this.state
		return (
			<ScrollView style={{margin:20}}>
				<Text style={{fontSize:20, fontWeight:'600'}}>Masukkan Security Code Baru</Text>

				<Text style={{fontSize:16}}>Masukkan Security Code Baru untuk memperbaharui Security Code Anda</Text>

				<View style={{marginTop:20}}>
					<FloatLabelTextInput 
						onChangeTextValue={(securityCode) => this.setState({securityCode})}
						autoCorrect={false}
						keyboardType={'phone-pad'}
						maxLength={6}
						placeholder="Security Code Baru (6 Digit Angka)" 
					/>
				</View>	

				<View style={{marginTop:20}}>
					<FloatLabelTextInput 
						onChangeTextValue={(securityCodeConfirm) => this.setState({securityCodeConfirm})}
						autoCorrect={false}
						keyboardType={'phone-pad'}
						maxLength={6}
						placeholder="Konfirmasi Security Code Baru (6 Digit Angka)" 
					/>
				</View>	

				<View style={{marginTop:20}}>
					<Button onPress={this.onKirim} text={'Kirim'} />
				</View>

			</ScrollView>
		);
	}
}