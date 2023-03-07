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

// let optionsPDAM = [
// 	{
// 		"label": "PDAM Aetra Jakarta",
// 		"value": "PDMAET"
// 	},
// 	{
// 		"label": "PDAM Palyja Jakarta",
// 		"value": "PDMPAL"
// 	},
// 	{
// 		"label": "PDAM Kab Balangan",
// 		"value": "PDMBAL"
// 	},
// 	{
// 		"label": "PDAM Kota Bandung",
// 		"value": "PDMBDG"
// 	},
// 	{
// 		"label": "PDAM Bandar Lampung",
// 		"value": "PDMLAM"
// 	},
// 	{
// 		"label": "PDAM Banjarmasin",
// 		"value": "PDMBAN"
// 	},
// 	{
// 		"label": "PDAM Kota Bekasi",
// 		"value": "PDMBEK"
// 	},
// 	{
// 		"label": "PDAM Kota Malang",
// 		"value": "PDMMAL"
// 	},
// 	{
// 		"label": "PDAM Magelang",
// 		"value": "PDMMAG"
// 	},
// 	{
// 		"label": "PDAM Kota Bogor",
// 		"value": "PDMBOG"
// 	},
// 	{
// 		"label": "PDAM Kendal",
// 		"value": "PDMKEN"
// 	},
// 	{
// 		"label": "PDAM Kab Banyumas",
// 		"value": "PDMBYM"
// 	},
// 	{
// 		"label": "PDAM Giri Menang Mataram",
// 		"value": "PDMMAT"
// 	},
// 	{
// 		"label": "PDAM Jepara",
// 		"value": "PDMJEP"
// 	},
// 	{
// 		"label": "PDAM Hulu Sungai Tengah",
// 		"value": "PDMHST"
// 	},
// 	{
// 		"label": "PDAM Intan Banjar",
// 		"value": "PDMINT"
// 	},
// 	{
// 		"label": "PDAM Sleman",
// 		"value": "PDMSLE"
// 	},
// 	{
// 		"label": "PDAM Bondowoso",
// 		"value": "PDMBON"
// 	},
// 	{
// 		"label": "PDAM Bangkalan",
// 		"value": "PDMBGK"
// 	},
// 	{
// 		"label": "PDAM Kota Palembang",
// 		"value": "PDMPLB"
// 	},
// 	{
// 		"label": "PDAM Kota Jambi",
// 		"value": "PDMJAM"
// 	},
// 	{
// 		"label": "PDAM Kab Lampung",
// 		"value": "PDMLPG"
// 	},
// 	{
// 		"label": "PDAM Kab Bandung",
// 		"value": "PDMKBG"
// 	},
// 	{
// 		"label": "PDAM Boyolali",
// 		"value": "PDMBOY"
// 	},
// 	{
// 		"label": "PDAM Kab Brebes",
// 		"value": "PDMBRE"
// 	},
// 	{
// 		"label": "PDAM Kab Tapin",
// 		"value": "PDMTAP"
// 	},
// 	{
// 		"label": "PDAM Kab Buleleng",
// 		"value": "PDMBUL"
// 	},
// 	{
// 		"label": "PDAM Kab Kebumen",
// 		"value": "PDMKEB"
// 	},
// 	{
// 		"label": "PDAM Jember",
// 		"value": "PDMJEM"
// 	},
// 	{
// 		"label": "PDAM Kab Situbondo",
// 		"value": "PDMSIT"
// 	},
// 	{
// 		"label": "PDAM Kota Balikpapan",
// 		"value": "PDMBKP"
// 	},
// 	{
// 		"label": "PDAM Kab Bogor",
// 		"value": "PDMKBO"
// 	},
// 	{
// 		"label": "PDAM Kab Cilacap",
// 		"value": "PDMCIL"
// 	},
// 	{
// 		"label": "PDAM Kab Grobongan",
// 		"value": "PDMGRO"
// 	},
// 	{
// 		"label": "PDAM Kab Malang",
// 		"value": "PDMKMA"
// 	},
// 	{
// 		"label": "PDAM Kota Kubu Raya",
// 		"value": "PDMKKR"
// 	},
// 	{
// 		"label": "PDAM Kota Makassar",
// 		"value": "PDMMKS"
// 	},
// 	{
// 		"label": "PDAM Kota Manado",
// 		"value": "PDMMAN"
// 	},
// 	{
// 		"label": "PDAM Kota Pontianak.",
// 		"value": "PDMPON"
// 	},
// 	{
// 		"label": "PDAM Kota Semarang.",
// 		"value": "PDMSMG"
// 	},
// 	{
// 		"label": "PDAM Kab Sragen.",
// 		"value": "PDMSRA"
// 	},
// 	{
// 		"label": "PDAM Kab Temanggung. ",
// 		"value": "PDMTMG"
// 	},
// 	{
// 		"label": "PDAM Kab Wonogiri",
// 		"value": "PDMWGR"
// 	},
// 	{
// 		"label": "PDAM Kab Wonosobo",
// 		"value": "PDMWON"
// 	},
// 	{
// 		"label": "PDAM Kab Lombok Tengah",
// 		"value": "PDMLBT"
// 	},
// 	{
// 		"label": "PDAM Kab Rembang",
// 		"value": "PDMREM"
// 	},
// 	{
// 		"label": "PDAM Kab Purbalingga",
// 		"value": "PDMPUR"
// 	},
// 	{
// 		"label": "PDAM Kab Karanganyar",
// 		"value": "PDMKAR"
// 	},
// 	{
// 		"label": "PDAM Kota Banjar",
// 		"value": "PDMBJR"
// 	},
// 	{
// 		"label": "PDAM Kota Madiun",
// 		"value": "PDMMDN"
// 	},
// 	{
// 		"label": "PDAM Kota Salatiga",
// 		"value": "PDMSLT"
// 	},
// 	{
// 		"label": "PDAM Kota Surakarta",
// 		"value": "PDMSKT"
// 	},
// 	{
// 		"label": "PDAM Purworejo",
// 		"value": "PDMPWR"
// 	},
// 	{
// 		"label": "PDAM Denpasar",
// 		"value": "PDMDPS"
// 	},
// 	{
// 		"label": "PDAM Sidoarjo",
// 		"value": "PDMSID"
// 	},
// 	{
// 		"label": "PDAM Surabaya",
// 		"value": "PDMSBY"
// 	},
// 	{
// 		"label": "PDAM Bojonegoro",
// 		"value": "PDMBOJ"
// 	},
// 	{
// 		"label": "PDAM Mojokerto",
// 		"value": "PDMMOJ"
// 	},
// 	{
// 		"label": "PDAM Kab Semarang",
// 		"value": "PDMSMN"
// 	},
// 	{
// 		"label": "PDAM Pekalongan",
// 		"value": "PDMPEK"
// 	},
// 	{
// 		"label": "PDAM Kota Medan",
// 		"value": "PDMMED"
// 	},
// 	{
// 		"label": "PDAM Kota Karawang",
// 		"value": "PDMKRW"
// 	},
// 	{
// 		"label": "PDAM Kota Depok",
// 		"value": "PDMDEP"
// 	},
// 	{
// 		"label": "PDAM Kab Klaten",
// 		"value": "PDMKLA"
// 	},
// 	{
// 		"label": "PDAM Kota Tanah Grogot",
// 		"value": "PDMGRG"
// 	},
// 	{
// 		"label": "PDAM Kab Berau",
// 		"value": "PDMBER"
// 	},
// 	{
// 		"label": "PDAM Kab Probolinggo",
// 		"value": "PDMPRO"
// 	},
// 	{
// 		"label": "PDAM Denpasar",
// 		"value": "PDMDPS"
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
			pembayaran: 'Saldo',
			optionsPDAM: []
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
					kode_parent_produk : 'PDM'
				}

				postApi('', params, true, (resp) => {
					if(resp.resultcode == '0000'){
						let optionsPDAM = []
						resp.produk.forEach((prd, i) => {
							let obj = {
								label: prd.namaproduk,
								value: prd.kode_produk,
								denom: prd.denom
							}
							optionsPDAM.push(obj)
						});
						this.setState({optionsPDAM})
					}else{
						
					}
				})
			})
		})
	}

	componentWillMount() {
		// this.props.navigator.setTitle({
		// 	title: 'PDAM'
		// })
	}

	onProses = () => {
		let {user, idPelanggan, produkSelected, pembayaran} = this.state

		//000746303

		if(idPelanggan != "" && produkSelected != "")
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
					if(resp.posh.resultcode[0] == '0000'){
						
						let data = resp.posh
						data.counter = counter
						data.idproduk = produkSelected

						if(pembayaran == 'Saldo'){
							data.pay_method = 0
						}else if(pembayaran == 'Point'){
							data.pay_method = 1
						}else{
							data.pay_method = 2
						}

						// this.props.navigator.showLightBox({
						// 	screen: 'KonfirmasiPDAM',
						// 	passProps: {
						// 		data: data,
						// 		user
						// 	},
						// 	style: {
						// 		backgroundColor: '#33333380'
						// 	}
						// })



						this.props.navigation.navigate("KonfirmasiPDAM",{
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
		let {user, idPelanggan, produkSelected, pembayaran, optionsPDAM} = this.state

		if(!user){
			return null
		}

		return (
			<ScrollView style={{backgroundColor:'white', padding:20}}>

				<View>
					<Text style={{color:'black'}}>Produk PDAM</Text>

					<Picker
					   selectedValue={this.state.produkSelected}
					   onValueChange={(itemValue, itemIndex) => this.setState({produkSelected: itemValue})} 
					>
					  <Picker.Item label="Pilih" value="" />             
					  { optionsPDAM.map((item, key)=>(
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