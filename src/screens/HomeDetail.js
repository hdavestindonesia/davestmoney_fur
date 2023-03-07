import React, { Component } from 'react';
import {Alert, Text, Image, TouchableOpacity, ActivityIndicator, View, StyleSheet, ScrollView, Dimensions} from 'react-native';
import {blue, green, screenBackgroundColor, navBarHidden, WEB_BASE_URL} from '../libs/Constants';
import FloatLabelTextInput from 'react-native-floating-label-text-input'
import {getApi} from '../libs/api';
import {postApi} from '../libs/api';
import Bold from '../components/Bold';
import Button from '../components/Button';
import SpaceBetween from '../components/SpaceBetween';
import getItem from '../libs/getItem';
import setItem from '../libs/setItem';
import Rupiah from '../libs/Rupiah';
import chunk from 'chunk';
import moment from 'moment';
import 'moment/locale/id';
import generateCounter from '../libs/generateCounter';
import CryptoJS from 'crypto-js';
import { TabNavigator, NavigationActions, StackActions } from "react-navigation";
import { WebView } from 'react-native-webview';
let {width, height} = Dimensions.get('window')
export default class extends Component {
	static navigatorStyle = navBarHidden;

	constructor(props){
		super(props);
		this.state = {
			user: this.props.user ? this.props.user : null,
			// user: null,
			promoList: []
		}

	}

	componentDidMount() {
		this.getUserInfo()
		this.getPromoList()
	}

	getUserInfo = () => {
		getItem('USER', (user) => {
			if(user){
				generateCounter((counter) => {
					let params = {
						command : 'GETINFO', 
						idproduk : 'MONEY', 
						counter : counter, 
						no_telp : user.no_telp, 
						signature : CryptoJS.SHA512(user.access_token + counter.toString()).toString(),
						datetime : moment().format('DD/MM/YYYY hh:mm:ss'),
					}

					postApi('', params, false, (resp) => {
						if(resp.resultcode == '0000'){
							resp.access_token = user.access_token
							setItem('USER', resp)
							this.setState({user: resp})
						}else{
							//Alert.alert('Info', resp.result)
						}
					})
				})
			}
		})
	}

	getPromoList = () => {
		getItem('USER', (user) => {
			generateCounter((counter) => {
				let params = {
					command : 'GETPROMOLIST',
					idproduk : 'MONEY',
					counter : counter,
					no_telp : user.no_telp,
					signature : CryptoJS.SHA512(user.access_token + counter.toString()).toString(),
					datetime : moment().format('DD/MM/YYYY hh:mm:ss'),
					tipe: 'PROMO',
					search_query: '',
					page: 1
				}

				postApi('', params, false, (resp) => {
					if(resp.resultcode == '0000'){
						this.setState({promoList: resp.promo_list})
					}else{
						//Alert.alert('Info', resp.result)
					}
				})
			})
		})
	}

	goToMenu = (screen) => {


		let {user} = this.state
		this.props.navigation.navigate(screen, {
			user: user
		})

		// Alert.alert("screen", screen)


	}

	onPressPromo = (data) => {

		this.props.navigation.navigate("PromoDetail",{
			data
		})

	}

