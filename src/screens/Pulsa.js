import React, { Component } from 'react';
import {Alert, Text, Image, TouchableOpacity, ActivityIndicator, View, StyleSheet, ScrollView, Dimensions} from 'react-native';
import {blue, green, yellow, screenBackgroundColor, navigatorStyle, WEB_BASE_URL} from '../libs/Constants';
import FloatLabelTextInput from 'react-native-floating-label-text-input'
import {getApi, postApi} from '../libs/api';
import Bold from '../components/Bold';
import Button from '../components/Button';
import SpaceBetween from '../components/SpaceBetween';
import getItem from '../libs/getItem';
import chunk from 'chunk';
import DropDownList from '../components/DropDownList';
import Rupiah from '../libs/Rupiah';
import xml2js from 'react-native-xml2js'
import moment from 'moment';
import 'moment/locale/id';
import generateCounter from '../libs/generateCounter';
import CryptoJS from 'crypto-js';
import {filter} from 'lodash'
import {paymentOptions} from '../components/PaymentOptions';
import { TabNavigator, NavigationActions, StackActions } from "react-navigation";
import { WebView } from 'react-native-webview';
let {width, height} = Dimensions.get('window')

import {Picker} from '@react-native-picker/picker';

export default class extends Component {
	static navigatorStyle = navigatorStyle;

	constructor(props){
		super(props);
		this.state = {
			user: this.props.navigation.state.params.user ? this.props.navigation.state.params.user : null,
			noHP: "",
			listProvider: [],
			provider: "",
			productSelected: "",
			pembayaran: 'Saldo'
		}

		// Alert.alert("tes ")
	}

	componentDidMount() {
		getItem('USER', (user) => {
			this.setState({user: user})

			generateCounter((counter) => {
				let params = {
					command : 'GETHARGA',
					idproduk : 'MONEY',
					counter : counter,
					no_telp : user.no_telp, 
					signature : CryptoJS.SHA512(user.access_token + counter.toString()).toString(),
					datetime : moment().format('DD/MM/YYYY hh:mm:ss')
				}

				postApi('', params, true, (resp) => {

					// Alert.alert("tes", JSON.stringify(resp))
					if(resp.resultcode == '0000'){
						// Alert.alert("tessssss", JSON.stringify(resp.harga))
						this.setState({listProvider: resp.harga})
					}else{
						
					}
				})
			})
		})
	}

	componentWillMount() {
		// this.props.navigator.setTitle({
		// 	title: 'Pulsa'
		// })
	}

	onProses = () => {
		let {user, noHP, productSelected, pembayaran} = this.state

		if(noHP != "" && productSelected != "" && pembayaran != "")
		{
			let data = {
				admin: productSelected.admin,
				cashback: productSelected.cashback,
				harga: productSelected.harga,
				denom: productSelected.denom,
				kodeoperator: productSelected.kodeoperator,
				kodeproduk: productSelected.kodeproduk,
				noHP: noHP
			}

			if(pembayaran == 'Saldo'){
				data.pay_method = 0
			}else if(pembayaran == 'Point'){
				data.pay_method = 1
			}else{
				data.pay_method = 2
			}

			


			this.props.navigation.navigate("KonfirmasiPulsa",{
				data: data,
				user
			})
		}
	}

