import React, { Component } from 'react';
import {Text, Image, TouchableOpacity, ActivityIndicator, View, StyleSheet, ScrollView, Dimensions, Alert} from 'react-native';
import {blue, green, yellow, screenBackgroundColor, navigatorStyle, WEB_BASE_URL} from '../libs/Constants';
import FloatLabelTextInput from 'react-native-floating-label-text-input'
import {getApi} from '../libs/api';
import Bold from '../components/Bold';
import Button from '../components/Button';
import SpaceBetween from '../components/SpaceBetween';
import getItem from '../libs/getItem';
import chunk from 'chunk';
import generateCounter from '../libs/generateCounter';
import CryptoJS from 'crypto-js';
import moment from 'moment';
import 'moment/locale/id';
import {postApi} from '../libs/api';
import { TabNavigator, NavigationActions, StackActions } from "react-navigation";
import { WebView } from 'react-native-webview';
let {width, height} = Dimensions.get('window')

export default class extends Component {
	static navigatorStyle = navigatorStyle;

	constructor(props){
		super(props);
		this.state = {
			user: this.props.navigation.state.params.user ? this.props.navigation.state.params.user : null,
			noBaru: null
		}
	}

	componentDidMount() {
		getItem('USER', (user) => {
			this.setState({user})
		})
	}

	componentWillMount() {
		// this.props.navigator.setTitle({
		// 	title: 'Ubah Nomor Handphone'
		// })
	}

	onProses = () => {
		let {user, noBaru} = this.state

		// this.props.navigator.push({
		// 	screen: 'MasukkanCode',
		// 	passProps: {
		// 		type: 'editphone',
		// 		onSuccess: (securityCode) => {
		// 			this.editphone(securityCode)
		// 		}
		// 	}
		// })


		this.props.navigation.navigate("MasukkanCode",{
			type: 'editphone',
			onSuccess: (securityCode) => {
				this.editphone(securityCode)
			}
		})
	}

	editphone = (securityCode) => {
		let {user, noBaru} = this.state

		generateCounter((counter) => {
			let params = {
				command : 'EDITINFO', 
				idproduk : 'MONEY', 
				counter : counter, 
				no_telp : user.no_telp, 
				signature : CryptoJS.SHA512(user.access_token + counter.toString()).toString(),
				datetime : moment().format('DD/MM/YYYY hh:mm:ss'),
				no_telp_baru : noBaru,
				nama_user : user.nama_user,
				email : user.email,
				file_image : ''
			}

			postApi('', params, true, (resp) => {
				if(resp.resultcode == '0000'){
					this.props.navigator.push({
						screen: 'SignInCode',
						passProps: {
							noPonsel: user.no_telp,
							type: 'editphone',
						}
					})
				}else{
					Alert.alert('Info', resp.result)
				}
			})
		})
	}

	render() {
		let {noPonsel} = this.props.navigation.state.params
		let {noBaru} = this.state

		return (
			<ScrollView style={{backgroundColor:'white'}}>		
				<View style={{marginTop:20, marginHorizontal:20}}>
					<View>
						<Text style={{fontSize:12}}>Nomor Handphone Lama</Text>
						<SpaceBetween style={{marginTop:10, borderBottomWidth:1, borderBottomColor:'lightgrey'}}>
							<View style={{marginLeft:5}}>
								<Text style={{fontSize:16}}>{noPonsel} <Text style={{color:'red'}}>Otomatis</Text></Text>
							</View>

							<View>
								<Text style={{color:blue}}></Text>
							</View>
						</SpaceBetween>
					</View>

					<View style={{marginTop:20}}>
						<Text style={{fontSize:12}}>Nomor Handphone Baru</Text>
						<View>
							<FloatLabelTextInput 
								value={noBaru}
								autoCorrect={false} 
								keyboardType={'phone-pad'}
								onChangeTextValue={(noBaru) => this.setState({noBaru})} />
						</View>
					</View>

					<View style={{marginTop:30}}>
						<Button onPress={() => this.onProses()} text={'Proses'} />
					</View>
				</View>
				
			</ScrollView>
		);
	}
}