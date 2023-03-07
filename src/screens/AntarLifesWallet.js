import React, { Component } from 'react';
import {Text, Image, TouchableOpacity, ActivityIndicator, View, StyleSheet, ScrollView, Dimensions, Alert, Platform} from 'react-native';
import {blue, green, yellow, screenBackgroundColor, navigatorStyle, WEB_BASE_URL} from '../libs/Constants';
import FloatLabelTextInput from 'react-native-floating-label-text-input'
import {postApi, getApi} from '../libs/api';
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
import { selectContactPhone } from 'react-native-select-contact';
import Permissions from 'react-native-permissions';
import { TabNavigator, NavigationActions, StackActions } from "react-navigation";
import { WebView } from 'react-native-webview';
let {width, height} = Dimensions.get('window')

const IOS = Platform.OS === 'ios';
const Android = Platform.OS === 'android';
export default class extends Component {
	static navigatorStyle = navigatorStyle;

	constructor(props){
		super(props);
		this.state = {
			user: this.props.navigation.state.params.user ? this.props.navigation.state.params.user : null,
			jumlah: null,
			noPonsel: this.props.navigation.state.params.noPonsel ? this.props.navigation.state.params.noPonsel : null,
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
		// 	title: 'Antar DavestMoney'
		// })
	}

	showConfirmation = () => {
		let {jumlah, noPonsel, pesan, user} = this.state
		let data = {jumlah, noPonsel, pesan}

		generateCounter((counter) => {
			let params = {
				command : 'INQUIRYTRANSFER', 
				idproduk : 'MONEY', 
				counter : counter, 
				no_telp : user.no_telp, 
				signature : CryptoJS.SHA512(user.access_token + counter.toString()).toString(),
				datetime : moment().format('DD/MM/YYYY hh:mm:ss'),
				no_telp_tujuan :  noPonsel,
			}

			postApi('', params, true, (resp) => {
				if(resp.resultcode == '0000'){
					data.nama = resp.nama
					data.admin = resp.admin
					data.cashback = resp.cashback
					data.keterangan = pesan
					
					this.props.navigator.showLightBox({
						screen: 'KonfirmasiTransfer',
						passProps: {
							data,
							user,
							type: 'lifeswallet'
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

	openContact = () => {
		Permissions.request('contacts').then(response => {
			if(response == 'denied'){
				IOS ? 
				Alert.alert('Info', 'Fitur Membaca Kontak tidak bisa dijalankan. Apabila Anda ingin menggunakan fitur Membaca Kontak, mohon mengaktifkan izin mengakses Kontak dengan menekan tombol pengaturan dibawah', [{
					text: 'Batal'
				}, {
					text: 'Pengaturan',
					onPress: () => {
						Linking.openURL('app-settings:')
					}
				}]) : 
				Alert.alert('Info', 'Fitur Membaca Kontak tidak bisa dijalankan. Apabila Anda ingin menggunakan fitur Membaca Kontak, mohon mengaktifkan izin mengakses Kontak dengan menekan tombol OK dibawah', [{
				  text: 'Batal'
				}, {
				  text: 'OK',
				  onPress: () => {
					openContact()
				  }
				}])
			}
			else if(response == 'restricted'){
				IOS ? 
				Alert.alert('Info', 'Fitur Membaca Kontak tidak bisa dijalankan karena keterbatasan fitur pada perangkat Anda.', [{
					text: 'OK'
				}]) : 
				Alert.alert('Info', 'Fitur Membaca Kontak tidak bisa dijalankan. Apabila Anda ingin menggunakan fitur Membaca Kontak, mohon mengaktifkan izin mengakses Kontak dengan menekan tombol Pengaturan dibawah', [{
				  text: 'Batal'
				}, {
				  text: 'Pengaturan',
				  onPress: () => {
					OpenSettings.openSettings();
				  }
				}])
			}
			else if(response == 'authorized'){
				try{
					selectContactPhone()
		        	.then(selection => {
		            if (!selection) {
		                return null;
		            }
		            
		            let { selectedPhone } = selection;
		            let noPonsel = selectedPhone.number
		            noPonsel = noPonsel.replace('+62','0')
								noPonsel = noPonsel.match(/\d/g).join('')

								this.setState({noPonsel})

			        });		
				}catch(err){
					Alert.alert('Info', 'Terjadi kesalahan teknis dalam mengakses kontak')
				}
			}
		})
	}

	render() {
		let {user, jumlah, noPonsel, pesan} = this.state

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
							onChangeTextValue={(jumlah) => this.setState({jumlah: jumlah.replace(/[^0-9]/g, '').replace(/\./g, '')})}
							onBlur={() => this.setState({jumlah: jumlah.replace(/[^0-9]/g, '').replace(/\./g, '')})}
							placeholder="Jumlah Transfer" />
					</View>

					<View style={{paddingVertical:10, paddingHorizontal:10, flexDirection:'row', alignItems:'center'}}>
						<View style={{flex:9}}>
							<FloatLabelTextInput 
								value={noPonsel}
								autoCorrect={false} 
								keyboardType={'phone-pad'}
								onChangeTextValue={(noPonsel) => this.setState({noPonsel: noPonsel.replace(/[^0-9]/g, '')})}
								onBlur={() => this.setState({noPonsel: noPonsel.replace(/[^0-9]/g, '')})}
								placeholder="No. Ponsel" />
						</View>
						<TouchableOpacity onPress={this.openContact} style={{flex:1}}>
							<Image
							  style={{height:30, width:30, tintColor:'grey'}}
							  source={require('../assets/images/contact.png')}/>
						</TouchableOpacity>
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