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
import moment from 'moment';
import 'moment/locale/id';
import generateCounter from '../libs/generateCounter';
import CryptoJS from 'crypto-js';
import Rupiah from '../libs/Rupiah'
import MyWebView from 'react-native-webview-autoheight'
import { TabNavigator, NavigationActions, StackActions } from "react-navigation";
import { WebView } from 'react-native-webview';
let {width, height} = Dimensions.get('window')

export default class extends Component {
	static navigatorStyle = navigatorStyle;

	constructor(props){
		super(props);
		this.state = {
			user: this.props.navigation.state.params.user ? this.props.navigation.state.params.user : null,
			listTopUp: [],
			selectedIndex: null
		}
	}

	componentDidMount() {
		getItem('USER', (user) => {
			this.setState({user: user}, () => {
				this.getData()
			})
		})
	}

	getData = () => {
		let {user} = this.state
		generateCounter((counter) => {
			let params = {
				command : 'GETTOPUP',
				idproduk : 'MONEY',
				counter : counter,
				no_telp : user.no_telp,
				signature : CryptoJS.SHA512(user.access_token + counter.toString()).toString(),
				datetime : moment().format('DD/MM/YYYY hh:mm:ss'),
			}

			postApi('', params, true, (resp) => {
				if(resp.resultcode == '0000'){
					this.setState({listTopUp: resp.list_informasi})
				}else{
					Alert.alert('Info', resp.result)
				}
			})
		})
	}

	componentWillMount() {
		// this.props.navigator.setTitle({
		// 	title: 'TOP UP'
		// })
	}

	render() {
		let {user, listTopUp, selectedIndex} = this.state

		if(!user){
			return null
		}

		return (
			<ScrollView style={{backgroundColor:'white'}}>		

				<View style={{backgroundColor:'whitesmoke', padding:20}}>
					<SpaceBetween>
						<View>
							<Text style={{fontSize:16, fontWeight:'700'}}>SALDO DavestMoney</Text>
							<Text style={{fontSize:25, fontWeight:'700'}}>{Rupiah(user.sisasaldo)}</Text>
						</View>

						<View>
							<Text style={{fontSize:10}}>Maks. Saldo</Text>
							<Text style={{fontSize:10}}>{Rupiah(user.max_saldo)}</Text>
							<Text style={{fontSize:10}}></Text>
							<Text style={{fontSize:10}}>Limit Incoming Terpakai / Bulan</Text>
							<Text style={{fontSize:10}}>{Rupiah(user.pemakaian_saldo)}</Text>
						</View>
					</SpaceBetween>
				</View>

				<View>
					{listTopUp.map((data, i) => (

						<View>
							<TouchableOpacity key={i} onPress={() => this.setState({selectedIndex: selectedIndex != i ? i : null})} style={{marginHorizontal:20, marginTop:20, borderWidth:1, borderColor:'lightgrey', paddingVertical:20, paddingHorizontal:10}}>
								<SpaceBetween>
									<View style={{flexDirection:'row', alignItems:'center'}}>
										{data.file_image ? 
											<Image
												style={{height:30, width:30, resizeMode:'contain'}}
												source={{uri: data.file_image}} />
											: null
										}
										<Text style={{marginLeft:10}}>{data.kategori}</Text>
									</View>

									<View>
										<Text>▼</Text>
									</View>
								</SpaceBetween>
							</TouchableOpacity>

							{selectedIndex == i &&
								<View style={{paddingHorizontal:20}}>

				<WebView
			        originWhitelist={['*']}
			        source={{html: data.isi}}
			        scalesPageToFit={false}
			    />

								</View>
							}
						</View>

					))}
				</View>
			</ScrollView>
		);
	}
}