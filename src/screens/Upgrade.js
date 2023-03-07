import React, { Component } from 'react';
import {Text, Image, TouchableOpacity, ActivityIndicator, View, StyleSheet, ScrollView, Dimensions,Alert} from 'react-native';
import {blue, green, yellow, screenBackgroundColor, navigatorStyle, WEB_BASE_URL} from '../libs/Constants';
import FloatLabelTextInput from 'react-native-floating-label-text-input'
import {getApi,postApi} from '../libs/api';
import Bold from '../components/Bold';
import Button from '../components/Button';
import SpaceBetween from '../components/SpaceBetween';
import getItem from '../libs/getItem';
import generateCounter from '../libs/generateCounter';
import CryptoJS from 'crypto-js';
import moment from 'moment';
import 'moment/locale/id';
import chunk from 'chunk';
import { TabNavigator, NavigationActions, StackActions } from "react-navigation";
import { WebView } from 'react-native-webview';
let {width, height} = Dimensions.get('window')

export default class extends Component {
	static navigatorStyle = navigatorStyle;

	constructor(props){
		super(props);
		this.state = {
			user: this.props.navigation.state.params.user ? this.props.navigation.state.params.user : null,
			status_upgrade : null,
		}
	}

	componentDidMount() {
		getItem('USER', (user) => {
			this.setState({user: user}, () => {
				this.getData()
			})
		})
	}

	getData = () => {
		let {user} = this.state
		generateCounter((counter) => {
			let params = {
				command : '“CEKUPGRADEACCOUNT”',
				idproduk : 'MONEY',
				counter : counter,
				no_telp : user.no_telp,
				signature : CryptoJS.SHA512(user.access_token + counter.toString()).toString(),
				datetime : moment().format('DD/MM/YYYY hh:mm:ss'),
			}

			postApi('', params, true, (resp) => {
				if(resp.resultcode == '0000'){
					this.setState({status_upgrade: resp.status_upgrade})
				}else{
					Alert.alert('Info', resp.result)
				}
			})
		})
	}

	componentWillMount() {
		// this.props.navigator.setTitle({
		// 	title: 'Upgrade DavestMoney'
		// })
	}

	onUpgrade = () => {
		// this.props.navigator.push({
		// 	screen: 'DataDiri'
		// })

		this.props.navigation.navigate("DataDiri")
	}

	render() {
		let {status_upgrade} = this.state
		return (
			<ScrollView style={{backgroundColor:'white'}}>		
				<View style={{marginTop:80}}>
					<Image
						style={{height:30, width:null, resizeMode:'contain'}}
						source={require('../assets/images/logo_white.png')}/>
				</View>

				{status_upgrade == 0 ? 
						<View style={{marginTop:20, marginHorizontal:20}}>
							<Text style={{textAlign:'center', fontWeight:'700', fontSize:16}}>Upgrade akun DavestMoney kamu menjadi Full Service dan Dapatkan akses ke semua fitur DavestMoney</Text>
							<View style={{marginTop:100}}>
								<Button onPress={this.onUpgrade} text={'Upgrade Sekarang'} />
							</View>
						</View>
						: 
						<View style={{marginTop:20, marginHorizontal:20}}>
							<Text style={{textAlign:'center', fontWeight:'700', fontSize:16}}>Prosess Upgrade Sedang Menunggu Verifikasi Admin</Text>
						</View>
				}
				{/* <View style={{marginTop:20, marginHorizontal:20}}>
					<Text style={{textAlign:'center', fontWeight:'700', fontSize:16}}>Upgrade akun DavestMoney kamu menjadi Full Service dan Dapatkan akses ke semua fitur DavestMoney</Text>
				</View>

				<View style={{marginTop:100}}>
					<Button onPress={this.onUpgrade} text={'Upgrade Sekarang'} />
				</View> */}
				
			</ScrollView>
		);
	}
}