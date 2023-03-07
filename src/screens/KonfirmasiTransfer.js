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
		// 		type:  transferType,
		// 		onSuccess: (securityCode) => {
		// 			if(type == 'lifeswallet'){
		// 				this.transfer(securityCode)
		// 			}else{
		// 				this.transferbank(securityCode)
		// 			}
		// 		}
		// 	}
		// })

		this.props.navigation.navigate("MasukkanCode",{
			type:  transferType,
			onSuccess: (securityCode) => {
				if(type == 'lifeswallet'){
					this.transfer(securityCode)
				}else{
					this.transferbank(securityCode)
				}
			}
		})
	}

	transfer = (securityCode) => {
		let {user, data} = this.props.navigation.state.params

		generateCounter((counter) => {
			let params = {
				command : 'TRANSFER', 
				idproduk : 'MONEY', 
				counter : counter, 
				no_telp : user.no_telp, 
				signature : CryptoJS.SHA512(user.access_token + counter.toString()).toString(),
				datetime : moment().format('DD/MM/YYYY hh:mm:ss'),
				no_telp_tujuan : data.noPonsel,
				jumlah : data.jumlah,
				keterangan: data.keterangan
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

					this.props.navigation.navigate("TransferSukses",{
						type: 'transfer',
						data:resp
					})					
				}else{
					Alert.alert('Info', resp.result)
				}
			})
		})
	}

	transferbank = (securityCode) => {
		let {user, data} = this.props.navigation.state.params

		generateCounter((counter) => {
			let params = {
				command : 'TRANSFERBANK', 
				idproduk : 'MONEY', 
				counter : counter, 
				no_telp : user.no_telp, 
				signature : CryptoJS.SHA512(user.access_token + counter.toString()).toString(),
				datetime : moment().format('DD/MM/YYYY hh:mm:ss'),
				no_rekening_tujuan : data.noRekening,
				nama_bank : data.bank.nama_bank,
				jumlah : data.jumlah
			}

			postApi('', params, true, (resp) => {
				if(resp.resultcode == '0000'){
					// this.props.navigator.push({
					// 	screen: 'TransferSukses',
					// 	passProps: {
					// 		type: 'transferbank',
					// 		data:resp
					// 	}
					// })


					this.props.navigation.navigate("TransferSukses",{
						type: 'transferbank',
						data:resp
					})

				}else{
					Alert.alert('Info', resp.result)
				}
			})
		})
	}

	render() {
		let {data, type} = this.props.navigation.state.params

		return (
			<View style={{width:width-40, backgroundColor:'white', justifyContent: 'center'}}>		
				<View style={{padding:20}}>
					<View>
						<Text style={{color:blue, fontWeight:'700', fontSize:20}}>Konfirmasi Transfer</Text>
					</View>

					<View style={{marginTop:20}}>
						<Text>Jumlah Transfer</Text>
						<Text style={{color:blue}}>{Rupiah(data.jumlah)}</Text>
					</View>

					{type == 'lifeswallet' ? (
						<View style={{marginTop:20}}>
							<Text>No. Handphone</Text>
							<Text style={{color:blue}}>{data.noPonsel}</Text>
						</View>
					) : (
						<View style={{marginTop:20}}>
							<Text>Bank</Text>
							<Text style={{color:blue}}>{data.bank.nama_bank} - {data.noRekening}</Text>
						</View>
					)}

					<View style={{marginTop:20}}>
						<Text>Tujuan</Text>
						<Text style={{color:blue}}>{data.nama}</Text>
					</View>

					<View style={{marginTop:20}}>
						<Text>Pesan</Text>
						<Text style={{color:blue}}>{data.pesan}</Text>
					</View>

					<View style={{marginTop:20}}>
						<Text>Biaya Layanan</Text>
						<Text style={{color:blue}}>{Rupiah(data.admin)}</Text>
					</View>

					<View style={{marginTop:20}}>
						<Text>Cashback</Text>
						<Text style={{color:blue}}>{Rupiah(data.cashback)}</Text>
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