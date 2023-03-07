import React, { Component } from 'react';
import {Text, Image, TouchableOpacity, ActivityIndicator, View, StyleSheet, ScrollView, Dimensions, Alert, Platform} from 'react-native';
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
			noHp: null,
			kodeID: null
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
		// 	title: 'Terima Tarik Tunai'
		// })
	}

	onProses = () => {
		let {user, noHp, kodeID} = this.state

		generateCounter((counter) => {
			let params = {
				command : 'INQUIRYTARIKTUNAI', 
				idproduk : 'MONEY', 
				counter : counter, 
				no_telp : user.no_telp, 
				signature : CryptoJS.SHA512(user.access_token + counter.toString()).toString(),
				datetime : moment().format('DD/MM/YYYY hh:mm:ss'),
				kode_tariktunai : kodeID
			}

			postApi('', params, true, (resp) => {
				if(resp.resultcode == '0000'){
					this.props.navigator.showLightBox({
						screen: 'KonfirmasiTarikTunai',
						passProps: {
							data: resp,
							user
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

	processTarikTunai = (securityCode) => {
		
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

								this.setState({noHp: noPonsel})

			        });		
				}catch(err){
					Alert.alert('Info', 'Terjadi kesalahan teknis dalam mengakses kontak')
				}
			}
		})
	}

	render() {
		let {user} = this.state

		if(!user){
			return null
		}

		return (
			<ScrollView style={{backgroundColor:'white'}}>		

				<View style={{backgroundColor:'whitesmoke', padding:10, paddingHorizontal:20}}>
					<SpaceBetween>
						<Text style={{fontSize:16, fontWeight:'600'}}>SALDO MERCHANT</Text>
						<Text style={{fontSize:16, fontWeight:'600'}}>{Rupiah(user.sisasaldo)}</Text>
					</SpaceBetween>
				</View>

				<View style={{marginHorizontal:20}}>

					{/* <View style={{paddingVertical:20, paddingHorizontal:10, flexDirection:'row', alignItems:'center'}}>
						<View style={{flex:9}}>
							<FloatLabelTextInput 
								autoCorrect={false} 
								keyboardType={'phone-pad'}
								onChangeTextValue={(noHp) => this.setState({noHp})}
								placeholder="Nomor Handphone" />
						</View>
						<TouchableOpacity onPress={this.openContact} style={{flex:1}}>
							<Image
							  style={{height:30, width:30, tintColor:'grey'}}
							  source={require('../assets/images/contact.png')}/>
						</TouchableOpacity>
					</View> */}

					<View style={{paddingVertical:20, paddingHorizontal:10}}>
						<FloatLabelTextInput 
							autoCorrect={false} 
							onChangeTextValue={(kodeID) => this.setState({kodeID})}
							placeholder="Kode ID" />
					</View>

					<TouchableOpacity onPress={this.onProses} style={{backgroundColor:blue, borderWidth:1, borderColor:blue, marginHorizontal:30, paddingVertical:10, borderRadius:5, marginTop:30}}>
						<Text style={{textAlign:'center', fontSize:20, fontWeight:'600', color:'white'}}>Proses</Text>
					</TouchableOpacity>
				</View>
				
			</ScrollView>
		);
	}
}