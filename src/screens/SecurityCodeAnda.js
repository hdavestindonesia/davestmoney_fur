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
			user: this.props.navigation.state.params.user ? this.props.navigation.state.params.user : null,
			securityCode: null
		}

		this.textInputsRefs = [];

		
	}

	componentDidMount() {
    // DeviceEventEmitter.addListener('onKeyPressed', (e) => {
    // 	console.log(e)
    // })
		////////////////////////////////////////////////////////////////////////////
    getItem('SECURITY_CODE', (securityCode) => {
			this.setState({securityCode: securityCode})
		})
  }

  componentWillUnmount() {
    //DeviceEventEmitter.removeEventListener('onKeyPressed', this.onKeyPressed)
  }

	componentWillMount() {
		// this.props.navigator.setTitle({
		// 	title: 'UBAH SECURITY CODE'
		// })
		////////////////////////////////////////////////////////////////////////////
		// Alert.alert("tes",JSON.stringify(this.props.navigation.state.params))
	}

	onVerifikasi = (code) => {
		let {type} = this.props.navigation.state.params
		let {securityCode} = this.state

    if(code == securityCode){
    	// this.props.navigator.push({
    	// 	screen: 'BuatSecurityCode'
    	// })

    	// this.props.navigation.navigate("BuatSecurityCode")
    	/////////////////////////////
    	let {user} = this.state
			this.props.navigation.navigate("BuatSecurityCode", {
				user: user
			})


    }else{
    	Alert.alert('Info', 'Security Code Salah!')
    }
	}

	render() {
		let {no_telp} = this.props.navigation.state.params
		let {errMsg} = this.state

		

		return (
			<ScrollView style={{flex: 1}}>
				<View style={{margin:20}}>
					<Text style={{fontSize:16, textAlign:'center', fontWeight:'600', color:'black'}}>Security Code Anda</Text>

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