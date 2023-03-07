import React, { Component } from 'react';
import {Text, Image, TouchableOpacity, ActivityIndicator, View, StyleSheet, ScrollView, Dimensions, Alert} from 'react-native';
import {blue, green, yellow, screenBackgroundColor, navBarHidden, WEB_BASE_URL} from '../libs/Constants';
import FloatLabelTextInput from 'react-native-floating-label-text-input'
import {postXML, postApi} from '../libs/api';
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
		// 			this.trxpln(securityCode)
		// 		}
		// 	}
		// })


		// this.props.navigation.navigate("MasukkanCode",{
		// 	onSuccess: (securityCode) => {
		// 		this.trxpln(securityCode)
		// 	}
		// })

		this.props.navigation.navigate("MasukkanCode",{
			onSuccess: (securityCode) => {
				this.trxpln(securityCode)
			}
		})	
	}

	trxpln = (securityCode) => {
		let {user, data} = this.props.navigation.state.params
		
		let params = {}
		if(data.idproduk == 'PLNPOS'){
			params = {
				command : 'PAYMENT', 
				idagen : user.no_telp, 
				counter : data.counter, 
				pin : CryptoJS.SHA512(user.access_token + data.counter.toString()).toString(),
				idpel : data.idpel,
				jumlahtagihan : data.jumlahtagihan,
				idproduk : 'PLNPOS',
				pay_method : data.pay_method
			}
		}else if(data.idproduk == 'PLNNON'){
			params = {
				command : 'PAYMENT', 
				idagen : user.no_telp, 
				counter : data.counter, 
				pin : CryptoJS.SHA512(user.access_token + data.counter.toString()).toString(),
				noreg : data.noreg,
				idproduk : 'PLNNON',
				pay_method : data.pay_method
			}
		}else if(data.idproduk == 'PLNPRE'){
			params = {
				command : 'PURCHASE', 
				idagen : user.no_telp, 
				nominal: data.nominal,
				counter : data.counter, 
				pin : CryptoJS.SHA512(user.access_token + data.counter.toString()).toString(),
				idmeter : data.idmeter,
				idproduk : 'PLNPRE',
				buyingoption: '0',
				pay_method : data.pay_method
			}
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

				this.props.navigation.navigate("TransaksiSukses",{
					data: resp.posh
				})

				
			}else{
				Alert.alert('Info', resp.posh.result[0])
			}
		}, ()=> {

			let params = {}
			if(data.idproduk == 'PLNPOS'){
				params = {
					command : 'REVERSAL', 
					idagen : user.no_telp, 
					counter : data.counter, 
					pin : CryptoJS.SHA512(user.access_token + data.counter.toString()).toString(),
					idpel : data.idpel,
					jumlahtagihan : data.jumlahtagihan,
					idproduk : 'PLNPOS',
					pay_method : data.pay_method
				}
			}else if(data.idproduk == 'PLNNON'){
				params = {
					command : 'REVERSAL', 
					idagen : user.no_telp, 
					counter : data.counter, 
					pin : CryptoJS.SHA512(user.access_token + data.counter.toString()).toString(),
					idproduk : 'PLNNON',
					noreg : data.noreg,
					pay_method : data.pay_method
				}
			}else if(data.idproduk == 'PLNPRE'){
				params = {
					command : 'ADVICE', 
					idagen : user.no_telp, 
					nominal : data.nominal,
					counter : data.counter, 
					pin : CryptoJS.SHA512(user.access_token + data.counter.toString()).toString(),
					idmeter : data.idmeter,
					idproduk : 'PLNPRE',
					buyingoption : '0',
					pay_method : data.pay_method
				}
			}

			var builder = new xml2js.Builder({rootName: 'posh'});
			var xml = builder.buildObject(params);

			postXML('', xml, true, (resp) => {
				if(resp.posh.resultcode[0] == '0000'){

					// this.props.navigator.push({
					// 	screen: 'TransaksiSukses',
					// 	passProps: {
					// 		data: resp.posh
					// 	}
					// })

					this.props.navigation.navigate("TransaksiSukses",{
						data: resp.posh
					})
					
				}else{
					Alert.alert('Info', resp.posh.result[0])
				}
			})
		})
	}

	plnPos = () => {
		let {data} = this.props.navigation.state.params
		return (
			<View>
				<View style={{marginTop:20}}>
					<Text>Produk PLN</Text>
					<Text style={{color:blue}}>Post Paid</Text>
				</View>

				<View style={{marginTop:20}}>
					<Text>ID Pelanggan/ID Meter</Text>
					<Text style={{color:blue}}>{data.idpel}</Text>
				</View>

				<View style={{marginTop:20}}>
					<Text>Nama Pelanggan</Text>
					<Text style={{color:blue}}>{data.nama}</Text>
				</View>

				<View style={{marginTop:20}}>
					<Text>Daya</Text>
					<Text style={{color:blue}}>{Number(data.daya)}</Text>
				</View>

				<View style={{marginTop:20}}>
					<Text>Biaya Tagihan</Text>
					<Text style={{color:blue}}>{Rupiah(Number(data.rptagihan1))}</Text>
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
					<Text style={{color:blue}}>{Rupiah(Number(data.totaltagihan))}</Text>
				</View>
			</View>
		)
	}

	plnNon = () => {
		let {data} = this.props.navigation.state.params
		return (
			<View>
				<View style={{marginTop:20}}>
					<Text>Produk PLN</Text>
					<Text style={{color:blue}}>Non Taglis</Text>
				</View>

				<View style={{marginTop:20}}>
					<Text>No. Reg</Text>
					<Text style={{color:blue}}>{data.noreg}</Text>
				</View>

				<View style={{marginTop:20}}>
					<Text>Nama Pelanggan</Text>
					<Text style={{color:blue}}>{data.nama}</Text>
				</View>

				<View style={{marginTop:20}}>
					<Text>Biaya Tagihan</Text>
					<Text style={{color:blue}}>{Rupiah(Number(data.rptagihan))}</Text>
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
					<Text style={{color:blue}}>{Rupiah(Number(data.totaltagihan))}</Text>
				</View>
			</View>
		)
	}

	plnPre = () => {
		let {data} = this.props.navigation.state.params
		return (
			<View>
				<View style={{marginTop:20}}>
					<Text>Produk PLN</Text>
					<Text style={{color:blue}}>Prepaid</Text>
				</View>

				<View style={{marginTop:20}}>
					<Text>ID Meter</Text>
					<Text style={{color:blue}}>{data.idmeter}</Text>
				</View>

				<View style={{marginTop:20}}>
					<Text>Nama Pelanggan</Text>
					<Text style={{color:blue}}>{data.nama}</Text>
				</View>

				<View style={{marginTop:20}}>
					<Text>Daya</Text>
					<Text style={{color:blue}}>{data.daya}</Text>
				</View>

				<View style={{marginTop:20}}>
					<Text>Nominal</Text>
					<Text style={{color:blue}}>{Rupiah(data.nominal).replace('Rp ', '')}</Text>
				</View>

				<View style={{marginTop:20}}>
					<Text>Biaya Layanan</Text>
					<Text style={{color:blue}}>{Rupiah(data.admin).replace('Rp ', '')}</Text>
				</View>

				<View style={{marginTop:20}}>
					<Text>Cashback</Text>
					<Text style={{color:blue}}>{Rupiah(data.cashback).replace('Rp ', '')}</Text>
				</View>
			</View>
		)
	}

	render() {
		let {data} = this.props.navigation.state.params
		return (
			<View style={{width:width-40, backgroundColor:'white', justifyContent: 'center'}}>		
				<ScrollView>
					<View style={{padding:20}}>
						<View>
							<Text style={{color:blue, fontWeight:'700', fontSize:20}}>Konfirmasi Pembayaran</Text>
						</View>

						{data.idproduk == 'PLNPOS' && this.plnPos()}
						{data.idproduk == 'PLNNON' && this.plnNon()}
						{data.idproduk == 'PLNPRE' && this.plnPre()}
						
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
				</ScrollView>
			</View>
		);
	}
}