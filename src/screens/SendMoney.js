import React, { Component } from 'react';
import {Text, Image, TouchableOpacity, ActivityIndicator, View, StyleSheet, ScrollView, Dimensions} from 'react-native';
import {blue, green, yellow, screenBackgroundColor, navigatorStyle, WEB_BASE_URL} from '../libs/Constants';
import FloatLabelTextInput from 'react-native-floating-label-text-input'
import {getApi} from '../libs/api';
import Bold from '../components/Bold';
import Button from '../components/Button';
import SpaceBetween from '../components/SpaceBetween';
import getItem from '../libs/getItem';
import chunk from 'chunk';
import Rupiah from '../libs/Rupiah';
import { TabNavigator, NavigationActions, StackActions } from "react-navigation";
import { WebView } from 'react-native-webview';
let {width, height} = Dimensions.get('window')

export default class extends Component {
	static navigatorStyle = navigatorStyle;

	constructor(props){
		super(props);
		this.state = {
			user: this.props.navigation.state.params.user ? this.props.navigation.state.params.user : null,
		}
	}

	componentDidMount() {
		getItem('USER', (user) => {
			this.setState({user})
		})
	}

	componentWillMount() {
		// this.props.navigator.setTitle({
		// 	title: 'Send Money'
		// })
	}

	goToMenu = (screen) => {
		// this.props.navigator.push({
		// 	screen,
		// })

		this.props.navigation.navigate(screen)
	}

	render() {
		let {user} = this.state

		if(!user){
			return null
		}

		return (
			<ScrollView style={{backgroundColor:'white'}}>		

				<View style={{backgroundColor:'whitesmoke', padding:10, paddingHorizontal:20}}>
					<SpaceBetween>
						<Text style={{fontSize:16, fontWeight:'600'}}>SALDO DavestMoney</Text>
						<Text style={{fontSize:16, fontWeight:'600'}}>{Rupiah(user.sisasaldo)}</Text>
					</SpaceBetween>
				</View>

				<View style={{marginHorizontal:20}}>
					<TouchableOpacity onPress={() => this.goToMenu('AntarLifesWallet')} style={{flexDirection:'row', alignItems:'center', borderBottomWidth:1, borderBottomColor:'lightgrey', paddingVertical:20, paddingHorizontal:10}}>
						<View>
							<Image
							  style={{height:30, width:30, resizeMode:'contain'}}
							  source={require('../assets/images/antar_davestmoney.png')}/>
						</View>
						<View style={{marginLeft:10}}>
							<Text style={{fontWeight:'700'}}>Antar DavestMoney</Text>
						</View>
					</TouchableOpacity>

					<TouchableOpacity disabled={true} onPress={() => this.goToMenu('TransferBank')} style={{display:"none",flexDirection:'row', alignItems:'center', borderBottomWidth:1, borderBottomColor:'lightgrey', paddingVertical:20, paddingHorizontal:10}}>
						<View style={{ display:"none" }}>
							<Image
								style={{height:30, width:30, resizeMode:'contain'}}
								source={require('../assets/images/rekening_bank.png')}/>
						</View>
						<View style={{marginLeft:10, display:"none"}}>
							<Text style={{fontWeight:'700'}}>Transfer Bank</Text>
						</View>
					</TouchableOpacity>
				</View>
			</ScrollView>
		);
	}
}