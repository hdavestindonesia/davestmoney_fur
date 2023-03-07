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
import { TabNavigator, NavigationActions, StackActions } from "react-navigation";
import { WebView } from 'react-native-webview';

let {width, height} = Dimensions.get('window')

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
		let {data} = this.props.navigation.state.params

		// Navigation.dismissLightBox()
		// this.props.navigator.push({
		// 	screen: 'MasukkanCode',
		// 	passProps: {
		// 		type:  'tariktunai',
		// 		onSuccess: (securityCode) => {
		// 			this.tarikTunai(securityCode)
		// 		}
		// 	}
		// })


		this.props.navigation.navigate("MasukkanCode",{
			type:  'tariktunai',
			onSuccess: (securityCode) => {
				this.tarikTunai(securityCode)
			}
		})
	}

	tarikTunai = (securityCode) => {
		let {user, data} = this.props.navigation.state.params

		generateCounter((counter) => {
			let params = {
				command : 'PROCESSTARIKTUNAI', 
				idproduk : 'MONEY', 
				counter : counter, 
				no_telp : user.no_telp, 
				signature : CryptoJS.SHA512(user.access_token + counter.toString()).toString(),
				datetime : moment().format('DD/MM/YYYY hh:mm:ss'),
				kode_tariktunai : data.kode_tariktunai
			}

			postApi('', params, true, (resp) => {
				if(resp.resultcode == '0000'){
					// this.props.navigator.push({
					// 	screen: 'TarikTunaiSukses',
					// 	passProps: {
					// 		data:resp
					// 	}
					// })
				

					this.props.navigation.navigate("TarikTunaiSukses",{
						data:resp
					})
				}else{
					Alert.alert('Info', resp.result)
				}
			})
		})
	}

	render() {
		let {user, data} = this.props.navigation.state.params

		return (
			<View style={{width:width-40, backgroundColor:'white', justifyContent: 'center'}}>		
				<View style={{padding:20}}>
					<View>
						<Text style={{color:blue, fontWeight:'700', fontSize:20}}>Konfirmasi Tarik Tunai</Text>
					</View>

					<View style={{marginTop:20}}>
						<Text>Nama</Text>
						<Text style={{color:blue}}>{data.nama_user}</Text>
					</View>

					<View style={{marginTop:20}}>
						<Text>No. Handphone</Text>
						<Text style={{color:blue}}>{data.nomor_telp_user}</Text>
					</View>

					<View style={{marginTop:20}}>
						<Text>Nominal Tarik Tunai</Text>
						<Text style={{color:blue}}>{Rupiah(data.nominal)}</Text>
					</View>

					<View style={{marginTop:20}}>
						<Text>Biaya Layanan</Text>
						<Text style={{color:blue}}>{Rupiah(data.admin)}</Text>
					</View>

					<View style={{marginTop:20}}>
						<Text>Cashback</Text>
						<Text style={{color:blue}}>{Rupiah(data.cashback)}</Text>
					</View>

					<View style={{marginTop:20}}>
						<Text>Keterangan</Text>
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