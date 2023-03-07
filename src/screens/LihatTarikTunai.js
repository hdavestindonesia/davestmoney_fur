import React, { Component } from 'react';
import {Text, Image, TouchableOpacity, ActivityIndicator, View, StyleSheet, ScrollView, Dimensions, Alert} from 'react-native';
import {blue, green, yellow, screenBackgroundColor, navBarHidden, WEB_BASE_URL} from '../libs/Constants';
import FloatLabelTextInput from 'react-native-floating-label-text-input'
import {postApi} from '../libs/api';
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

let {width, height} = Dimensions.get('window')
import { TabNavigator, NavigationActions, StackActions } from "react-navigation";
import { WebView } from 'react-native-webview';
export default class extends Component {
	static navigatorStyle = navBarHidden;

	constructor(props){
		super(props);
		this.state = {
			user: this.props.navigation.state.params.user ? this.props.navigation.state.params.user : null,
			tarikTunai: null
		}
	}

	componentDidMount() {
		getItem('USER', (user) => {
			this.setState({user: user}, () => {
				this.getTarikTunai()
			})
		})
	}

	getTarikTunai = () => {
		let {user} = this.state
		let {data} = this.props.navigation.state.params

		generateCounter((counter) => {
			let params = {
				command : 'GETTARIKTUNAIDETAIL',
				idproduk : 'MONEY',
				counter : counter,
				no_telp : user.no_telp,
				signature : CryptoJS.SHA512(user.access_token + counter.toString()).toString(),
				datetime : moment().format('DD/MM/YYYY hh:mm:ss'),
				kode_tariktunai : data.kode
			}

			postApi('', params, true, (resp) => {
				if(resp.resultcode == '0000'){
					this.setState({tarikTunai: resp})
				}else{
					Alert.alert('Info', resp.result)
				}
			})
		})
	}

	render() {
		let {tarikTunai, user} = this.state

		if(!tarikTunai){
			return null
		}

		return (
			<ScrollView style={{backgroundColor:'white'}}>		
				<View style={{marginTop:40}}>
					<Image
						style={{height:30, width:null, resizeMode:'contain'}}
						source={require('../assets/images/logo_white.png')}/>
				</View>

				<View style={{marginTop:10}}>

					<View style={{padding:20}}>
						<Text style={{textAlign:'center'}}>Silahkan melakukan Tarik Tunai di Merchant DavestMoney terdekat dengan menukarkan Kode ID Dibawah ini</Text>
					</View>

					<SpaceBetween style={{padding:20}}>
						<Text style={{color:'red'}}>KODE ID {tarikTunai.kode_tariktunai}</Text>

						<View>
							<Text style={{fontSize:10}}>Berlaku Hingga</Text>
							<Text style={{fontSize:10, fontWeight:'600'}}>{moment(tarikTunai.berlaku_sampai).format('DD/MM/YYYY hh:mm:ss')}</Text>
						</View>
					</SpaceBetween>

					<View style={{padding:20, backgroundColor:'whitesmoke'}}>
						<SpaceBetween>
							<Text>Nominal</Text>
							<Text style={{color:blue, fontWeight:'600'}}>{Rupiah(tarikTunai.nominal)}</Text>
						</SpaceBetween>

						<SpaceBetween>
							<Text>Biaya Layanan</Text>
							<Text style={{color:blue, fontWeight:'600'}}>{Rupiah(tarikTunai.admin)}</Text>
						</SpaceBetween>

						<SpaceBetween>
							<Text>Cashback</Text>
							<Text style={{color:blue, fontWeight:'600'}}>{Rupiah(tarikTunai.cashback)}</Text>
						</SpaceBetween>
					</View>

					<SpaceBetween style={{margin:20, borderBottomWidth:1, borderBottomColor:blue}}>
						<Text>No. Handphone</Text>
						<Text style={{color:blue, fontWeight:'600'}}>{user.no_telp}</Text>
					</SpaceBetween>

					<SpaceBetween style={{margin:20, borderBottomWidth:1, borderBottomColor:blue}}>
						<Text>Keterangan</Text>
						<Text style={{color:blue, fontWeight:'600'}}>{tarikTunai.keterangan}</Text>
					</SpaceBetween>

					<SpaceBetween style={{padding:20, backgroundColor:'whitesmoke'}}>
						<Text>Total</Text>
						<Text style={{color:blue, fontSize:20, fontWeight:'600'}}>{Rupiah(parseInt(tarikTunai.nominal) + parseInt(tarikTunai.admin))}</Text>
					</SpaceBetween>

					<View style={{marginVertical:50}}>
						<Button onPress={() => 
							this.props.navigation.dispatch(
					            StackActions.pop()
					          )
						} text={'Tutup'} />
					</View>
				</View>
				
			</ScrollView>
		);
	}
}