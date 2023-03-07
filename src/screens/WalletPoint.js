import React, { Component } from 'react';
import {Text, Image, TouchableOpacity, ActivityIndicator, View, StyleSheet, ScrollView, Dimensions} from 'react-native';
import {blue, green, yellow, screenBackgroundColor, navBarHidden, WEB_BASE_URL} from '../libs/Constants';
import FloatLabelTextInput from 'react-native-floating-label-text-input'
import {getApi, postApi} from '../libs/api';
import Bold from '../components/Bold';
import Button from '../components/Button';
import SpaceBetween from '../components/SpaceBetween';
import getItem from '../libs/getItem';
import chunk from 'chunk';
import moment from 'moment';
import 'moment/locale/id';
import generateCounter from '../libs/generateCounter';
import CryptoJS from 'crypto-js';
import BottomBar from '../components/BottomBar';
import Rupiah from '../libs/Rupiah';
import { TabNavigator, NavigationActions, StackActions } from "react-navigation";
import { WebView } from 'react-native-webview';
let {width, height} = Dimensions.get('window')

export default class extends Component {
	static navigatorStyle = navBarHidden;

	constructor(props){
		super(props);
		this.state = {
			user: null,
			history: []
		}
	}

	componentDidMount() {
		getItem('USER', (user) => {
			this.setState({user}, () => {
				this.getData()
			})
		})
	}

	getData = () => {
		let {user} = this.state
		generateCounter((counter) => {
			let params = {
				command : 'HISTORYBONUS', 
				idproduk : 'MONEY', 
				counter : counter, 
				no_telp : user.no_telp, 
				signature : CryptoJS.SHA512(user.access_token + counter.toString()).toString(),
				datetime : moment().format('DD/MM/YYYY hh:mm:ss'),
				tgl_awal : moment().add(-120, 'days').format('YYYY-MM-DD'),
				tgl_akhir : moment().format('YYYY-MM-DD'),
			}

			postApi('', params, true, (resp) => {
				if(resp.resultcode == '0000'){
					if(resp.history && resp.history.length > 0){
						this.setState({history: resp.history})
					}
				}else{
					Alert.alert('Info', resp.result)
				}
			})
		})
	}

	goToDetail = (data) => {
		// this.props.navigator.push({
		// 	screen: 'HistoryPointDetail',
		// 	passProps: {
		// 		data
		// 	}
		// })


		this.props.navigation.navigate("HistoryPointDetail",{
			data
		})
	}

	render() {
		let {user, history} = this.state

		if(!user){
			return null
		}

		return (
			<View style={{backgroundColor:'white', minHeight:height}}>		
				<View style={{backgroundColor: green, padding:10, paddingHorizontal:20}}>
					<SpaceBetween>
						<Text style={{fontSize:16, color:yellow}}>POINT</Text>
						<Text style={{fontSize:16, color:'white'}}>{Rupiah(user.jumlahpoin).replace('Rp ', '')} point</Text>
					</SpaceBetween>
				</View>

				<View style={{borderBottomWidth:1, borderBottomColor:'lightgrey', padding:10, paddingHorizontal:20}}>
					<Text style={{fontSize:16, fontWeight:'600'}}>History Point</Text>
				</View>

				<View style={{marginHorizontal:20}}>

					{history.map((val, i) => (
						<TouchableOpacity onPress={() => this.goToDetail(val)} style={{borderWidth:1, borderColor:'lightgrey', paddingVertical:20, paddingHorizontal:10, marginTop:10}}>
							<View style={{flexDirection:'row', alignItems:'center'}}>
								<View style={{flex:7}}>
									<Text style={{fontWeight:'700'}}>{val.desc}</Text>
									<Text style={{fontSize:10}}>{moment(val.waktu).locale('id').format('DD MMM YYYY hh:mm:ss')}</Text>
								</View>

								<View style={{flex:3, marginLeft:10}}>
									<Text style={{fontWeight:'700', color:'green', textAlign:'right'}}>{Rupiah(val.bonus).replace('Rp ', '')} point</Text>
								</View>
							</View>
						</TouchableOpacity>
					))}
				</View>
			</View>
		);
	}
}