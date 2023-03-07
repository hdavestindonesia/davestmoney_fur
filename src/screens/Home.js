import React, { Component } from 'react';
import {Text, Image, TouchableOpacity, ActivityIndicator, View, StyleSheet, ScrollView, Dimensions} from 'react-native';
import {blue, green, greenOld, yellow, screenBackgroundColor, navBarHidden, WEB_BASE_URL, } from '../libs/Constants';
import FloatLabelTextInput from 'react-native-floating-label-text-input'
import {getApi, postApi} from '../libs/api';
import Bold from '../components/Bold';
import Button from '../components/Button';
import SpaceBetween from '../components/SpaceBetween';
import getItem from '../libs/getItem';
import setItem from '../libs/setItem';
import chunk from 'chunk';
import HomeDetail from './HomeDetail'
import WalletPoint from './WalletPoint'
import WalletDeal from './WalletDeal'
import History from './History'
import moment from 'moment';
import 'moment/locale/id';
import generateCounter from '../libs/generateCounter';
import CryptoJS from 'crypto-js';
import OneSignal from 'react-native-onesignal'; 
import Permissions from 'react-native-permissions';
import { TabNavigator, NavigationActions, StackActions } from "react-navigation";
import { WebView } from 'react-native-webview';
let {width, height} = Dimensions.get('window')
export default class extends Component {
	static navigatorStyle = navBarHidden;

	constructor(props){
		super(props);

		this.state = {
			selectedIndexMenu: 0,
			user: null,
			isHaveNotif: false
		}

		this.onIds = this.onIds.bind(this);
		this.onOpened = this.onOpened.bind(this);
		this.onReceived = this.onReceived.bind(this);

		// this.props.navigator.setOnNavigatorEvent((event) => {
		// 	let { id, type, link } = event
		// 	if (id == 'didAppear') {
		// 		let {selectedIndexMenu} = this.state
		// 		if(selectedIndexMenu == 0){
		// 			this.getUserInfo()
		// 			this.setState({selectedIndexMenu: null}, () => {
		// 				this.setState({selectedIndexMenu: 0})
		// 			})
		// 		}
		// 	}
		// })

		// Alert.alert("masuk home")
	}

	componentWillMount() {
    // OneSignal.init("03a9ff03-3da6-4ee6-a11f-bdef3b07271d");
    // OneSignal.configure({});

    // OneSignal.addEventListener('received', this.onReceived);
    // OneSignal.addEventListener('opened', this.onOpened);
    // OneSignal.addEventListener('ids', this.onIds);
  }

	componentWillUnmount() {
    // OneSignal.removeEventListener('ids', this.onIds);
    // OneSignal.removeEventListener('opened', this.onOpened);
    // OneSignal.removeEventListener('received', this.onReceived);
  }

  onReceived(notification) {
    console.log("Notification received: ", notification);
		// this.setNotif(notification)
		
		// if(notification && notification.payload && notification.payload.additionalData && notification.payload.additionalData.additional_data){
		// 	let data = JSON.parse(notification.payload.additionalData.additional_data)
		// 	this.inquiry(data.qr_data)
		// }
  }

  onOpened(openResult) {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
		console.log('openResult: ', openResult);
		
		let {notification} = openResult
		this.setNotif(notification)

		if(notification && notification.payload && notification.payload.additionalData && notification.payload.additionalData.additional_data){
			let data = JSON.parse(notification.payload.additionalData.additional_data)
			this.inquiry(data.qr_data)
		}
  }

  onIds(device) {
    console.log('Device info: ', device);
    setItem('DEVICE_INFO', device)

    getItem('USER', (user) => {
			generateCounter((counter) => {
				let params = {
					command : 'SENDNOTIFID', 
					idproduk : 'MONEY', 
					counter : counter, 
					no_telp : user.no_telp, 
					signature : CryptoJS.SHA512(user.access_token + counter.toString()).toString(),
					datetime : moment().format('DD/MM/YYYY hh:mm:ss'),
					notif_id : device.userId,
				}

				postApi('', params, false, (resp) => {
					if(resp.resultcode == '0000'){
						
					}else{
						
					}
				})
			})
		})
	}
	
