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
import timer from 'react-native-timer';

import { TabNavigator, NavigationActions, StackActions } from "react-navigation";
import { WebView } from 'react-native-webview';
export default class extends Component {
	static navigatorStyle = navigatorStyle;

	constructor(props){
		super(props);
		this.state = {
			errMsg: '',
			token:[],
			txtValue: [null, null, null, null],
			user: null,
			detik_otp: this.props.navigation.state.params.durasi_otp ? this.props.navigation.state.params.durasi_otp : 0,

			// detik_otp: this.props.navigation.state.params.noPonsel ? this.props.navigation.state.params.noPonsel : "",
		}

		// Alert.alert("durasi_otp 2", this.props.route.params.tes)
		// Alert.alert("durasi_otp 3", this.props.navigation.getParam('tes'))
		// Alert.alert("durasi_otp 6", this.props.tes)

		// Alert.alert("durasi_otp 8", this.props.navigation.state.params.tes)

		

		this.textInputsRefs = [];
	}

	componentDidMount() {
		let {durasi_otp} = this.props.navigation.state.params
    DeviceEventEmitter.addListener('onKeyPressed', (e) => {
    	console.log(e)
		})
		
		if(durasi_otp){
			this.setTimer()
		}
  }

  componentWillUnmount() {
		//DeviceEventEmitter.removeEventListener('onKeyPressed', this.onKeyPressed)
		timer.clearInterval('SetCountDown')
  }

	componentWillMount() {
		// this.props.navigator.setTitle({
		// 	title: 'VALIDASI OTP'
		// })
	}

	setTimer = () => {
		timer.setInterval('SetCountDown', () => {
			let {detik_otp} = this.state
			if(detik_otp > 0){
				detik_otp = detik_otp - 1
				this.setState({detik_otp})
			}else{
				timer.clearInterval('SetCountDown')
			}
		}, 1000);
	}

	focus = (id) => {
    if (id >= 0 && id < 4) {
      this.textInputsRefs[id].focus();
    }
  }

  onKeyPressed = (e) => {
  	console.log(e)
  }

	handleEdit = (number, id) => {
		let {txtValue} = this.state
		if(number){
			txtValue[id] = number
			this.focus(id + 1);
			this.setState({txtValue})

			if(id == 3){
				let otpCode = ''
				txtValue.forEach(value => {
		  		if(value){
		  			otpCode = otpCode + value
		  		}
		    })

		    if(otpCode.length == 4){
		    	this.onVerifikasi()
		    }
			}
		}else{
			txtValue[id] = null
			this.focus(id - 1);
			this.setState({txtValue, isEnableVerification:false})
		}
	}

	onVerifikasi = () => {

		

		// let {type} = this.props
		let {type} = this.props.navigation.state.params
		let {txtValue} = this.state

		// Alert.alert("masuk",type)

		let otp = ''
		txtValue.forEach(value => {
  		if(value){
  			otp = otp + value
  		}
    })

    if(type == 'login'){
    	this.loginProses(otp)
    }else if(type == 'editphone'){
    	this.editphone(otp)
    }else if(type == 'editemail'){
    	this.editemail(otp)
    }else if(type == 'forgot'){
    	this.forgot(otp)
    }else if(type == 'register'){
    	this.register(otp)
    }else if(type == 'verifikasiemail'){
    	this.verifikasiemail(otp)
    }
	}

	loginProses = (otp) => {

		// Alert.alert("otp")


		let {noPonsel} = this.props.navigation.state.params

		generateCounter((counter) => {
			let params = {
				command : 'CEKOTP', 
				idproduk : 'MONEY', 
				counter : counter, 
				no_telp : noPonsel, 
				signature : CryptoJS.SHA512(SECRET_CODE + counter.toString()).toString(),
				datetime : moment().format('DD/MM/YYYY hh:mm:ss'),
				otp : otp
			}

			postApi('', params, true, (resp) => {
				if(resp.resultcode == '0000'){
					setItem('USER', resp)
					this.setState({user: resp})

					// this.props.navigator.push({
					// 	screen: 'MasukkanCode',
					// 	passProps: {
					// 		type: 'login',
					// 		onSuccess: (securityCode) => {
					// 			this.login(securityCode)
					// 		}
					// 	}
					// })


					this.props.navigation.navigate("MasukkanCode",{
						type: 'login',
						onSuccess: (securityCode) => {
							this.login(securityCode)
						}
					})


				}else{
					Alert.alert('Info', resp.result)
				}
			})

		})
	}

