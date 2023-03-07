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
let {width, height} = Dimensions.get('window')
import { TabNavigator, NavigationActions, StackActions } from "react-navigation";
import { WebView } from 'react-native-webview';
const selectorOptions = [
	{
		label: 'Transfer', value: 0
	},
	{
		label: 'History', value: 1
	}
]

export default class extends Component {
	static navigatorStyle = navigatorStyle;

	constructor(props){
		super(props);
		this.state = {
			switchSelected: 0,
			user: this.props.navigation.state.params.user ? this.props.navigation.state.params.user : null,
			jmlPenarikan: null,
			bank: null,
			noRek: null,
			namaPenerima: null,
			pesan: null,
			history: []
		}
	}

	componentDidMount() {
		getItem('USER', (user) => {
			this.setState({user: user})
			this.getHistory()
		})
	}

	getHistory = () => {
		let {user} = this.state

		generateCounter((counter) => {
			let params = {
				command : 'HISTORYPENCAIRANSALDO', 
				idproduk : 'MONEY', 
				counter : counter, 
				no_telp : user.no_telp, 
				signature : CryptoJS.SHA512(user.access_token + counter.toString()).toString(),
				datetime : moment().format('DD/MM/YYYY hh:mm:ss'),
			}

			postApi('', params, true, (resp) => {
				if(resp.resultcode == '0000'){
					this.setState({history:resp.history})
				}else{
					//Alert.alert('Info', resp.result)
				}
			})
		})
	}

	componentWillMount() {
		// this.props.navigator.setTitle({
		// 	title: 'Cairkan Saldo'
		// })
	}

	componentWillUnmount() {
		timer.clearInterval('CHECK_QR')
	}

