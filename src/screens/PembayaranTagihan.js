import React, { Component } from 'react';
import {Text, Image, TouchableOpacity, ActivityIndicator, View, StyleSheet, ScrollView, Dimensions, Alert} from 'react-native';
import {blue, green, greenOld, yellow, screenBackgroundColor, navBarHidden, WEB_BASE_URL} from '../libs/Constants';
import FloatLabelTextInput from 'react-native-floating-label-text-input'
import {postApi} from '../libs/api';
import Bold from '../components/Bold';
import Button from '../components/Button';
import SpaceBetween from '../components/SpaceBetween';
import getItem from '../libs/getItem';
import chunk from 'chunk';
import DropDownList from '../components/DropDownList';
import Rupiah from '../libs/Rupiah';
import moment from 'moment';
import 'moment/locale/id';
import generateCounter from '../libs/generateCounter';
import CryptoJS from 'crypto-js';
import {paymentOptions} from '../components/PaymentOptions';
import { TabNavigator, NavigationActions, StackActions } from "react-navigation";
import { WebView } from 'react-native-webview';
let {width, height} = Dimensions.get('window')

export default class extends Component {
	static navigatorStyle = navBarHidden;

	constructor(props){
		super(props);
		this.state = {
			user: this.props.navigation.state.params.user ? this.props.navigation.state.params.user : null,
			pembayaran: 'Saldo',
		}
	}

	componentDidMount() {
		getItem('USER', (user) => {
			this.setState({user: user})
		})
	}

	onBayar = () => {
		// this.props.navigator.push({
		// 	screen: 'MasukkanCode',
		// 	passProps: {
		// 		type:  'pembayarantagihan',
		// 		onSuccess: (securityCode) => {
		// 			this.processBayar(securityCode)
		// 		}
		// 	}
		// })



		this.props.navigation.navigate("MasukkanCode",{
			type:  'pembayarantagihan',
			onSuccess: (securityCode) => {
				this.processBayar(securityCode)
			}
		})
	}

	processBayar = (securityCode) => {
		let {data} = this.props.navigation.state.params
		let {user, pembayaran} = this.state

		let pay_method = 0
		if(pembayaran == 'Saldo'){
			pay_method = 0
		}else if(pembayaran == 'Point'){
			pay_method = 1
		}else{
			pay_method = 2
		}

		generateCounter((counter) => {
			let params = {
				command : 'PROCESSQRPAY',
				idproduk : 'MONEY',
				counter : counter,
				no_telp : user.no_telp,
				signature : CryptoJS.SHA512(user.access_token + counter.toString()).toString(),
				datetime : moment().format('DD/MM/YYYY hh:mm:ss'),
				qr_data : data.qr_data,
				pay_method : pay_method
			}

			postApi('', params, true, (resp) => {
				if(resp.resultcode == '0000'){
					// this.props.navigator.push({
					// 	screen: 'PembayaranSukses',
					// 	passProps: {
					// 		data: resp
					// 	}
					// })


					this.props.navigation.navigate("PembayaranSukses",{
						data: resp
					})
				}else{
					Alert.alert('Info', resp.result)
				}
			})
		})
	}

	onBatal = () => {
		// this.props.navigator.resetTo({screen: 'Home'})
			this.props.navigation.dispatch(
				StackActions.reset({
			  		index: 0,
			  		actions: [NavigationActions.navigate({ routeName: "Home" })]
				})
			)
	}

	render() {
		let {data} = this.props.navigation.state.params
		let {user, pembayaran} = this.state

		if(!user){
			return null
		}

		return (
			<ScrollView style={{backgroundColor:'white'}}>
				<View style={{backgroundColor:green}}>
					<Text style={{fontSize:20, color:'white', textAlign:'center', marginTop:70, marginBottom:10, marginHorizontal:50}}>Pembayaran Tagihan dari Merchant {data.nama_merchant}</Text>

					<View style={{backgroundColor:greenOld, padding:10}}>
						<SpaceBetween style={{paddingHorizontal:20}}>
							<Text style={{color:'white'}}>Jumlah Tagihan</Text>
							<Text style={{color:'white'}}>{Rupiah(data.nominal)}</Text>
						</SpaceBetween>

						<SpaceBetween style={{paddingHorizontal:20}}>
							<Text style={{color:'white'}}>Biaya Layanan</Text>
							<Text style={{color:'white'}}>{Rupiah(data.admin)}</Text>
						</SpaceBetween>

						<SpaceBetween style={{paddingHorizontal:20}}>
							<Text style={{color:'white'}}>Cashback</Text>
							<Text style={{color:'white'}}>{Rupiah(data.cashback)}</Text>
						</SpaceBetween>

						<SpaceBetween style={{paddingHorizontal:20}}>
							<Text style={{color:'white'}}>Keterangan</Text>
							<Text style={{color:'white'}}>{data.keterangan}</Text>
						</SpaceBetween>
					</View>

					<View style={{backgroundColor:green, padding:10}}>
						<SpaceBetween style={{paddingHorizontal:20}}>
							<Text style={{color:'white'}}>TOTAL TAGIHAN</Text>
							<Text style={{color:'white', fontSize:18}}>{Rupiah(parseInt(data.nominal) + parseInt(data.admin))}</Text>
						</SpaceBetween>
					</View>
				</View>

				<View style={{marginTop:20, padding:20}}>

					<View>
						<Text style={{color:'black'}}>Metode Pembayaran</Text>
						<DropDownList 
							navigator={this.props.navigator} 
							value={pembayaran ? pembayaran : null}
							text={'Pilih Metode Pembayaran'} 
							options={paymentOptions}
							onChange={(data) => this.setState({pembayaran: data.value})} />
					</View>

					<View>
						<SpaceBetween>
							<Text style={{color:'blue'}}>Saldo DavestMoney</Text>
							<Text style={{color:'blue'}}>{Rupiah(user.sisasaldo)}</Text>
						</SpaceBetween>
						<SpaceBetween>
							<Text style={{color:'blue'}}>Point</Text>
							<Text style={{color:'blue'}}>{user.jumlahpoin}</Text>
						</SpaceBetween>
					</View>
				</View>

				<View style={{marginTop:50}}>
					<Button onPress={this.onBayar} text={'Bayar'} />
				</View>

				<View style={{marginTop:10}}>
					<Button onPress={this.onBatal} text={'Batal'} backgroundColor={'white'} textColor={blue} />
				</View>

			</ScrollView>
		);
	}
}