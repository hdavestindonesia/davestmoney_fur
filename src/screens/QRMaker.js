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
// import QRCode from 'react-native-qrcode';
import QRCode from 'react-native-qrcode-svg';
import timer from 'react-native-timer';
import { selectContactPhone } from 'react-native-select-contact';
import Permissions from 'react-native-permissions';
import Rupiah from '../libs/Rupiah';
import { TabNavigator, NavigationActions, StackActions } from "react-navigation";
import { WebView } from 'react-native-webview';
let {width, height} = Dimensions.get('window')

const selectorOptions = [
	{
		label: 'QR Saya', value: 0
	},
	{
		label: 'No. Handphone', value: 1
	}
]

export default class extends Component {
	static navigatorStyle = navigatorStyle;

	constructor(props){
		super(props);
		this.state = {
			switchSelected: 1,
			user: this.props.navigation.state.params.user ? this.props.navigation.state.params.user : null,
			nominal: null,
			noHp: null,
			keterangan: null,
			data: null,
			detik_qr: 0
		}
	}

	componentDidMount() {
		getItem('USER', (user) => {
			this.setState({user: user})
		})
	}

	componentWillMount() {
		// this.props.navigator.setTitle({
		// 	title: 'Pembayaran Masuk'
		// })
	}

	componentWillUnmount() {
		timer.clearInterval('CHECK_QR')
		timer.clearInterval('SetCountDown')
	}

	onPressBuatQR = () => {
		let {user, nominal, noHp, keterangan} = this.state

		if(!nominal || !noHp || !keterangan){
			Alert.alert('Info', 'Harap isikan data terlebih dahulu')
			return
		}

		// this.props.navigator.push({
		// 	screen: 'MasukkanCode',
		// 	passProps: {
		// 		type:  'qrmaker',
		// 		onSuccess: (securityCode) => {
		// 			this.createQR(securityCode)
		// 		}
		// 	}
		// })



		this.props.navigation.navigate("MasukkanCode",{
			type:  'qrmaker',
			onSuccess: (securityCode) => {
				this.createQR(securityCode)
			}
		})
	}

	createQR = (securityCode) => {
		let {user, nominal, noHp, keterangan} = this.state

		generateCounter((counter) => {
			let params = {
				command : 'CREATEQRPAY',
				idproduk : 'MONEY',
				counter : counter,
				no_telp : user.no_telp,
				signature : CryptoJS.SHA512(user.access_token + counter.toString()).toString(),
				datetime : moment().format('DD/MM/YYYY hh:mm:ss'),
				nominal: nominal,
				no_telp_payer: noHp,
				keterangan: keterangan,
				method: 'QRCODE'
			}

			postApi('', params, true, (resp) => {
				if(resp.resultcode == '0000'){
					this.setState({data:resp, detik_qr: resp.qr_durasi}, () => {
						this.setIntervalCheckQR()
						this.setTimer()
					})
				}else{
					Alert.alert('Info', resp.result)
				}
			})
		})
	}

