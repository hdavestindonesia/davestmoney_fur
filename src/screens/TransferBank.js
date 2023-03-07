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
import Rupiah from '../libs/Rupiah';
import moment from 'moment';
import 'moment/locale/id';
import generateCounter from '../libs/generateCounter';
import CryptoJS from 'crypto-js';
import { TabNavigator, NavigationActions, StackActions } from "react-navigation";
let {width, height} = Dimensions.get('window')
import { WebView } from 'react-native-webview';
export default class extends Component {
	static navigatorStyle = navigatorStyle;

	constructor(props){
		super(props);
		this.state = {
			user: this.props.navigation.state.params.user ? this.props.navigation.state.params.user : null,
			jumlah: null,
			bank: null,
			noRekening: null,
			pesan: null
		}
	}

	componentDidMount() {
		getItem('USER', (user) => {
			this.setState({user})
		})
	}

	componentWillMount() {
		// this.props.navigator.setTitle({
		// 	title: 'Transfer Bank'
		// })
	}

	showConfirmation = () => {
		let {jumlah, bank, noRekening, pesan, user} = this.state
		let data = {jumlah, bank, noRekening, pesan}

		generateCounter((counter) => {
			let params = {
				command : 'INQUIRYTRANSFERBANK', 
				idproduk : 'MONEY', 
				counter : counter, 
				no_telp : user.no_telp, 
				signature : CryptoJS.SHA512(user.access_token + counter.toString()).toString(),
				datetime : moment().format('DD/MM/YYYY hh:mm:ss'),
				no_rekening_tujuan :  noRekening,
				nama_bank : bank.nama_bank
			}

			postApi('', params, true, (resp) => {
				if(resp.resultcode == '0000'){
					this.props.navigator.showLightBox({
						screen: 'KonfirmasiTransfer',
						passProps: {
							data,
							user,
							type: 'bank'
						},
						style: {
							backgroundColor: '#33333380'
						}
					})
				}else{
					Alert.alert('Info', resp.result)
				}
			})
		})
	}

	goToBankList = () => {
		// this.props.navigator.push({
		// 	screen: 'Bank',
		// 	passProps: {
		// 		onChange: (bank) => {
		// 			this.setState({bank})
		// 		}
		// 	}
		// })

		this.props.navigation.navigate("Bank",{
			onChange: (bank) => {
				this.setState({bank})
			}
		})
	}

	render() {
		let {user, jumlah, bank, noRekening, pesan} = this.state

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
					<View style={{paddingVertical:10, paddingHorizontal:10}}>
						<FloatLabelTextInput 
							value={jumlah ? Rupiah(jumlah, false) : ''}
							autoCorrect={false} 
							keyboardType={'phone-pad'}
							onChangeTextValue={(jumlah) => this.setState({jumlah: jumlah.replace(/\./g, '')})}
							placeholder="Jumlah Transfer" />
					</View>

					<View style={{paddingVertical:10, paddingHorizontal:10}}>
						<TouchableOpacity onPress={this.goToBankList}>
							<View style={{paddingVertical:10, borderBottomWidth:1, borderBottomColor:'lightgrey'}}>
								<Text style={{fontSize:15, marginLeft:5}}>{bank ? bank.nama_bank : 'Pilih Bank'}</Text>
							</View>

							<View style={{position:'absolute', right:10, top:5}}>
								<Text style={{fontSize:20}}>▼</Text>
							</View>
						</TouchableOpacity>
					</View>

					<View style={{paddingVertical:10, paddingHorizontal:10}}>
						<FloatLabelTextInput 
							value={noRekening}
							autoCorrect={false} 
							keyboardType={'phone-pad'}
							onChangeTextValue={(noRekening) => this.setState({noRekening})}
							placeholder="No. Rekening" />
					</View>

					<View style={{paddingVertical:10, paddingHorizontal:10}}>
						<FloatLabelTextInput 
							value={pesan}
							autoCorrect={false} 
							onChangeTextValue={(pesan) => this.setState({pesan})}
							placeholder="Pesan (Opsional)" />
					</View>

					<View style={{marginTop:30}}>
						<Button onPress={() => this.showConfirmation()} text={'Transfer'} />
					</View>
				</View>
			</ScrollView>
		);
	}
}