	inquiry = (qrCode) => {
    let {user} = this.state

    generateCounter((counter) => {
      let params = {
        command : 'INQUIRYQRPAY',
        idproduk : 'MONEY',
        counter : counter,
        no_telp : user.no_telp,
        signature : CryptoJS.SHA512(user.access_token + counter.toString()).toString(),
        datetime : moment().format('DD/MM/YYYY hh:mm:ss'),
        qr_data : qrCode
      }

      postApi('', params, true, (resp) => {
        if(resp.resultcode == '0000'){
          // this.props.navigator.push({
          //   screen: 'PembayaranTagihan',
          //   passProps: {
          //     data:resp
          //   }
          // })


          this.props.navigation.navigate("PembayaranTagihan",{
						data:resp
					})
        }else{
          Alert.alert('Info', resp.result)
        }
      })
    })
  }

  setNotif = (notification) => {
  	notification.dateTime = moment().format('YYYY-MM-DD hh:mm:ss')

  	getItem('NOTIFICATIONS', (notifications) => {
  		if(notifications && notifications.length > 0){
  			notifications.push(notification)
  			setItem('NOTIFICATIONS', notifications)
  		}else{
  			let listNotif = []
  			listNotif.push(notification)
  			setItem('NOTIFICATIONS', listNotif)
  		}
  	})
  	
  	this.setState({isHaveNotif: true})
  }

	componentDidMount() {
		this.getUserInfo()
	}

	getUserInfo = () => {
		getItem('USER', (user) => {
			this.setState({user: user})
		})
	}

	goToMenu = (screen) => {

		if(screen == 'Notification'){
			this.setState({isHaveNotif: false})
		}

		// this.props.navigator.push({
		// 	screen,
		// })

		this.props.navigation.navigate(screen)
	}

	goToScanQR = () => {
		Permissions.request('camera').then(response => {
			if (response == 'denied') {
				
			} else if (response == 'authorized') {
				// this.props.navigator.push({
				// 	screen: 'ScanQR',
				// })

				this.props.navigation.navigate("ScanQR")
			}
		})
	}

	render() {
		let {selectedIndexMenu, user, isHaveNotif} = this.state

		if(!user){
			return null
		}

		let menuHeaders = [
			{
				source: require('../assets/images/home.png')
			},
			{
				source: require('../assets/images/walletpoint.png')
			},
			{
				source: require('../assets/images/walletdeals.png')
			},
			{
				source: require('../assets/images/history.png')
			},
		]

		return (
			<View style={{flex: 1}}>
				<View style={{position:'absolute', top:0, bottom:0, left:0, right:0, height:height}}>
					<View style={{height:height/2, backgroundColor:greenOld}}>
					</View>

					<View style={{height:height/2, backgroundColor:'white'}}>
					</View>
				</View>

				<View style={{flex:1, width:width}}>
					<View style={{height:70, padding:20, backgroundColor:green}}>
						<SpaceBetween>
							<View>
								<Image
								  style={{height:22, width:210}}
								  source={require('../assets/images/logo_white.png')}/>
							</View>

							<SpaceBetween>
								<TouchableOpacity onPress={() => this.goToMenu('Notification')} style={{marginRight:20}}>
									<Image
									  style={{height:20, width:20, tintColor: isHaveNotif ? yellow : 'white'}}
									  source={require('../assets/images/notif.png')}/>
								</TouchableOpacity>

								<TouchableOpacity onPress={() => this.goToScanQR()}>
									<Image
									  style={{height:20, width:20, display:'none'}}
									  source={require('../assets/images/paybyQR.png')}/>
								</TouchableOpacity>
							</SpaceBetween>
						</SpaceBetween>
					</View>
						
					<View style={{marginVertical:10, flexDirection:'row'}}>
						{menuHeaders.map((menu, i) => (
							<TouchableOpacity onPress={() => this.setState({selectedIndexMenu: i})} key={i} style={{width: width/4}}>
								<Image
								  style={{height:50, width:null, resizeMode:'contain', tintColor: selectedIndexMenu == i ? yellow : 'white'}}
								  source={menu.source}/>
							</TouchableOpacity>
						))}
					</View>

					<View style={{flex: 1}}>
						{selectedIndexMenu == null && <View />}
						{selectedIndexMenu == 0 && <HomeDetail user={user} navigation={this.props.navigation} />}
						{selectedIndexMenu == 1 && <WalletPoint navigation={this.props.navigation} />}
						{selectedIndexMenu == 2 && <WalletDeal navigation={this.props.navigation} />}
						{selectedIndexMenu == 3 && <History navigation={this.props.navigation} />}
					</View>

				</View>



			</View>
		);
	}
}