	render() {
		let {user, noHP, listProvider, provider, productSelected, pembayaran} = this.state

		if(!user){
			return null
		}

		let providerOptions = []
		let nominalOptions = []

		if(listProvider.length > 0){
			//get list provider
			listProvider.forEach((provider, i)=> {
				let filterProvider = filter(providerOptions, {'label': provider.kodeoperator})
				if(filterProvider.length == 0){
					let obj = {
						label: provider.kodeoperator,
						value: provider.kodeoperator
					}

					providerOptions.push(obj)	
				}
			})

			//get list nominal
			if(provider){
				let filterProvider = filter(listProvider, {'kodeoperator': provider})
				filterProvider.forEach((provider, i)=> {
					let obj = {
						label: Rupiah(provider.denom).replace('Rp ', ''),
						value: provider
					}

					nominalOptions.push(obj)	
				})
			}
		}

		// if(JSON.stringify(providerOptions) != "[]")
		// {
			// Alert.alert("provider",JSON.stringify(providerOptions))

			return (
				<ScrollView style={{backgroundColor:'white', padding:20}}>
					<View>
						<Text style={{color:'black'}}>Provider</Text>



						<Picker
	                        selectedValue={this.state.provider}
	                        onValueChange={(itemValue, itemIndex) => this.setState({provider: itemValue})} 
	                    >
	                    	<Picker.Item label="Pilih" value="" />     
	                                      
	                        { providerOptions.map((item, key)=>(
	                            <Picker.Item label={item.label} value={item.value} key={key} />)
	                        )}
	        
	                    </Picker>

					</View>

					<View style={{marginTop:20}}>
						<Text style={{color:'black'}}>Nomor Tujuan</Text>
						<View>
							<FloatLabelTextInput 
								value={noHP}
								onChangeTextValue={(noHP) => this.setState({noHP: noHP.replace(/[^0-9]/g, '')})}
								onBlur={() => this.setState({noHP: noHP.replace(/[^0-9]/g, '')})}
								autoCorrect={false}
								keyboardType={'phone-pad'}
								placeholder="Masukkan No. Handphone" />
						</View>
					</View>

					<View style={{marginTop:20}}>
						<Text style={{color:'black'}}>Nominal</Text>


						<Picker
	                        selectedValue={this.state.productSelected}
	                        onValueChange={(itemValue, itemIndex) => this.setState({productSelected: itemValue}) } 
	                    >
	                                      
	                        <Picker.Item label="Pilih" value="" />     
	                        { nominalOptions.map((item, key)=>(
	                            <Picker.Item label={item.label} value={item.value} key={key} />)
	                        )}
	        
	                    </Picker>

						<View style={{backgroundColor:'whitesmoke', padding:10}}>
							<SpaceBetween>
								<Text>Harga</Text>
								<Text>{productSelected ? Rupiah(productSelected.harga) : Rupiah(0)}</Text>
							</SpaceBetween>

							<SpaceBetween>
								<Text>Biaya Layanan</Text>
								<Text>{productSelected ? Rupiah(productSelected.admin) : Rupiah(0)}</Text>
							</SpaceBetween>

							<SpaceBetween>
								<Text>Cashback</Text>
								<Text>{productSelected ? Rupiah(productSelected.cashback) : Rupiah(0)}</Text>
							</SpaceBetween>
						</View>
					</View>

					<View style={{marginTop:20}}>
						<Text style={{color:'black'}}>Metode Pembayaran</Text>

						<Picker
						   selectedValue={this.state.pembayaran}
						   onValueChange={(itemValue, itemIndex) => this.setState({pembayaran: itemValue})} 
						>

						  <Picker.Item label="Pilih" value="" />     
						                                      
						  { paymentOptions.map((item, key)=>(
						    <Picker.Item label={item.label} value={item.value} key={key} />)
						  )}
						        
						</Picker>


					</View>

					<View>
						<SpaceBetween>
							<Text style={{color:'blue'}}>Saldo DavestMoney</Text>
							<Text style={{color:'blue'}}>{Rupiah(user.sisasaldo)}</Text>
						</SpaceBetween>
						<SpaceBetween>
							<Text style={{color:'blue'}}>Point</Text>
							<Text style={{color:'blue'}}>{Rupiah(user.jumlahpoin, false)}</Text>
						</SpaceBetween>
					</View>

					<View style={{marginTop:50}}>
						<Button onPress={() => this.onProses()} text={'Proses'} />
					</View>
				</ScrollView>
			);
		// }





	}
}