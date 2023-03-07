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
import { WebView } from 'react-native-webview';
import { TabNavigator, NavigationActions, StackActions } from "react-navigation";
let {width, height} = Dimensions.get('window')
export default class extends Component {
	static navigatorStyle = navBarHidden;

	constructor(props){
		super(props);
		this.state = {
			user: null,
			history: null
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
				command : 'HISTORYSALDO', 
				idproduk : 'MONEY', 
				counter : counter, 
				no_telp : user.no_telp, 
				signature : CryptoJS.SHA512(user.access_token + counter.toString()).toString(),
				datetime : moment().format('DD/MM/YYYY hh:mm:ss'),
				tgl_awal : moment().add(-30, 'days').format('YYYY-MM-DD'),
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
		// 	screen: 'HistoryDetail',
		// 	passProps: {
		// 		data
		// 	}
		// })


		this.props.navigation.navigate("HistoryDetail",{
			data
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
				
				return (
					<View style={{flex:1}}>
						{head}
						
							<TouchableOpacity onPress={() => this.goToDetail(val)} style={{flex:1, borderBottomWidth:1, borderBottomColor:'lightgrey', paddingVertical:20, paddingHorizontal:20}}>
								<View style={{flexDirection:'row', alignItems:'center'}}>
									<View style={{flex:7}}>
										<Text style={{fontWeight:'700'}}>{val.desc}</Text>
										<Text style={{fontSize:10}}>Refnum: {val.refnum}</Text>
										<Text style={{fontSize:10}}>{moment(val.waktu).locale('id').format('DD MMM YYYY HH:mm:ss')}</Text>
									</View>

									<View style={{flex:3, marginLeft:10}}>
										<Text style={{fontWeight:'700', color:'green', textAlign:'right'}}>{Rupiah(val.jumlah).replace('Rp ', '')}</Text>
									</View>
								</View>
							</TouchableOpacity>
						
					</View>
				);
			});
			
			
		}
		
		return result;
	}

	render() {

		return (
			<ScrollView style={{flex:1, backgroundColor:'white'}}>		

				{this.renderHistory()}
				
			</ScrollView>
		);
	}
}