	onTransfer = () => {
		let {user, jmlPenarikan, bank, noRek, namaPenerima, pesan} = this.state

		if(!jmlPenarikan || !bank || !noRek || !namaPenerima){
			Alert.alert('Harap isikan data terlebih dahulu')
			return
		}

		generateCounter((counter) => {
			let params = {
				command : 'REQUESTCAIRKANSALDO', 
				idproduk : 'MONEY', 
				counter : counter, 
				no_telp : user.no_telp, 
				signature : CryptoJS.SHA512(user.access_token + counter.toString()).toString(),
				datetime : moment().format('DD/MM/YYYY hh:mm:ss'),
				nominal :  jmlPenarikan,
				nama_bank : bank.nama_bank,
				no_rekening : noRek,
				nama_rekening : namaPenerima,
				keterangan : pesan ? pesan : ''
			}

			postApi('', params, true, (resp) => {
				if(resp.resultcode == '0000'){
					this.setState({switchSelected:1})
					this.props.navigator.showLightBox({
						screen: 'KonfirmasiCairkanSaldo',
						passProps: {
							data: resp,
							user,
							onSuccess: () => {
								this.getHistory()
							}
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

	renderHistory = () => {
		let result = null;
		if(this.state.history){
			var tgl = [];
			
			result = this.state.history.map((val, idx) => {
				let head = <View />;
				
				var tglNow = val.waktu.split(' ')[0];
				var jamNow = val.waktu.split(' ')[1];
				
				jamNow = jamNow.split(':')[0] + ':' + jamNow.split(':')[1];
				
				if(tgl.indexOf(tglNow) < 0){
					tgl.push(tglNow);
					
					head = (
						<View style={{flex:1, backgroundColor:'whitesmoke', padding:10, paddingHorizontal:20}}>
							<Text style={{fontSize:16, fontWeight:'600'}}>{moment(tglNow).locale('id').format('DD MMMM YYYY')}</Text>
						</View>
					);
				}

				let status = ''
				if(val.status == '0'){
					status = 'Pending'
				}else if (val.status == '1'){
					status = 'Berhasil'
				}else if (val.status == '2'){
					status = 'Gagal'
				}
				
				return (
					<View style={{flex:1}}>
						{head}
						
							<View style={{flex:1, borderBottomWidth:1, borderBottomColor:'lightgrey', paddingVertical:20, paddingHorizontal:20}}>
								<View style={{flexDirection:'row', alignItems:'center'}}>
									<View style={{flex:7}}>
										<Text style={{fontWeight:'700'}}>Transfer ke {val.nama_bank} {val.no_rekening}</Text>
										<Text style={{fontSize:10}}>{moment(val.waktu).locale('id').format('DD MMM YYYY HH:mm:ss')}</Text>
										<Text style={{fontWeight:'700', color:blue}}>{Rupiah(val.nominal).replace('Rp ', '')}</Text>
									</View>

									<View style={{flex:3}}> 
										<Text style={{fontWeight:'700', color: val.status == '1' ? 'green' : 'red', textAlign:'right'}}>{status}</Text>
									</View>
								</View>
							</View>
						
					</View>
				);
			});
			
		}

		return result;
	}

	render() {
		let {switchSelected, user, bank, jmlPenarikan} = this.state

		if(!user){
			return null
		}

		return (
			<ScrollView style={{backgroundColor:'white'}}>	

				<View style={{backgroundColor:'whitesmoke', padding:10, paddingHorizontal:20}}>
					<SpaceBetween>
						<Text style={{fontSize:16, fontWeight:'600'}}>SALDO MERCHANT</Text>
						<Text style={{fontSize:16, fontWeight:'600'}}>{Rupiah(user.sisasaldo_merchant)}</Text>
					</SpaceBetween>
				</View>	

				<View style={{paddingVertical:20, paddingHorizontal:40, borderBottomWidth:2, borderBottomColor:'lightgrey'}}>
					<SwitchSelector backgroundColor={'whitesmoke'} borderColor={'grey'} buttonColor={yellow} selectedColor={'white'} textColor={'grey'} options={selectorOptions} initial={0} value={switchSelected} onPress={(value) => this.setState({switchSelected: value})} />
				</View>

				{switchSelected == 0 && 
					<View style={{marginHorizontal:20}}>
						<View style={{paddingVertical:20, paddingHorizontal:10}}>
							<FloatLabelTextInput 
								value={jmlPenarikan ? Rupiah(jmlPenarikan, false) : ''}
								autoCorrect={false} 
								keyboardType={'phone-pad'}
								onChangeTextValue={(jmlPenarikan) => this.setState({jmlPenarikan: jmlPenarikan.replace(/\./g, '')})}
								placeholder="Jumlah Penarikan" />
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

						<View style={{paddingVertical:20, paddingHorizontal:10}}>
							<FloatLabelTextInput 
								autoCorrect={false} 
								onChangeTextValue={(noRek) => this.setState({noRek})}
								keyboardType={'phone-pad'}
								placeholder="No. Rekening" />
						</View>

						<View style={{paddingVertical:20, paddingHorizontal:10}}>
							<FloatLabelTextInput 
								autoCorrect={false} 
								onChangeTextValue={(namaPenerima) => this.setState({namaPenerima})}
								placeholder="Nama Penerima" />
						</View>

						<View style={{paddingVertical:20, paddingHorizontal:10}}>
							<FloatLabelTextInput 
								autoCorrect={false} 
								onChangeTextValue={(pesan) => this.setState({pesan})}
								placeholder="Pesan (Optional)" />
						</View>

						<TouchableOpacity onPress={this.onTransfer} style={{backgroundColor:blue, borderWidth:1, borderColor:blue, marginHorizontal:30, paddingVertical:10, borderRadius:5, marginTop:30}}>
							<Text style={{textAlign:'center', fontSize:20, fontWeight:'600', color:'white'}}>Transfer</Text>
						</TouchableOpacity>
					</View>
				}

				{switchSelected == 1 && 
					<View style={{}}>
						{this.renderHistory()}
					</View>
				}
			</ScrollView>
		);
	}
}