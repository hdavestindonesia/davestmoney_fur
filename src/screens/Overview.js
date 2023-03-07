import React, { Component } from 'react';
import {Text, Image, TouchableOpacity, ActivityIndicator, View, StyleSheet, ScrollView, Dimensions, Alert} from 'react-native';
import {blue, green, screenBackgroundColor, navBarHidden, WEB_BASE_URL} from '../libs/Constants';
import FloatLabelTextInput from 'react-native-floating-label-text-input'
import {getApi} from '../libs/api';
import Bold from '../components/Bold';
import Button from '../components/Button';
import SpaceBetween from '../components/SpaceBetween';
import getItem from '../libs/getItem';
import Dot from '../components/Dot';
import ActiveDot from '../components/ActiveDot';
import Swiper from 'react-native-swiper';
import setItem from '../libs/setItem';

let {width, height} = Dimensions.get('window')
import { TabNavigator, NavigationActions, StackActions } from "react-navigation";
import { WebView } from 'react-native-webview';
export default class extends Component {
	static navigatorStyle = navBarHidden;

	constructor(props){
		super(props);
		this.state = {
			
		}
	}

	componentDidMount() {
		
	}

	onMomentumScrollEnd = () => {
		Alert.alert('tes', 'tes')
	}

	onMulai = () => {
		setItem('ISOVERVIEW', true)
		// this.props.navigator.resetTo({
		// 	screen: 'SignIn'
		// })

			this.props.navigation.dispatch(
				StackActions.reset({
			  		index: 0,
			  		actions: [NavigationActions.navigate({ routeName: "SignIn" })]
				})
			)
	}

	render() {
		return (
			<View style={{height}}>
				<Swiper 
		  		dot={<Dot />}
		  	  activeDot={<ActiveDot />} 
			    height={height}
			    paginationStyle={{top: 0 - ((height/1.3))}}
			    loop={false}>
			    
			    <View style={{width, height, backgroundColor:'white', alignItems:'center', justifyContent:'center', padding:20}}>
			    	<Text style={{fontSize:24, textAlign:'center', color:green, fontWeight:'700'}}>Selamat Datang di</Text>
			    	<View style={{alignItems:'center', marginTop:20}}>
			    		<Image
							  style={{height:26, width:250}}
							  source={require('../assets/images/logo_white.png')}/>
			    	</View>
			    </View>
			    <View style={{width, height, backgroundColor:'white', alignItems:'center', justifyContent:'center', padding:20}}>
			    	<View style={{alignItems:'center', marginTop:20}}>
			    		<Image
							  style={{height:229, width:270}}
							  source={require('../assets/images/poinberlipat.png')}/>
			    	</View>
			    	<Text style={{fontSize:24, textAlign:'center', color:green, fontWeight:'700'}}>POIN BERLIPAT</Text>
			    	<Text style={{fontSize:18, textAlign:'center', color:green}}>Kumpulkan poin tiap belanja di berbagai merchant DavestMoney</Text>
			    </View>
			    <View style={{width, height, backgroundColor:'white', alignItems:'center', justifyContent:'center', padding:20}}>
			    	<View style={{alignItems:'center', marginTop:20}}>
			    		<Image
							  style={{height:229, width:270}}
							  source={require('../assets/images/promomenarik.png')}/>
			    	</View>
			    	<Text style={{fontSize:24, textAlign:'center', color:green, fontWeight:'700'}}>PROMO MENARIK</Text>
			    	<Text style={{fontSize:18, textAlign:'center', color:green}}>Temukan banyak Penawaran Menarik Dari Merchant DavestMoney</Text>
			    </View>
			    <View style={{width, height, backgroundColor:'white', alignItems:'center', justifyContent:'center', padding:20}}>
			    	<View style={{alignItems:'center', marginTop:20}}>
			    		<Image
							  style={{height:229, width:270}}
							  source={require('../assets/images/kirimuang.png')}/>
			    	</View>
			    	<Text style={{fontSize:24, textAlign:'center', color:green, fontWeight:'700'}}>KIRIM UANG LEBIH MUDAH</Text>
			    	<Text style={{fontSize:18, textAlign:'center', color:green}}>Kirim Uang Lebih Cepat ke Rekening Bank atau Ke Nomor Ponsel yang telah Terdaftar sebagai Pengguna DavestMoney</Text>

			    	<TouchableOpacity onPress={this.onMulai} style={{backgroundColor:blue, padding:10, width:width*0.8, borderRadius:5, marginTop:20}}>

			    		<Text style={{textAlign:'center', color:'white', fontSize:16, fontWeight:'700'}}>MULAI</Text>
			    		
			    	</TouchableOpacity>
			    </View>
			  </Swiper>
			</View>
		);
	}
}