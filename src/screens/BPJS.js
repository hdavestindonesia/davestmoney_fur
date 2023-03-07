import React, { Component } from 'react';
import {Text, Image, TouchableOpacity, ActivityIndicator, View, StyleSheet, ScrollView, Dimensions, Alert} from 'react-native';
import {blue, green, yellow, screenBackgroundColor, navigatorStyle, WEB_BASE_URL} from '../libs/Constants';
import FloatLabelTextInput from 'react-native-floating-label-text-input'
import {postXML} from '../libs/api';
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


import {Picker} from '@react-native-picker/picker';


let {width, height} = Dimensions.get('window')
let optionsJmlBln = [
	{
		label: '1 Bulan',
		value: 1
	},
	{
		label: '2 Bulan',
		value: 2
	},
	{
		label: '3 Bulan',
		value: 3
	},
	{
		label: '4 Bulan',
		value: 4
	},
	{
		label: '5 Bulan',
		value: 5
	},
]

export default class extends Component {
	static navigatorStyle = navigatorStyle;

	constructor(props){
		super(props);
		this.state = {
			user: this.props.navigation.state.params.user ? this.props.navigation.state.params.user : null,
			virtualAccount: null,
			jmlBln: null,
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
		// 	title: 'BPJS'
		// })
	}

	showConfirmation = () => {
		this.props.navigator.showLightBox({
			screen: 'KonfirmasiPembayaran',
			passProps: {
				user
			},
			style: {
				backgroundColor: '#33333380'
			}
		})
	}

	onProses = () => {
		let {user, virtualAccount, jmlBln, pembayaran} = this.state

		//let xml = '<?xml version="1.0"?><posh><command>INQUIRY</command><idagen>081242085613</idagen><nova>0007463031563869</nova><jmlbln>2</jmlbln><counter>12513</counter><pin>4701309272e8bfd673badc2c0a534935</pin><idproduk>BPJSKS</idproduk></posh>'

		generateCounter((counter) => {
			let params = {
				command : 'INQUIRY', 
				idagen : user.no_telp, 
				nova : virtualAccount,
				jmlbln : jmlBln,
				counter : counter, 
				pin : CryptoJS.SHA512(user.access_token + counter.toString()).toString(),
				idproduk : 'BPJSKS'
			}

			var builder = new xml2js.Builder({rootName: 'posh'});
			var xml = builder.buildObject(params);

			postXML('', xml, true, (resp) => {
				if(resp.posh.resultcode[0] == '0000'){
					
					let data = resp.posh
					data.jmlBln = jmlBln
					data.counter = counter

					if(pembayaran == 'Saldo'){
						data.pay_method = 0
					}else if(pembayaran == 'Point'){
						data.pay_method = 1
					}else{
						data.pay_method = 2
					}


					this.props.navigation.navigate("KonfirmasiBPJS",{
						data: data,
						user
					})



				}else{
					Alert.alert('Info', resp.posh.result[0])
				}
			})
		})
	}

	onCallback = (resp) => {
		console.log(resp)
	}

	onError = () => {

	}

	render() {
		let {user, virtualAccount, jmlBln, pembayaran} = this.state

		if(!user){
			return null
		}

		return (
			<ScrollView style={{backgroundColor:'white', padding:20}}>
				<View>
					<Text style={{color:'black'}}>Produk BPJS</Text>

					<Picker
					   selectedValue="BPJS Kesehatan"
					   onValueChange={(itemValue, itemIndex) => console.log("tes")} 
					>

						<Picker.Item label="BPJS Kesehatan" value="BPJS Kesehatan" />    
						        
					</Picker>
				</View>

				<View style={{marginTop:20}}>
					<Text style={{color:'black'}}>No. Virtual Account</Text>
					<View>
						<FloatLabelTextInput 
							value={virtualAccount}
							onChangeTextValue={(virtualAccount) => this.setState({virtualAccount: virtualAccount.replace(/[^0-9]/g, '')})}
							onBlur={() => this.setState({virtualAccount: virtualAccount.replace(/[^0-9]/g, '')})}
							autoCorrect={false}
							keyboardType={'phone-pad'}
							placeholder="Masukkan No. Virtual Account" />
					</View>
				</View>

				<View style={{marginTop:20}}>
					<Text style={{color:'black'}}>Metode Pembayaran</Text>

					<Picker
					   selectedValue={this.state.pembayaran}
					   onValueChange={(itemValue, itemIndex) => this.setState({pembayaran: itemValue})} 
					>
					                                      
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