	login = (securityCode) => {
		let {user} = this.state

		generateCounter((counter) => {
			let params = {
				command : 'LOGIN', 
				idproduk : 'MONEY', 
				counter : counter, 
				no_telp : user.no_telp, 
				signature : CryptoJS.SHA512(CryptoJS.SHA512(securityCode) + user.access_token + counter.toString()).toString(),
				datetime : moment().format('DD/MM/YYYY hh:mm:ss')
			}

			postApi('', params, true, (resp) => {
				if(resp.resultcode == '0000'){
					resp.access_token = user.access_token
					setItem('USER', resp)
					setItem('SECURITY_CODE', securityCode)
					// this.props.navigator.resetTo({
					// 	screen: 'Home'
					// })

					this.props.navigation.dispatch(
						StackActions.reset({
					  		index: 0,
					  		actions: [NavigationActions.navigate({ routeName: "Home" })]
						})
					)



				}else{
					Alert.alert('Info', resp.result)
					// this.props.navigator.resetTo({
					// 	screen: 'SignIn'
					// })

					this.props.navigation.dispatch(
						StackActions.reset({
					  		index: 0,
					  		actions: [NavigationActions.navigate({ routeName: "SignIn" })]
						})
					)

				}
			})
		})
	}

	verifikasiemail = (otp) => {
		let {noPonsel} = this.props.navigation.state.params

		generateCounter((counter) => {
			let params = {
				command : 'VALIDATEOTP', 
				idproduk : 'MONEY', 
				counter : counter, 
				no_telp : noPonsel, 
				signature : CryptoJS.SHA512(SECRET_CODE + counter.toString()).toString(),
				datetime : moment().format('DD/MM/YYYY hh:mm:ss'),
				otp : otp,
				validate_type : '3'
			}

			postApi('', params, true, (resp) => {
				if(resp.resultcode == '0000'){
					// this.props.navigator.resetTo({
					// 	screen: 'SignIn'
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

	editphone = (otp) => {
		let {noPonsel} = this.props.navigation.state.params

		generateCounter((counter) => {
			let params = {
				command : 'VALIDATEOTP', 
				idproduk : 'MONEY', 
				counter : counter, 
				no_telp : noPonsel, 
				signature : CryptoJS.SHA512(SECRET_CODE + counter.toString()).toString(),
				datetime : moment().format('DD/MM/YYYY hh:mm:ss'),
				otp : otp,
				validate_type : '1'
			}

			postApi('', params, true, (resp) => {
				if(resp.resultcode == '0000'){
					// this.props.navigator.resetTo({
					// 	screen: 'SignIn'
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

	editemail = (otp) => {
		let {noPonsel} = this.props.navigation.state.params

		generateCounter((counter) => {
			let params = {
				command : 'VALIDATEOTP', 
				idproduk : 'MONEY', 
				counter : counter, 
				no_telp : noPonsel, 
				signature : CryptoJS.SHA512(SECRET_CODE + counter.toString()).toString(),
				datetime : moment().format('DD/MM/YYYY hh:mm:ss'),
				otp : otp,
				validate_type : '1'
			}

			postApi('', params, true, (resp) => {
				if(resp.resultcode == '0000'){
					// this.props.navigator.resetTo({
					// 	screen: 'SignIn'
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

	forgot = (otp) => {
		let {noPonsel} = this.props.navigation.state.params

		generateCounter((counter) => {
			let params = {
				command : 'VALIDATEOTP', 
				idproduk : 'MONEY', 
				counter : counter, 
				no_telp : noPonsel, 
				signature : CryptoJS.SHA512(SECRET_CODE + counter.toString()).toString(),
				datetime : moment().format('DD/MM/YYYY hh:mm:ss'),
				otp : otp,
				validate_type : '2'
			}

			postApi('', params, true, (resp) => {
				if(resp.resultcode == '0000'){
					// this.props.navigator.push({
					// 	screen: 'SecurityCodeBaru'
					// })

					this.props.navigation.navigate("SecurityCodeBaru")

					// Alert.alert("resp resp",JSON.stringify(resp))
				}else{
					Alert.alert('Info', resp.result)
				}
			})

		})
	}

	register = (otp) => {
		let {noPonsel} = this.props.navigation.state.params

		generateCounter((counter) => {
			let params = {
				command : 'CEKOTP', 
				idproduk : 'MONEY', 
				counter : counter, 
				no_telp : noPonsel, 
				signature : CryptoJS.SHA512(SECRET_CODE + counter.toString()).toString(),
				datetime : moment().format('DD/MM/YYYY hh:mm:ss'),
				otp : otp
			}

			postApi('', params, true, (resp) => {
				if(resp.resultcode == '0000'){
					// setItem('USER', resp)
					// this.setState({user: resp})

					// this.props.navigator.push({
					// 	screen: 'DaftarBerhasil'
					// })
					this.props.navigation.navigate("DaftarBerhasil")
				}else{
					Alert.alert('Info', resp.result)
				}
			})

		})
	}

	kirimUlang = () => {
		let {noPonsel, type} = this.props.navigation.state.params
		
		generateCounter((counter) => {
			let params = {
				command : 'GETOTP',
				idproduk : 'MONEY',
				counter : counter,
				no_telp : noPonsel, 
				signature : CryptoJS.SHA512(SECRET_CODE + counter.toString()).toString(),
				datetime : moment().format('DD/MM/YYYY hh:mm:ss'),
				tipe_otp : type == 'login' ? 1 : 0
			}

			postApi('', params, true, (resp) => {
				if(resp.resultcode == '0000'){
					this.setState({detik_otp: resp.durasi_otp})
					this.setTimer()
					Alert.alert('Info', resp.result)
				}else{
					Alert.alert('Info', resp.result)
				}
			})
		})
	}

	render() {
		let {noPonsel, email, durasi_otp} = this.props.navigation.state.params
		let {txtValue, errMsg, detik_otp} = this.state

		let pins = [];

    for (let i = 0; i < 4; i++) {
      pins.push(
        <View key={i} style={{flex:1, marginHorizontal:10, borderBottomWidth:1, borderBottomColor:'black', padding:5}}>
					<TextInput 
          	ref={ref => (this.textInputsRefs[i] = ref)}
          	style={{fontSize:24}}
          	underlineColorAndroid={'white'}
          	value={txtValue[i]}
          	onChangeText={text => this.handleEdit(text, i)}
          	maxLength={1}
						keyboardType='phone-pad' />
				</View>
      );
    }

		return (
			<ScrollView style={{flex: 1}}>
				<View style={{margin:20}}>
					<Text style={{fontSize:16, textAlign:'center', fontWeight:'600', color:'black'}}>Masukkan Code</Text>

					<Text style={{fontSize:14, textAlign:'center', marginTop:20, color:'black'}}>Kami telah mengirimkan kode ke {email ? email : noPonsel}</Text>

					<View style={{flexDirection:'row', alignItems:'center', justifyContent:'center', marginHorizontal:30, marginTop:20}}>
						{pins}
					</View>

					{errMsg ? (
						<Text style={{fontSize:12, textAlign:'center', marginTop:10, color:'red'}}>{errMsg}</Text>
					) : null}

					{durasi_otp ? 
						<TouchableOpacity onPress={() => detik_otp == 0 ? this.kirimUlang() : null}>
							<Text style={{fontSize:14, textAlign:'center', marginTop:30, color: detik_otp == 0 ? blue : 'grey'}}>Kirim Ulang <Text style={{color:'grey'}}>({detik_otp})</Text></Text>
						</TouchableOpacity>
						: null
					}


					

				</View>
			</ScrollView>
		);
	}
}