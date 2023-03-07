import React, { Component } from 'react';
import {Text, Image, TouchableOpacity, ActivityIndicator, View, StyleSheet, ScrollView, TextInput, Keyboard, Alert, DeviceEventEmitter} from 'react-native';
import {blue, screenBackgroundColor, navigatorStyle, WEB_BASE_URL, SECRET_CODE} from '../libs/Constants';
import FloatLabelTextInput from 'react-native-floating-label-text-input'
import {postApi} from '../libs/api';
import Bold from '../components/Bold';
import Button from '../components/Button';
import SpaceBetween from '../components/SpaceBetween';
import getItem from '../libs/getItem';
import setItem from '../libs/setItem';
import moment from 'moment';
import 'moment/locale/id';
import generateCounter from '../libs/generateCounter';
import CryptoJS from 'crypto-js';
import KeyEvent from 'react-native-keyevent';
import CodeInput from 'react-native-confirmation-code-input';
import { TabNavigator, NavigationActions, StackActions } from "react-navigation";
import { WebView } from 'react-native-webview';
export default class extends Component {
	static navigatorStyle = navigatorStyle;

	constructor(props){
		super(props);
		this.state = {
			errMsg: '',
			token:[],
			user: this.props.navigation.state.params.user ? this.props.navigation.state.params.user : null
		}

		this.textInputsRefs = [];
	}

	componentDidMount() {
    // DeviceEventEmitter.addListener('onKeyPressed', (e) => {
    // 	console.log(e)
    // })

    getItem('USER', (user) => {
    	this.setState({user})
    })
  }

  componentWillUnmount() {
    //DeviceEventEmitter.removeEventListener('onKeyPressed', this.onKeyPressed)
  }

	componentWillMount() {
		// this.props.navigator.setTitle({
		// 	title: 'UBAH SECURITY CODE'
		// })
	}

	onVerifikasi = (code) => {
		let {type, securityCode} = this.props.navigation.state.params
		let {user} = this.state

    if(code == securityCode){
    	generateCounter((counter) => {
				let params = {
					command : 'CHANGESECURITYCODE',
					idproduk : 'MONEY',
					counter : counter,
					no_telp : user.no_telp,
					signature : CryptoJS.SHA512(user.access_token + counter.toString()).toString(),
					datetime : moment().format('DD/MM/YYYY hh:mm:ss'),
					security_code : securityCode
				}

				postApi('', params, true, (resp) => {
					if(resp.resultcode == '0000'){
						setItem('SECURITY_CODE', securityCode)
						Alert.alert('Info', 'Security Code Berhasil Diubah')
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
    }else{
    	Alert.alert('Info', 'Security Code Tidak Sama!')
    }
	}

	render() {
		let {noPonsel} = this.props.navigation.state.params
		let {errMsg} = this.state

		return (
			<ScrollView style={{flex: 1}}>
				<View style={{margin:20}}>
					<Text style={{fontSize:16, textAlign:'center', fontWeight:'600', color:'black'}}>Ulang Security Code</Text>

					<Text style={{fontSize:14, textAlign:'center', marginTop:20, color:'black'}}>Security Code Anda Digunakan Untuk Keamanan Akun Anda dan Bertransaksi</Text>

					<View style={{flexDirection:'row', alignItems:'center', justifyContent:'center', marginHorizontal:30, marginTop:20}}>
						<CodeInput
				      ref="codeInputRef1"
				      activeColor={'black'}
	  					inactiveColor='black'
				      className={'border-b'}
				      codeLength={6}
				      space={10}
				      size={50}
				      inputPosition='center'
				      autoFocus={false}
				      keyboardType="phone-pad"
				      codeInputStyle={{ fontSize: 20 }}
				      onFulfill={(code) => this.onVerifikasi(code)}
				    />
					</View>

					{errMsg ? (
						<Text style={{fontSize:12, textAlign:'center', marginTop:10, color:'red'}}>{errMsg}</Text>
					) : null}

				</View>
			</ScrollView>
		);
	}
}