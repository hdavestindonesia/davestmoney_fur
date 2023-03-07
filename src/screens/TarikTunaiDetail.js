import React, { Component } from 'react';
import {Text, Image, TouchableOpacity, ActivityIndicator, View, StyleSheet, ScrollView, Dimensions, Alert} from 'react-native';
import {blue, green, yellow, screenBackgroundColor, navigatorStyle, WEB_BASE_URL} from '../libs/Constants';
import FloatLabelTextInput from 'react-native-floating-label-text-input'
import {postApi} from '../libs/api';
import Bold from '../components/Bold';
import Button from '../components/Button';
import SpaceBetween from '../components/SpaceBetween';
import getItem from '../libs/getItem';
import chunk from 'chunk';
import SwitchSelector from '../components/SwitchSelector';
import DropDownList from '../components/DropDownList';
import moment from 'moment';
import 'moment/locale/id';
import generateCounter from '../libs/generateCounter';
import CryptoJS from 'crypto-js';
import Rupiah from '../libs/Rupiah';

let {width, height} = Dimensions.get('window')
import { TabNavigator, NavigationActions, StackActions } from "react-navigation";
import { WebView } from 'react-native-webview';
const selectorOptions = [
	{
		label: 'Penarikan Tunai', value: 0
	},
	{
		label: 'Terima Penarikan', value: 1
	}
]

export default class extends Component {
	static navigatorStyle = navigatorStyle;

	constructor(props){
		super(props);
		this.state = {
			user: this.props.navigation.state.params.user ? this.props.navigation.state.params.user : null,
			nominal: null,
			keterangan: null
		}
	}

	componentDidMount() {
		getItem('USER', (user) => {
			this.setState({user: user})
		})
	}

	componentWillMount() {
		let {data} = this.props.navigation.state.params
		// this.props.navigator.setTitle({
		// 	title: data.nama
		// })
	}

	onProses = () => {
		let {user, nominal, keterangan} = this.state

		if(!nominal || !keterangan){
			Alert.alert('Info', 'Harap isikan data terlebih dahulu')
			return
		}

		// this.props.navigator.push({
		// 	screen: 'MasukkanCode',
		// 	passProps: {
		// 		type:  'tariktunai',
		// 		onSuccess: (securityCode) => {
		// 			this.processTarikTunai(securityCode)
		// 		}
		// 	}
		// })


		this.props.navigation.navigate("MasukkanCode",{
			type:  'tariktunai',
			onSuccess: (securityCode) => {
				this.processTarikTunai(securityCode)
			}
		})
	}

	processTarikTunai = (securityCode) => {
		let {data} = this.props.navigation.state.params
		let {user, nominal, keterangan} = this.state

		generateCounter((counter) => {
			let params = {
				command : 'CREATETARIKTUNAI',
				idproduk : 'MONEY',
				counter : counter,
				no_telp : user.no_telp,
				signature : CryptoJS.SHA512(user.access_token + counter.toString()).toString(),
				datetime : moment().format('DD/MM/YYYY hh:mm:ss'),
				nominal: nominal,
				kode_option: data.kode,
				keterangan: keterangan
			}

			postApi('', params, true, (resp) => {
				if(resp.resultcode == '0000'){
					this.props.onSuccess && this.props.onSuccess()
					this.props.navigation.dispatch(
			            StackActions.pop()
			          )
				}else{
					Alert.alert('Info', resp.result)
				}
			})
		})
	}

	render() {
		let {user, nominal} = this.state

		if(!user){
			return null
		}

		return (
			<ScrollView style={{backgroundColor:'white'}}>		

				<View style={{backgroundColor:'whitesmoke', padding:10, paddingHorizontal:20}}>
					<SpaceBetween>
						<Text style={{fontSize:16, fontWeight:'600'}}>SALDO DavestMoney</Text>
						<Text style={{fontSize:16, fontWeight:'600'}}>{Rupiah(user.sisasaldo)}</Text>
					</SpaceBetween>
				</View>

				<View style={{marginHorizontal:20}}>
					<View style={{paddingVertical:20, paddingHorizontal:10}}>
						<Text>Nomor Handphone</Text>
						<Text>{user.no_telp}</Text>
					</View>

					<View style={{paddingVertical:20, paddingHorizontal:10}}>
						<FloatLabelTextInput 
							value={nominal ? Rupiah(nominal, false) : ''}
							autoCorrect={false} 
							keyboardType={'phone-pad'}
							onChangeTextValue={(nominal) => this.setState({nominal: nominal.replace(/\./g, '')})}
							placeholder="Nominal" />
					</View>

					<View style={{paddingVertical:20, paddingHorizontal:10}}>
						<FloatLabelTextInput 
							autoCorrect={false} 
							onChangeTextValue={(keterangan) => this.setState({keterangan})}
							placeholder="Keterangan" />
					</View>

					<TouchableOpacity onPress={this.onProses} style={{backgroundColor:blue, borderWidth:1, borderColor:blue, marginHorizontal:30, paddingVertical:10, borderRadius:5, marginTop:30}}>
						<Text style={{textAlign:'center', fontSize:20, fontWeight:'600', color:'white'}}>Proses</Text>
					</TouchableOpacity>
				</View>
				
			</ScrollView>
		);
	}
}