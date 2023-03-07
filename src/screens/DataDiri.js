import { TabNavigator, NavigationActions, StackActions } from "react-navigation";
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
import DatePicker from '../components/DatePicker';
import moment from 'moment';
import 'moment/locale/id';
import generateCounter from '../libs/generateCounter';
import CryptoJS from 'crypto-js';
import Rupiah from '../libs/Rupiah'
import DropDownList from '../components/DropDownList';
let {width, height} = Dimensions.get('window')
const listKewarganegaraan = [
	{label: 'Indonesia', value: 'Indonesia' },
	{label: 'English', value: 'English' },
	{label: 'Malaysia', value: 'Malaysia' },
	{label: 'Zimbabue', value: 'Zimbabue' },
  ];

const typeJenisKelamin = [
	{label: 'Pria', value: 'Pria' },
	{label: 'Wanita', value: 'Wanita' },
];
import { WebView } from 'react-native-webview';

export default class extends Component {
	static navigatorStyle = navigatorStyle;

	constructor(props){
		super(props);
		this.state = {
			user: this.props.navigation.state.params.user ? this.props.navigation.state.params.user : null,
			noKTP: null,
			nama: null,
			tmpLahir: null,
			tglLahir: null,
			alamat: null,
			listPekerjaan: [],
			pekerjaanSelected: null,
			lainnya: null,
			jenis_kelamin : null,
			kewarganegaraan : null
		}
	}

	
	componentDidMount() {
		getItem('USER', (user) => {
			this.setState({user: user}, () => {
				this.getDataPekerjaan()
			})
		})
	}

	getDataPekerjaan = () => {
		let {user} = this.state
		generateCounter((counter) => {
			let params = {
				command : 'GETLISTPEKERJAAN',
				idproduk : 'MONEY',
				counter : counter,
				no_telp : user.no_telp,
				signature : CryptoJS.SHA512(user.access_token + counter.toString()).toString(),
				datetime : moment().format('DD/MM/YYYY hh:mm:ss'),
			}

			postApi('', params, true, (resp) => {
				if(resp.resultcode == '0000'){
					let listPekerjaan = []
					resp.options_list.forEach((pekerjaan, i) => {
						let obj = {
							label: pekerjaan,
							value: pekerjaan,
						}
						listPekerjaan.push(obj)
					});

					let objLainnya = {
						label: 'Lainnya',
						value: 'Lainnya',
					}
					listPekerjaan.push(objLainnya)

					this.setState({listPekerjaan})
				}else{
					Alert.alert('Info', resp.result)
				}
			})
		})
	}

	componentWillMount() {
		// this.props.navigator.setTitle({
		// 	title: 'Data Diri'
		// })
	}

	onLanjut = () => {
		let {user, noKTP, nama, tmpLahir, tglLahir, alamat, pekerjaanSelected, lainnya, jenis_kelamin, kewarganegaraan} = this.state

		if(!noKTP || !nama || !tmpLahir || !tglLahir || !alamat || !pekerjaanSelected || !jenis_kelamin, !kewarganegaraan || (pekerjaanSelected && pekerjaanSelected.value == 'Lainnya' && !lainnya)){
			Alert.alert('Info', 'Silahkan lengkapi data terlebih dahulu!')
			return
		}

		let data = {
			user, 
			noKTP, 
			nama, 
			tmpLahir, 
			tglLahir, 
			alamat,
			jenis_kelamin,
			kewarganegaraan,
			pekerjaan: pekerjaanSelected.value == 'Lainnya' ? lainnya : pekerjaanSelected.value
		}

		// this.props.navigator.push({
		// 	screen: 'UploadFoto',
		// 	passProps: {
		// 		data
		// 	}
		// })

		this.props.navigation.navigate("UploadFoto",{
			data
		})
	}

	render() {
		let {tglLahir, listPekerjaan, pekerjaanSelected} = this.state
		return (
			<ScrollView style={{backgroundColor:'white'}}>		
				<View style={{marginTop:20, marginHorizontal:20}}>
					<View>
						<FloatLabelTextInput 
							autoCorrect={false} 
							keyboardType={'phone-pad'}
							onChangeTextValue={(noKTP) => this.setState({noKTP})}
							placeholder="Nomor KTP" />
					</View>

					<View style={{marginTop:20}}>
						<FloatLabelTextInput 
							autoCorrect={false} 
							onChangeTextValue={(nama) => this.setState({nama})}
							placeholder="Nama Sesuai KTP" />
					</View>

					<View style={{marginTop:20}}>
						<FloatLabelTextInput 
							autoCorrect={false} 
							onChangeTextValue={(tmpLahir) => this.setState({tmpLahir})}
							placeholder="Tempat Lahir" />
					</View>

					<View style={{marginTop:20}}>
						<DatePicker 
							navigator={this.props.navigator}
							text={'Tanggal Lahir'} 
							value={tglLahir ? moment(tglLahir).format('DD-MM-YYYY') : null}
							onChange={(date) => this.setState({tglLahir: date})} />
					</View>
					
					<View style={{marginTop:20}}>
						<RadioForm
							radio_props={typeJenisKelamin}
							formHorizontal={true}
							labelColor={'grey'}
							selectedLabelColor={'grey'}
							buttonColor={blue}
							selectedButtonColor={blue}
							labelStyle={{marginRight:20}}
							initial={0}
							onPress={(value) => {this.setState({jenis_kelamin:value})}} />
					</View>

					<View style={{marginTop:20}}>
						<FloatLabelTextInput 
							autoCorrect={false} 
							onChangeTextValue={(alamat) => this.setState({alamat})}
							placeholder="Alamat Saat Ini" />
					</View>

					<View style={{marginTop:20}}>
						<Text style={{color:'black'}}>Kewarganegaraan</Text>
						<DropDownList 
							navigator={this.props.navigator} 
							value={pekerjaanSelected ? pekerjaanSelected.label : null}
							text={'Pilih Pekerjaan'} 
							options={listKewarganegaraan}
							onChange={(data) => this.setState({kewarganegaraan: data})} />
					</View>

					<View style={{marginTop:20}}>
						<Text style={{color:'black'}}>Pekerjaan</Text>
						<DropDownList 
							navigator={this.props.navigator} 
							value={pekerjaanSelected ? pekerjaanSelected.label : null}
							text={'Pilih Pekerjaan'} 
							options={listPekerjaan}
							onChange={(data) => this.setState({pekerjaanSelected: data})} />
					</View>

					{pekerjaanSelected && pekerjaanSelected.value == 'Lainnya' ? 
						<View style={{marginTop:20}}>
							<FloatLabelTextInput 
								autoCorrect={false} 
								onChangeTextValue={(lainnya) => this.setState({lainnya})}
								placeholder="Pekerjaan Anda" />
						</View>
						: null
					}

					<View style={{marginTop:50}}>
						<Button onPress={this.onLanjut} text={'Lanjutkan'} />
					</View>
				</View>
			</ScrollView>
		);
	}
}