import React, { Component } from 'react';
import {Text, Image, TouchableOpacity, ActivityIndicator, View, StyleSheet, ScrollView, Dimensions, Alert} from 'react-native';
import {blue, green, yellow, screenBackgroundColor, navigatorStyle, WEB_BASE_URL} from '../libs/Constants';
import FloatLabelTextInput from 'react-native-floating-label-text-input'
import {postXML, postApi} from '../libs/api';
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
import {paymentOptions} from '../components/PaymentOptions';
import { TabNavigator, NavigationActions, StackActions } from "react-navigation";
import { WebView } from 'react-native-webview';
let {width, height} = Dimensions.get('window')

import {Picker} from '@react-native-picker/picker';

// let optionsTVKabel = [
// 	{
// 		label: 'Indovision',
// 		value: 'TVINDO'
// 	},
// 	{
// 		label: 'Aora TV',
// 		value: 'TVAORA'
// 	},
// 	{
// 		label: 'BIG TV PREPAID',
// 		value: 'TVBIGP'
// 	},
// 	{
// 		label: 'BIG TV POSTPAID Closed Payment',
// 		value: 'TVBIGC'
// 	},
// 	{
// 		label: 'Telkom Vision',
// 		value: 'TVTELK'
// 	},
// ]

export default class extends Component {
	static navigatorStyle = navigatorStyle;

	constructor(props){
		super(props);
		this.state = {
			user: this.props.navigation.state.params.user ? this.props.navigation.state.params.user : null,
			idPelanggan: "",
			produkSelected: "",
			pembayaran: 'Saldo'
		}
	}

	componentDidMount() {
		getItem('USER', (user) => {
			this.setState({user: user})

			generateCounter((counter) => {
				let params = {
					command : 'GETSUBPRODUKLIST',
					idproduk : 'MONEY',
					counter : counter,
					no_telp : user.no_telp, 
					signature : CryptoJS.SHA512(user.access_token + counter.toString()).toString(),
					datetime : moment().format('DD/MM/YYYY hh:mm:ss'),
					kode_parent_produk : 'TV'
				}

				postApi('', params, true, (resp) => {
					if(resp.resultcode == '0000'){
						let optionsTVKabel = []
						resp.produk.forEach((prd, i) => {
							let obj = {
								label: prd.namaproduk,
								value: prd.kode_produk,
								denom: prd.denom
							}
							optionsTVKabel.push(obj)
						});
						this.setState({optionsTVKabel})
					}else{
						
					}
				})
			})
		})
	}

	componentWillMount() {
		// this.props.navigator.setTitle({
		// 	title: 'TV Kabel'
		// })
	}

	onProses = () => {
		let {user, idPelanggan, produkSelected, pembayaran} = this.state

		//636010013925

		if(idPelanggan != "" && produkSelected != "" && pembayaran != "")
		{
			generateCounter((counter) => {
				let params = {
					command : 'INQUIRY', 
					idagen : user.no_telp, 
					idpel : idPelanggan,
					counter : counter, 
					pin : CryptoJS.SHA512(user.access_token + counter.toString()).toString(),
					idproduk : produkSelected
				}

				var builder = new xml2js.Builder({rootName: 'posh'});
				var xml = builder.buildObject(params);

				postXML('', xml, true, (resp) => {

					// Alert.alert("resp",JSON.stringify(resp))

					if(resp.posh.resultcode[0] == '0000'){
						
						let data = resp.posh
						data.counter = counter,
						data.idproduk = produkSelected

						if(pembayaran == 'Saldo'){
							data.pay_method = 0
						}else if(pembayaran == 'Point'){
							data.pay_method = 1
						}else{
							data.pay_method = 2
						}

						// this.props.navigator.showLightBox({
						// 	screen: 'KonfirmasiTVKabel',
						// 	passProps: {
						// 		data: data,
						// 		user
						// 	},
						// 	style: {
						// 		backgroundColor: '#33333380'
						// 	}
						// })

						this.props.navigation.navigate("KonfirmasiTVKabel",{
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
		let {user, idPelanggan, produkSelected, pembayaran, optionsTVKabel} = this.state

		if(!user){
			return null
		}

		if(!optionsTVKabel)
		{
			return (
				<ScrollView style={{backgroundColor:'white', padding:20}}>

				</ScrollView>
			)
		}
		if(optionsTVKabel)
		{
			return (
				<ScrollView style={{backgroundColor:'white', padding:20}}>

					<View>
						<Text style={{color:'black'}}>Produk TV Kabel</Text>

						<Picker
						   selectedValue={this.state.produkSelected}
						   onValueChange={(itemValue, itemIndex) => this.setState({produkSelected: itemValue})} 
						>
						  <Picker.Item label="Pilih" value="" />                    
						  { optionsTVKabel.map((item, key)=>(
						    <Picker.Item label={item.label} value={item.value} key={key} />)
						  )}
						        
						</Picker>
					</View>

					<View style={{marginTop:20}}>
						<Text style={{color:'black'}}>ID Pelanggan</Text>
						<View>
							<FloatLabelTextInput 
								value={idPelanggan}
								onChangeTextValue={(idPelanggan) => this.setState({idPelanggan: idPelanggan.replace(/[^0-9]/g, '')})}
								onBlur={() => this.setState({idPelanggan: idPelanggan.replace(/[^0-9]/g, '')})}
								autoCorrect={false}
								keyboardType={'phone-pad'}
								placeholder="Masukkan ID Pelanggan" />
						</View>
					</View>

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
}