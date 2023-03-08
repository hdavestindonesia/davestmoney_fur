import React, { Component } from 'react';
import {Text, Image, TouchableOpacity, ActivityIndicator, View, StyleSheet, ScrollView, Dimensions, Alert} from 'react-native';
import {blue, green, yellow, screenBackgroundColor, navigatorStyle, WEB_BASE_URL} from '../libs/Constants';
import FloatLabelTextInput from 'react-native-floating-label-text-input'
import {getApi, postXML} from '../libs/api';
import Bold from '../components/Bold';
import Button from '../components/Button';
import SpaceBetween from '../components/SpaceBetween';
import getItem from '../libs/getItem';
import chunk from 'chunk';
import DropDownList from '../components/DropDownList';
import Rupiah from '../libs/Rupiah';
import xml2js from 'react-native-xml2js'
import moment from 'moment';
import 'moment/locale/id';
import generateCounter from '../libs/generateCounter';
import CryptoJS from 'crypto-js';
import {filter} from 'lodash'
import {paymentOptions} from '../components/PaymentOptions';

import {Picker} from '@react-native-picker/picker';

import { TabNavigator, NavigationActions, StackActions } from "react-navigation";
import { WebView } from 'react-native-webview';
let {width, height} = Dimensions.get('window')

let optionsPLN = [
	{
		label: 'PLN PREPAID',
		value: 'PLNPRE'
	},
	{
		label: 'PLN POSTPAID',
		value: 'PLNPOS'
	},
	{
		label: 'PLN NONTAGLIS',
		value: 'PLNNON'
	},
]

let optionsToken = [
	{
		label: '20.000',
		value: '20000'
	},
	{
		label: '50.000',
		value: '50000'
	},
	{
		label: '100.000',
		value: '100000'
	},
	{
		label: '200.000',
		value: '200000'
	},
	{
		label: '500.000',
		value: '500000'
	},
	{
		label: '1.000.000',
		value: '1000000'
	},
]

export default class extends Component {
	static navigatorStyle = navigatorStyle;

	constructor(props){
		super(props);
		this.state = {
			user: this.props.navigation.state.params.user ? this.props.navigation.state.params.user : null,
			idPelanggan: "",
			plnID: "",
			nominal: "",
			pembayaran: 'Saldo'
		}
	}

	componentDidMount() {
		getItem('USER', (user) => {
			this.setState({user: user})
		})
	}

	componentWillMount() {
		// this.props.navigator.setTitle({
		// 	title: 'PLN'
		// })
	}

	showConfirmation = () => {
		this.props.navigator.showLightBox({
			screen: 'KonfirmasiPembayaran',
			style: {
				backgroundColor: '#33333380'
			}
		})
	}

	onProses = () => {
		let {idPelanggan, user, plnID, nominal, pembayaran} = this.state

		if(!plnID){
			Alert.alert('INFO', 'Pilih Produk PLN terlebih dahulu')
			return
		}

		if(!idPelanggan){
			Alert.alert('INFO', 'Isikan ID Pelanggan/ID Meter terlebih dahulu')
			return
		}

		if(!plnID == 'PLNPRE' && !nominal){
			Alert.alert('INFO', 'Isikan Nominal terlebih dahulu')
			return
		}

		//551111111111
		//1234567890123
		//14234567891

		if(idPelanggan != "" && plnID != "" && nominal != "" && pembayaran != "")
		{
			generateCounter((counter) => {
				let params = {}

				if(plnID == 'PLNPOS'){
					params = {
						command : 'INQUIRY', 
						idagen : user.no_telp, 
						idpel : idPelanggan,
						counter : counter, 
						pin : CryptoJS.SHA512(user.access_token + counter.toString()).toString(),
						idproduk : 'PLNPOS'
					}
				}else if(plnID == 'PLNNON'){
					params = {
						command : 'INQUIRY', 
						idagen : user.no_telp, 
						noreg : idPelanggan,
						counter : counter, 
						pin : CryptoJS.SHA512(user.access_token + counter.toString()).toString(),
						idproduk : 'PLNNON'
					}
				}else if(plnID == 'PLNPRE'){
					params = {
						command : 'INQUIRY', 
						idagen : user.no_telp, 
						idmeter : idPelanggan,
						counter : counter, 
						pin : CryptoJS.SHA512(user.access_token + counter.toString()).toString(),
						idproduk : 'PLNPRE'
					}
				}

				var builder = new xml2js.Builder({rootName: 'posh'});
				var xml = builder.buildObject(params);

				postXML('', xml, true, (resp) => {

					// Alert.alert("resp",JSON.stringify(resp))

					if(resp.posh.resultcode[0] == '0000'){
						
						let data = resp.posh
						data.counter = counter
						data.nominal = nominal

						if(pembayaran == 'Saldo'){
							data.pay_method = 0
						}else if(pembayaran == 'Point'){
							data.pay_method = 1
						}else{
							data.pay_method = 2
						}

						// this.props.navigator.showLightBox({
						// 	screen: 'KonfirmasiPLN',
						// 	passProps: {
						// 		data: data,
						// 		user
						// 	},
						// 	style: {
						// 		backgroundColor: '#33333380'
						// 	}
						// })

						this.props.navigation.navigate("KonfirmasiPLN",{
							data: data,
							user
						})
						
					}else{
						Alert.alert('Info', resp.posh.result[0])
					}
				})
			})
		}
	}

