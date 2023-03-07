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
import { WebView } from 'react-native-webview';
import { TabNavigator, NavigationActions, StackActions } from "react-navigation";
export default class extends Component {
	static navigatorStyle = navigatorStyle;

	constructor(props){
		super(props);
		this.state = {
			nama: null,
			noPonsel: null,
			email: null,
			kodePromo: null,
			securityCode: null,
			securityCodeConfirm: null,
			isConfirmed: false,
			isShowSecurityCode: false,
		}
	}

	componentDidMount() {
		
	}

	componentWillMount() {
		// this.props.navigator.setTitle({
		// 	title: 'DAFTAR'
		// })
	}

	onDaftar = () => {
		let {nama, noPonsel, email, kodePromo, isConfirmed, securityCode, securityCodeConfirm} = this.state

		if(!nama && !noPonsel && !email && !securityCode){
			Alert.alert('Info', 'Harap lengkapi data pengguna')
			return
		}

		if(securityCode.length < 6){
			Alert.alert('Info', 'Security Code harus 6 digit angka')
			return
		}

		if(securityCodeConfirm.length < 6){
			Alert.alert('Info', 'Security Code Konfirmasi harus 6 digit angka')
			return
		}

		if(securityCode !== securityCodeConfirm){
			Alert.alert('Info', 'Kode Yang dimasukkan Harus Sama !!')
			return
		}

		// if(!isConfirmed){
		// 	Alert.alert('Info', 'Harap centang Syarat dan Ketentuan terlebih dahulu')
		// 	return
		// }

		generateCounter((counter) => {
			let params = {
				command : 'REGISTRASI', 
				idproduk : 'MONEY', 
				counter : counter, 
				signature : CryptoJS.SHA512(SECRET_CODE + counter.toString()).toString(),
				datetime : moment().format('DD/MM/YYYY hh:mm:ss'),
				no_telp : noPonsel, 
				nama_user : nama, 
				email : email, 
				security_code : securityCode,
			}

			postApi('', params, true, (resp) => {
				if(resp.resultcode == '0000'){
					this.getOtp()
				}else{
					Alert.alert('Info', resp.result)
				}
			})
		})
	}

	getOtp = () => {
		let {nama, noPonsel, email, kodePromo, isConfirmed, securityCode} = this.state

		generateCounter((counter) => {
			let params = {
				command : 'GETOTP',
				idproduk : 'MONEY',
				counter : counter,
				no_telp : noPonsel, 
				signature : CryptoJS.SHA512(SECRET_CODE + counter.toString()).toString(),
				datetime : moment().format('DD/MM/YYYY hh:mm:ss'),
				tipe_otp : 0
			}

			postApi('', params, true, (resp) => {
				if(resp.resultcode == '0000'){
					// this.props.navigator.push({
					// 	screen: 'SignInCode',
					// 	passProps: {
					// 		type: 'register',
					// 		noPonsel,
					// 		durasi_otp: resp.durasi_otp
					// 	}
					// })

					this.props.navigation.navigate("SignInCode",{
						type: 'register',
						noPonsel,
						durasi_otp: resp.durasi_otp
					})


				}else{
					Alert.alert('Info', resp.result)
				}
			})
		})
	}

	onSyaratKetentuan = () => {
		let {noPonsel} = this.state
		// this.props.navigator.push({
		// 	screen: 'SyaratKetentuan',
		// 	passProps: {
		// 		noPonsel
		// 	}
		// })

		this.props.navigation.navigate("SyaratKetentuan",{
			noPonsel
		})		
	}

	render() {
		let {isConfirmed, isShowSecurityCode, noPonsel, securityCode,securityCodeConfirm} = this.state
		return (
			<ScrollView style={{margin:20}}>
				<Text style={{fontSize:16}}>Kami akan mengirimkan kode melalui SMS dan Email untuk Verifikasi Proses Registrasi</Text>

				<View style={{marginTop:20}}>
					<FloatLabelTextInput 
						onChangeTextValue={(nama) => this.setState({nama})}
						autoCorrect={false} 
						placeholder="Nama Lengkap" />
				</View>	
				<View style={{marginTop:20}}>
					<FloatLabelTextInput 
						value={noPonsel}
						onChangeTextValue={(noPonsel) => this.setState({noPonsel: noPonsel.replace(/[^0-9]/g, '')})}
						onBlur={() => this.setState({noPonsel: noPonsel.replace(/[^0-9]/g, '')})}
						autoCorrect={false} 
						maxLength={15}
						keyboardType={'phone-pad'}
						placeholder="Nomor Ponsel" />
				</View>	
				<View style={{marginTop:20}}>
					<FloatLabelTextInput 
						onChangeTextValue={(email) => this.setState({email})}
						autoCorrect={false} 
						placeholder="Email" />
				</View>
				<View style={{marginTop:20}}>
					<FloatLabelTextInput 
						onChangeTextValue={(kodePromo) => this.setState({kodePromo})}
						autoCorrect={false} 
						placeholder="Kode Promo (Optional)" />
				</View>	
				<View style={{marginTop:20}}>
					<FloatLabelTextInput 
						value={securityCode}
						onChangeTextValue={(securityCode) => this.setState({securityCode: securityCode.replace(/[^0-9]/g, '')})}
						onBlur={() => this.setState({securityCode: securityCode.replace(/[^0-9]/g, '')})}
						autoCorrect={false} 
						maxLength={6}
						keyboardType={'numeric'}
						secureTextEntry={isShowSecurityCode ? false : true}
						placeholder="Security Code (6 Digit Angka)" />

					<TouchableOpacity onPress={() => this.setState({ isShowSecurityCode: !isShowSecurityCode })} style={{ position: 'absolute', right: 10, top: 10 }}>
						<Image style={{ height: 30, width: 30 }} source={isShowSecurityCode ? require('../assets/images/eye.png') : require('../assets/images/eye2.png')} />
					</TouchableOpacity>
				</View>	

				<View style={{marginTop:20}}>
					<FloatLabelTextInput 
						value={securityCodeConfirm}
						onChangeTextValue={(securityCodeConfirm) => this.setState({securityCodeConfirm: securityCodeConfirm.replace(/[^0-9]/g, '')})}
						onBlur={() => this.setState({securityCodeConfirm: securityCodeConfirm.replace(/[^0-9]/g, '')})}
						autoCorrect={false} 
						maxLength={6}
						keyboardType={'numeric'}
						secureTextEntry={isShowSecurityCode ? false : true}
						placeholder="Security Code Confirmation(6 Digit Angka)" />

					<TouchableOpacity onPress={() => this.setState({ isShowSecurityCode: !isShowSecurityCode })} style={{ position: 'absolute', right: 10, top: 10 }}>
						<Image style={{ height: 30, width: 30 }} source={isShowSecurityCode ? require('../assets/images/eye.png') : require('../assets/images/eye2.png')} />
					</TouchableOpacity>
				</View>	

				<View style={{marginTop:20, flexDirection:'row', display:"none"}}>
					<Checkmark onPress={()=> this.setState({isConfirmed:!isConfirmed})} checked={isConfirmed} />
					<Text style={{paddingTop:7}}>Saya setuju dengan </Text>
					<TouchableOpacity onPress={this.onSyaratKetentuan} style={{paddingTop:7}}>
						<Text style={{color:blue}}>syarat dan ketentuan</Text>
					</TouchableOpacity>
				</View>

				<View style={{marginTop:20}}>
					<Button onPress={() => this.onDaftar()} text={'Daftar'} />
				</View>

			</ScrollView>
		);
	}
}