	setIntervalCheckQR = () => {
		let {user, data} = this.state

		timer.setInterval('CHECK_QR', ()=> {

			generateCounter((counter) => {
				let params = {
					command : 'CHECKQRPAY',
					idproduk : 'MONEY',
					counter : counter,
					no_telp : user.no_telp,
					signature : CryptoJS.SHA512(user.access_token + counter.toString()).toString(),
					datetime : moment().format('DD/MM/YYYY hh:mm:ss'),
					qr_data : data.qr_data
				}

				postApi('', params, false, (resp) => {
					if(resp.resultcode == '0000'){
						if(resp.paid_status == 1){
							timer.clearInterval('CHECK_QR')
							// this.props.navigator.push({
							// 	screen: 'PembayaranMasuk',
							// 	passProps: {
							// 		data: resp
							// 	}
							// })



							this.props.navigation.navigate("PembayaranMasuk",{
								data: resp
							})
						

						}
					}else{
						Alert.alert('Info', resp.result)
					}
				})
			})

		}, 5000);
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
				Alert.alert('KlikIndomaret', 'Fitur Membaca Kontak tidak bisa dijalankan. Apabila Anda ingin menggunakan fitur Membaca Kontak, mohon mengaktifkan izin mengakses Kontak dengan menekan tombol OK dibawah', [{
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
	            let noHp = selectedPhone.number
	            noHp = noHp.replace('+62','0')
							noHp = noHp.match(/\d/g).join('')

							this.setState({noHp})

		        });		
				}catch(err){
					Alert.alert('Info', 'Terjadi kesalahan teknis dalam mengakses kontak')
				}
			}
		})
	}

	onDirect = () => {
		let {user, nominal, noHp, keterangan} = this.state

		generateCounter((counter) => {
			let params = {
				command : 'CREATEQRPAY',
				idproduk : 'MONEY',
				counter : counter,
				no_telp : user.no_telp,
				signature : CryptoJS.SHA512(user.access_token + counter.toString()).toString(),
				datetime : moment().format('DD/MM/YYYY hh:mm:ss'),
				nominal: nominal,
				no_telp_payer: noHp,
				keterangan: keterangan,
				method: 'DIRECT'
			}

			postApi('', params, true, (resp) => {
				if(resp.resultcode == '0000'){
					this.setState({data:resp}, () => {
						//this.setIntervalCheckQR()
						Alert.alert('Info', resp.result)
					})
				}else{
					Alert.alert('Info', resp.result)
				}
			})
		})
	}

	goToUpgrade = () => {
		// this.props.navigator.push({
		// 	screen: 'Upgrade'
		// })

		this.props.navigation.navigate("Upgrade")
	}

	setTimer = () => {
		timer.setInterval('SetCountDown', () => {
			let {detik_qr} = this.state
			if(detik_qr > 0){
				detik_qr = detik_qr - 1
				this.setState({detik_qr})
			}else{
				timer.clearInterval('SetCountDown')
				this.setState({data:null})
			}
		}, 1000);
	}

	render() {
		let {switchSelected, data, noHp, nominal, user, detik_qr} = this.state
		return (
			<ScrollView style={{backgroundColor:'white'}}>		

				<View style={{paddingVertical:20, paddingHorizontal:40, borderBottomWidth:2, borderBottomColor:'lightgrey', display : 'none'}}>
					<SwitchSelector backgroundColor={'whitesmoke'} borderColor={'grey'} buttonColor={yellow} selectedColor={'white'} textColor={'grey'} options={selectorOptions} initial={1} onPress={(value) => this.setState({switchSelected: value})} />
				</View>

				{switchSelected == 0 && !data && user &&
					<View>
						{user.jenis_user == 0 ?
							<View style={{alignItems:'center', marginTop:50}}>
								<Image
									style={{height:100, width:100, tintColor:'grey'}}
									source={require('../assets/images/store.png')}/>
								
								<View style={{marginTop:10}}>
									<Text style={{textAlign:'center'}}>Anda belum jadi merchant kami?</Text>
									<Text onPress={() => this.goToUpgrade()} style={{textAlign:'center', color:'blue'}}>Ayo gabung menjadi Merchant kami</Text>
								</View>
							</View>
							:
							<View style={{marginHorizontal:20}}>
								<View style={{paddingVertical:20, paddingHorizontal:10}}>
									<FloatLabelTextInput 
										value={nominal ? Rupiah(nominal, false) : ''}
										autoCorrect={false} 
										keyboardType={'phone-pad'}
										onChangeTextValue={(nominal) => this.setState({nominal: nominal.replace(/\./g, '')})}
										placeholder="Nominal Tagihan" />
								</View>

								<View style={{paddingVertical:20, paddingHorizontal:10, flexDirection:'row', alignItems:'center'}}>
									<View style={{flex:9}}>
										<FloatLabelTextInput 
											value={noHp}
											autoCorrect={false} 
											onChangeTextValue={(noHp) => this.setState({noHp})}
											placeholder="Masukkan Nomor Handphone" />
									</View>

									<TouchableOpacity onPress={this.openContact} style={{flex:1}}>
										<Image
											style={{height:30, width:30, tintColor:'grey'}}
											source={require('../assets/images/contact.png')}/>
									</TouchableOpacity>
								</View>

								<View style={{paddingVertical:20, paddingHorizontal:10}}>
									<FloatLabelTextInput 
										autoCorrect={false} 
										onChangeTextValue={(keterangan) => this.setState({keterangan})}
										placeholder="Keterangan" />
								</View>

								<TouchableOpacity onPress={this.onPressBuatQR} style={{backgroundColor:blue, borderWidth:1, borderColor:blue, marginHorizontal:30, paddingVertical:10, borderRadius:5, marginTop:30}}>
									<Text style={{textAlign:'center', fontSize:20, fontWeight:'600', color:'white'}}>Buat QR</Text>
								</TouchableOpacity>
							</View>
						}
					</View>
				}

				{switchSelected == 0 && data && 
					<View style={{margin:20, alignItems:'center'}}>
						<QRCode
		          value={data.qr_data}
		          size={200}
		          bgColor='black'
		          fgColor='white'/>

						<View style={{marginTop:50}}>
							<Text style={{textAlign:'center'}}>Masa berlaku QR Code</Text>
							<Text style={{textAlign:'center', fontSize:30}}>{detik_qr}</Text>
						</View>
					</View>
				}

				{switchSelected == 1 && 
					<View style={{marginHorizontal:20}}>
						<View style={{paddingVertical:20, paddingHorizontal:10}}>
							<FloatLabelTextInput 
								value={nominal ? Rupiah(nominal, false) : ''}
								autoCorrect={false} 
								keyboardType={'phone-pad'}
								onChangeTextValue={(nominal) => this.setState({nominal: nominal.replace(/[^0-9]/g, '').replace(/\./g, '')})}
								onBlur={() => this.setState({nominal: nominal.replace(/[^0-9]/g, '').replace(/\./g, '')})}
								placeholder="Nominal Tagihan" />
						</View>

						<View style={{paddingVertical:20, paddingHorizontal:10, flexDirection:'row', alignItems:'center'}}>
							<View style={{flex:9}}>
								<FloatLabelTextInput 
									value={noHp}
									autoCorrect={false} 
									keyboardType={'phone-pad'}
									onChangeTextValue={(noHp) => this.setState({noHp: noHp.replace(/[^0-9]/g, '')})}
									onBlur={() => this.setState({noHp: noHp.replace(/[^0-9]/g, '')})}
									placeholder="Masukkan Nomor Handphone" />
							</View>

							<TouchableOpacity onPress={this.openContact} style={{flex:1}}>
								<Image
								  style={{height:30, width:30, tintColor:'grey'}}
								  source={require('../assets/images/contact.png')}/>
							</TouchableOpacity>
						</View>

						<View style={{paddingVertical:20, paddingHorizontal:10}}>
							<FloatLabelTextInput 
								autoCorrect={false} 
								onChangeTextValue={(keterangan) => this.setState({keterangan})}
								placeholder="Keterangan" />
						</View>

						<View style={{marginTop:30}}>
							<Button onPress={this.onDirect} text={'Proses'} />
						</View>
					</View>
				}
			</ScrollView>
		);
	}
}