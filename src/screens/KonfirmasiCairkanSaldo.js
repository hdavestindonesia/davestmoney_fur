import React, { Component } from 'react';
import {Text, Image, TouchableOpacity, ActivityIndicator, View, StyleSheet, ScrollView, Dimensions, Alert} from 'react-native';
import {blue, green, yellow, screenBackgroundColor, navBarHidden, WEB_BASE_URL} from '../libs/Constants';
import FloatLabelTextInput from 'react-native-floating-label-text-input'
import {postApi} from '../libs/api';
import Bold from '../components/Bold';
import Button from '../components/Button';
import SpaceBetween from '../components/SpaceBetween';
import getItem from '../libs/getItem';
import chunk from 'chunk';
import {Navigation} from 'react-native-navigation'
import Rupiah from '../libs/Rupiah';
import moment from 'moment';
import 'moment/locale/id';
import generateCounter from '../libs/generateCounter';
import CryptoJS from 'crypto-js';

let {width, height} = Dimensions.get('window')
import { TabNavigator, NavigationActions, StackActions } from "react-navigation";
import { WebView } from 'react-native-webview';

export default class extends Component {

	constructor(props){
		super(props);
		this.state = {
			
		}
	}

	componentDidMount() {
		
	}

	componentWillMount() {
		
	}

	onKonfirmasi = () => {
		let {data, type} = this.props.navigation.state.params

		let transferType = 'transfer'
		if(type == 'bank'){
			transferType = 'transferbank'
		}

		// Navigation.dismissLightBox()
		// this.props.navigator.push({
		// 	screen: 'MasukkanCode',
		// 	passProps: {
		// 		type:  'cairkansaldo',
		// 		onSuccess: (securityCode) => {
		// 			this.cairkanSaldo(securityCode)
		// 		}
		// 	}
		// })

		this.props.navigation.navigate("MasukkanCode",{
			type:  'cairkansaldo',
			onSuccess: (securityCode) => {
				this.cairkanSaldo(securityCode)
			}
		})
	}

	cairkanSaldo = (securityCode) => {
		let {user, data} = this.props.navigation.state.params

		generateCounter((counter) => {
			let params = {
				command : 'PROSESCAIRKANSALDO', 
				idproduk : 'MONEY', 
				counter : counter, 
				no_telp : user.no_telp, 
				signature : CryptoJS.SHA512(user.access_token + counter.toString()).toString(),
				datetime : moment().format('DD/MM/YYYY hh:mm:ss'),
				nominal : data.nominal,
				nama_bank : data.nama_bank,
				no_rekening : data.no_rekening,
				nama_rekening: data.nama_rekening,
				keterangan : data.keterangan
			}

			postApi('', params, true, (resp) => {
				if(resp.resultcode == '0000'){
					// this.props.navigator.push({
					// 	screen: 'TransferSukses',
					// 	passProps: {
					// 		type: 'transfer',
					// 		data:resp
					// 	}
					// })



					Alert.alert('Info', resp.result)
					this.props.onSuccess && this.props.onSuccess()
					// this.props.navigator.resetTo({
					// 	screen: 'Home'
					// })
				}else{
					Alert.alert('Info', resp.result)
				}
			})
		})
	}

	render() {
		let {data} = this.props.navigation.state.params

		return (
			<View style={{width:width-40, backgroundColor:'white', justifyContent: 'center'}}>		
				<View style={{padding:20}}>
					<View>
						<Text style={{color:blue, fontWeight:'700', fontSize:20}}>Konfirmasi Cairkan Saldo</Text>
					</View>

					<View style={{marginTop:20}}>
						<Text>Jumlah Penarikan</Text>
						<Text style={{color:blue}}>{Rupiah(data.nominal)}</Text>
					</View>

					<View style={{marginTop:20}}>
						<Text>Bank</Text>
						<Text style={{color:blue}}>{data.nama_bank} - {data.no_rekening}</Text>
					</View>

					<View style={{marginTop:20}}>
						<Text>Nama Penerima</Text>
						<Text style={{color:blue}}>{data.nama_rekening}</Text>
					</View>

					<View style={{marginTop:20}}>
						<Text>Pesan</Text>
						<Text style={{color:blue}}>{data.keterangan}</Text>
					</View>
				</View>

				<View>
					<SpaceBetween>
						<TouchableOpacity onPress={() => Navigation.dismissLightBox()} style={{width:(width-40)/2, padding:10}}>
							<Text style={{textAlign:'center'}}>Batalkan</Text>
						</TouchableOpacity>

						<TouchableOpacity onPress={() => this.onKonfirmasi()} style={{backgroundColor:blue, width:(width-40)/2, padding:10}}>
							<Text style={{textAlign:'center', color:'white'}}>Konfirmasi</Text>
						</TouchableOpacity>
					</SpaceBetween>
				</View>
				
			</View>
		);
	}
}