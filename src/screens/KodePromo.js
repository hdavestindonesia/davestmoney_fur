import React, { Component } from 'react';
import {Text, Image, TouchableOpacity, ActivityIndicator, View, StyleSheet, ScrollView, Dimensions, Alert} from 'react-native';
import {blue, green, yellow, screenBackgroundColor, navigatorStyle, WEB_BASE_URL} from '../libs/Constants';
import FloatLabelTextInput from 'react-native-floating-label-text-input'
import {getApi, postApi} from '../libs/api';
import Bold from '../components/Bold';
import Button from '../components/Button';
import SpaceBetween from '../components/SpaceBetween';
import getItem from '../libs/getItem';
import chunk from 'chunk';
import generateCounter from '../libs/generateCounter';
import CryptoJS from 'crypto-js';
import moment from 'moment';
import 'moment/locale/id';
import { TabNavigator, NavigationActions, StackActions } from "react-navigation";
import { WebView } from 'react-native-webview';
let {width, height} = Dimensions.get('window')
export default class extends Component {
	static navigatorStyle = navigatorStyle;

	constructor(props){
		super(props);
		this.state = {
			user: this.props.navigation.state.params.user ? this.props.navigation.state.params.user : null,
			kode: null
		}
	}

	componentDidMount() {
		getItem('USER', (user) => {
			this.setState({user: user})
		})
	}

	componentWillMount() {
		// this.props.navigator.setTitle({
		// 	title: 'Kode Promo'
		// })
	}

	onClaim = () => {
		let {user, kode} = this.state

		if(!kode){
			Alert.alert('Info', 'Harap isikan Kode Promo terlebih dahulu!')
			return
		}

		generateCounter((counter) => {
			let params = {
				command : 'USEVOUCHER',
				idproduk : 'MONEY',
				counter : counter,
				no_telp : user.no_telp,
				signature : CryptoJS.SHA512(user.access_token + counter.toString()).toString(),
				datetime : moment().format('DD/MM/YYYY hh:mm:ss'),
				kode_voucher : kode
			}

			postApi('', params, true, (resp) => {
				this.setState({kode: null})
				if(resp.resultcode == '0000'){
					Alert.alert('Info', resp.result)
				}else{
					Alert.alert('Info', resp.result)
				}
			})
		})
	}

	render() {
		let {kode} = this.state
		return (
			<ScrollView style={{backgroundColor:'white'}}>		
				<View style={{marginTop:20, marginHorizontal:20}}>
					<View style={{marginTop:20}}>
						<Text style={{fontSize:16, fontWeight:'700', color:blue}}>Kode Promo</Text>
						<View>
							<FloatLabelTextInput 
								value={kode}
								autoCorrect={false} 
								onChangeTextValue={(kode) => this.setState({kode})}
								placeholder="Masukkan Kode Promo" />
						</View>
					</View>

					<View style={{marginTop:30}}>
						<Button onPress={this.onClaim} text={'Klaim Sekarang'} />
					</View>
				</View>
				
			</ScrollView>
		);
	}
}