	render() {
		let {idPelanggan, user, plnID, nominal, pembayaran} = this.state

		if(!user){
			return null
		}

		let plnSelected = null
		let placeholder = 'Masukkan ID Pelanggan/ID Meter'
		if(plnID){
			plnSelected = filter(optionsPLN, {'value': plnID})[0]
			if(plnID == 'PLNNON'){
				placeholder = 'No.Registrasi'
			}
		}

		return (
			<ScrollView style={{backgroundColor:'white', padding:20}}>
				<View>
					<Text style={{color:'black'}}>Produk PLN</Text>

					<Picker
					   selectedValue={this.state.plnID}
					   onValueChange={(itemValue, itemIndex) => this.setState({plnID: itemValue})} 
					>
					  <Picker.Item label="Pilih" value="" />             
					  { optionsPLN.map((item, key)=>(
					    <Picker.Item label={item.label} value={item.value} key={key} />)
					  )}
					        
					</Picker>
				</View>

				<View style={{marginTop:20}}>
					<Text style={{color:'black'}}>{placeholder}</Text>
					<View>
						<FloatLabelTextInput 
							value={idPelanggan}
							onChangeTextValue={(idPelanggan) => this.setState({idPelanggan: idPelanggan.replace(/[^0-9]/g, '')})}
							onBlur={() => this.setState({idPelanggan: idPelanggan.replace(/[^0-9]/g, '')})}
							autoCorrect={false} 
							keyboardType={'phone-pad'}
							placeholder={placeholder} />
					</View>
				</View>

				{plnID == 'PLNPRE' &&
					<View style={{marginTop:20}}>
						<Text style={{color:'black'}}>Nominal</Text>

						<Picker
						   selectedValue={this.state.nominal}
						   onValueChange={(itemValue, itemIndex) => this.setState({nominal: itemValue})} 
						>
						  <Picker.Item label="Pilih" value="" />                              
						  { optionsToken.map((item, key)=>(
						    <Picker.Item label={item.label} value={item.value} key={key} />)
						  )}
						        
						</Picker>
					</View>
				}
				

				<View style={{marginTop:20}}>
					<Text style={{color:'black'}}>Metode Pembayaran</Text>

					<Picker
					   selectedValue={this.state.pembayaran}
					   onValueChange={(itemValue, itemIndex) => this.setState({pembayaran: itemValue})} 
					>
					   <Picker.Item label="Pilih" value="" />                                     
					  { paymentOptions.map((item, key)=>(
					    <Picker.Item label={item.label} value={item.value} key={key} />)
					  )}
					        
					</Picker>
				</View>

				<View>
					<SpaceBetween>
						<Text style={{color:'blue'}}>Saldo DavestMoney</Text>
						<Text style={{color:'blue'}}>{Rupiah(user.sisasaldo)}</Text>
					</SpaceBetween>
					<SpaceBetween>
						<Text style={{color:'blue'}}>Point</Text>
						<Text style={{color:'blue'}}>{Rupiah(user.jumlahpoin, false)}</Text>
					</SpaceBetween>
				</View>

				<View style={{marginTop:50}}>
					<Button onPress={() => this.onProses()} text={'Proses'} />
				</View>
			</ScrollView>
		);
	}
}