	render() {
		let {user, promoList} = this.state

		if(!user){
			return null
		}

		let menuMiddles = []

		if(user.jenis_user == 0 || user.jenis_user == 1){
			menuMiddles = [
				// {
				// 	screen: 'SendMoney',
				// 	source: require('../assets/images/sendmoney.png')
				// },
				{
					screen: 'Akun',
					source: require('../assets/images/akun.png')
				},
				// {
				// 	screen: 'TarikTunai',
				// 	source: require('../assets/images/tariktunai.png')
				// },
			]
		}else{
			menuMiddles = [
				{
					screen: 'SendMoney',
					source: require('../assets/images/sendmoney.png')
				},
				{
					screen: 'QRMaker',
					source: require('../assets/images/pembayaranmasuk.png')
				},
				{
					screen: 'Akun',
					source: require('../assets/images/akun.png')
				},
				// {
				// 	screen: 'TarikTunai',
				// 	source: require('../assets/images/tariktunai.png')
				// },
			]
		}

		let menuBottom = [
			{
				screen: 'PLN',
				source: require('../assets/images/PLN.png')
			},
			{
				screen: 'BPJS',
				source: require('../assets/images/BPJS.png')
			},
			{
				screen: 'Pulsa',
				source: require('../assets/images/Pulsa.png')
			},
			{
				screen: 'Telkom',
				source: require('../assets/images/Telkom.png')
			}
		]

		let menuBottom2 = [
			{
				screen: 'Game',
				source: require('../assets/images/Game.png')
			},
			{
				screen: 'PDAM',
				source: require('../assets/images/PDAM.png')
			},
			{
				screen: 'TVKabel',
				source: require('../assets/images/tvkabel.png')
			},
			{
				screen: 'SemuaProduk',
				source: require('../assets/images/semua.png')
			},
		]

		let menuChunk = chunk(menuBottom, 4)

		return (
			<ScrollView>		
				<View style={{flexDirection:'row', marginHorizontal:10, marginTop:20, alignItems:'center', justifyContent:'center', borderRadius: 65, overflow: "hidden"}}>
					{menuMiddles.map((menu, i) => (
						<TouchableOpacity onPress={() => this.goToMenu(menu.screen)} key={i} style={{width: (width-80)/4, marginHorizontal:5}}>
							<Image
							  style={{height:50, width:null, resizeMode:'contain'}}
							  source={menu.source}/>
						</TouchableOpacity>
					))}
				</View>

				<View style={{flexDirection:'row', marginHorizontal:30, marginTop:40, alignItems:'center', justifyContent:'center'}}>
					<View style={{marginHorizontal:10}}>
						<TouchableOpacity onPress={() => this.goToMenu('TopUp')} style={{backgroundColor:blue, borderWidth:1, borderColor:blue, padding:10, borderRadius:5}}>
							<Text style={{textAlign:'center', fontSize:14, color:'white'}}>Top Up</Text>
						</TouchableOpacity>
					</View>

					<View style={{marginHorizontal:10}}>
						<Text style={{fontSize:12, color:'yellow'}}>POINT</Text>
						<Text style={{fontSize:14, color:'white'}}>{Rupiah(user.jumlahpoin, false)}</Text>
					</View>

					<View style={{marginHorizontal:10}}>
						<Text style={{fontSize:12, color:'yellow'}}>SALDO DavestMoney</Text>
						<SpaceBetween>
							<Text style={{fontSize:14, color:'white'}}>{Rupiah(user.sisasaldo)}</Text>
							<TouchableOpacity onPress={() => this.getUserInfo()}>
								<Image
								  style={{height:20, width:20, tintColor:'white'}}
								  source={require('../assets/images/refresh.png')}/>
							</TouchableOpacity>
						</SpaceBetween>
					</View>
				</View>

				{user.jenis_user == 2 &&
					<View style={{margin:20, marginBottom:0, padding:20, backgroundColor:'white', elevation:1, borderRadius: 18, overflow: "hidden"}}>

						<SpaceBetween>
							<View>
								<Text style={{fontSize:10}}>Saldo Merchant</Text>
								<Text>{Rupiah(user.sisasaldo_merchant)}</Text>
							</View>

							<SpaceBetween>
								<TouchableOpacity onPress={() => this.goToMenu('TerimaTarikTunai')} style={{padding:5, backgroundColor:blue, display:'none'}}>
									<Text style={{textAlign:'center', color:'white', fontSize:10}}>Terima Tarik Tunai</Text>
								</TouchableOpacity>

								<TouchableOpacity onPress={() => this.goToMenu('CairkanSaldo')} style={{padding:5, backgroundColor:blue, marginLeft:5}}>
									<Text style={{textAlign:'center', color:'white', fontSize:10}}>Cairkan Saldo</Text>
								</TouchableOpacity>
							</SpaceBetween>
						</SpaceBetween>

					</View>
				}

				<View style={{margin:20, padding:20, backgroundColor:'white', elevation:1, borderRadius: 18, overflow: "hidden"}}>

					<View style={{flexDirection:'row'}}>
						{menuBottom.map((menu, i) => (
							<TouchableOpacity key={i} onPress={() => this.goToMenu(menu.screen)} style={{width: (width-80)/4}}>
								<Image
								  style={{height:50, width:null, resizeMode:'contain'}}
								  source={menu.source}/>
							</TouchableOpacity>
						))}
					</View>

					<View style={{flexDirection:'row', marginTop:10}}>
						{menuBottom2.map((menu, i) => (
							<TouchableOpacity key={i} onPress={() => this.goToMenu(menu.screen)} style={{width: (width-80)/4}}>
								<Image
								  style={{height:50, width:null, resizeMode:'contain'}}
								  source={menu.source}/>
							</TouchableOpacity>
						))}
					</View>

				</View>

				<View>
					<ScrollView
						showsHorizontalScrollIndicator={false}
						horizontal
						style={{paddingLeft: 10, marginBottom:10 }}>

						{promoList.map((data, i) => (
							<TouchableOpacity key={i} onPress={() => this.onPressPromo(data)} style={{marginRight:10}}>
								<View>
									<Image
						    	  defaultSource={require('../assets/images/placeholder_land.jpg')}
							    	style={{width: width - 30, backgroundColor:'#f1eff0', height:150, resizeMode:'cover'}} 
					    	    source={{uri: data.url_image}} />
								</View>
							</TouchableOpacity>
						))}
						
					</ScrollView>
				</View>
			</ScrollView>
		);
	}
}