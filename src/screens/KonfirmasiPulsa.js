import React, { Component } from 'react';
import {Text, Image, TouchableOpacity, ActivityIndicator, View, StyleSheet, ScrollView, Dimensions, Alert} from 'react-native';
import {blue, green, yellow, screenBackgroundColor, navBarHidden, WEB_BASE_URL} from '../libs/Constants';
import FloatLabelTextInput from 'react-native-floating-label-text-input'
import {postXML} from '../libs/api';
import Bold from '../components/Bold';
import Button from '../components/Button';
import SpaceBetween from '../components/SpaceBetween';
import getItem from '../libs/getItem';
import chunk from 'chunk';
import {Navigation} from 'react-native-navigation'
import Rupiah from '../libs/Rupiah';
import xml2js from 'react-native-xml2js'
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
			user: this.props.navigation.state.params.user ? this.props.navigation.state.params.user : null
		
		}
	}

	componentDidMount() {
		
	}

	componentWillMount() {
		
	}

	onKonfirmasi = () => {
		// Navigation.dismissLightBox()
		// this.props.navigator.push({
		// 	screen: 'MasukkanCode',
		// 	passProps: {
		// 		onSuccess: (securityCode) => {
		// 			this.trxPulsa(securityCode)
		// 		}
		// 	}
		// })

		this.props.navigation.navigate("MasukkanCode",{
			onSuccess: (securityCode) => {
				this.trxPulsa(securityCode)
			}
		})	
	}

	trxPulsa = (securityCode) => {
		let {user, data} = this.props.navigation.state.params
		
		generateCounter((counter) => {
			let params = {
				command : 'PURCHASE', 
				idagen : user.no_telp, 
				counter : counter, 
				pin : CryptoJS.SHA512(user.access_token + counter.toString()).toString(),
				idproduk : data.kodeproduk,
				nohp: data.noHP,
				kodeoperator: data.kodeoperator,
				nominal: data.denom,
				hargaloket: data.harga,
				pay_method : data.pay_method
			}

			var builder = new xml2js.Builder({rootName: 'posh'});
			var xml = builder.buildObject(params);

			postXML('', xml, true, (resp) => {

				Alert.alert("resp",JSON.stringify(resp))

				if(resp.posh.resultcode[0] == '0000'){

					// this.props.navigator.push({
					// 	screen: 'TransaksiSukses',
					// 	passProps: {
					// 		data: resp.posh
					// 	}
					// })

					this.props.navigation.navigate('TransaksiSukses', {
						data: resp.posh
					})
					
				}else{
					Alert.alert('Info', resp.posh.result[0])
				}
			}, () => {
				// let params = {
				// 	command : 'ADVICE', 
				// 	idagen : user.no_telp, 
				// 	key : '',
				// 	counter : data.counter, 
				// 	pin : CryptoJS.SHA512(user.access_token + data.counter.toString()).toString(),
				// 	nova : data.nova,
				// 	jmlbln : data.jmlBln,
				// 	idproduk : 'BPJSKS',
				// }

				// postXML('', xml, true, (resp) => {
				// 	if(resp.posh.resultcode[0] == '0000'){

				// 		this.props.navigator.push({
				// 			screen: 'TransaksiSukses',
				// 			passProps: {
				// 				data: resp.posh
				// 			}
				// 		})

				// 	}else{
				// 		Alert.alert('Info', resp.posh.result[0])
				// 	}
				// })
			})
		})
	}

	goToBack = () => {


		let {user} = this.state
		this.props.navigation.navigate("Pulsa", {
			user: user
		})

		// Alert.alert("screen", screen)


	}

	render() {
		let {data} = this.props.navigation.state.params
		return (
			<View style={{width:width-40, backgroundColor:'white', justifyContent: 'center', alignSelf: "center", marginTop: 38}}>		
				<ScrollView>
					<View style={{padding:20}}>
						<View>
							<Text style={{color:blue, fontWeight:'700', fontSize:20}}>Konfirmasi Pembayaran</Text>
						</View>

						<View style={{marginTop:20}}>
							<Text>Provider</Text>
							<Text style={{color:blue}}>{data.kodeoperator}</Text>
						</View>

						<View style={{marginTop:20}}>
							<Text>Nomor Tujuan</Text>
							<Text style={{color:blue}}>{data.noHP}</Text>
						</View>

						<View style={{marginTop:20}}>
							<Text>Nominal</Text>
							<Text style={{color:blue}}>{Rupiah(data.denom).replace('Rp ', '')}</Text>
						</View>

						<View style={{marginTop:20}}>
							<Text>Biaya Tagihan</Text>
							<Text style={{color:blue}}>{Rupiah(Number(data.harga))}</Text>
						</View>

						<View style={{marginTop:20}}>
							<Text>Biaya Layanan</Text>
							<Text style={{color:blue}}>{Rupiah(Number(data.admin))}</Text>
						</View>

						<View style={{marginTop:20}}>
							<Text>Cashback</Text>
							<Text style={{color:blue}}>{Rupiah(Number(data.cashback))}</Text>
						</View>

						<View style={{marginTop:20}}>
							<Text>Total Bayar</Text>
							<Text style={{color:blue}}>{Rupiah(Number(data.harga))}</Text>
						</View>
					</View>

					<View>
						<SpaceBetween>
							<TouchableOpacity onPress={() => this.goToBack()} style={{width:(width-40)/2, padding:10}}>
								<Text style={{textAlign:'center'}}>Batalkan</Text>
							</TouchableOpacity>

							<TouchableOpacity onPress={() => this.onKonfirmasi()} style={{backgroundColor:blue, width:(width-40)/2, padding:10}}>
								<Text style={{textAlign:'center', color:'white'}}>Konfirmasi</Text>
							</TouchableOpacity>
						</SpaceBetween>
					</View>
				</ScrollView>
			</View>
		);
	}
}