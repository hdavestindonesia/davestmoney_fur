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
import { TabNavigator, NavigationActions, StackActions } from "react-navigation";
import { WebView } from 'react-native-webview';
let {width, height} = Dimensions.get('window')
export default class extends Component {
	static navigatorStyle = navigatorStyle;

	constructor(props){
		super(props);
		this.state = {
			
		}
	}

	componentDidMount() {
		
	}

	componentWillMount() {
		// this.props.navigator.setTitle({
		// 	title: 'Kirim Ke'
		// })
	}

	showConfirmation = () => {
		this.props.navigator.showLightBox({
			screen: 'KonfirmasiTransfer',
			style: {
				backgroundColor: '#33333380'
			}
		})
	}

	render() {

		return (
			<ScrollView style={{backgroundColor:'white'}}>		

				<View style={{backgroundColor:'whitesmoke', padding:10, paddingHorizontal:20}}>
					<SpaceBetween>
						<Text style={{fontSize:16, fontWeight:'600'}}>SALDO DavestMoney</Text>
						<Text style={{fontSize:16, fontWeight:'600'}}>Rp. 10.000</Text>
					</SpaceBetween>
				</View>

				<View style={{marginHorizontal:20}}>
					<View style={{paddingVertical:20, paddingHorizontal:10}}>
						<FloatLabelTextInput 
							autoCorrect={false} 
							placeholder="Cari" />
					</View>

					<Text style={{fontWeight:'700'}}>KONTAK SAYA</Text>

					<View style={{marginTop:20}}>
						<Text style={{fontWeight:'700'}}>Junaidi</Text>
						<Text style={{fontSize:12}}>0811xxxxxxxxx</Text>
					</View>
					<View style={{marginTop:20}}>
						<Text style={{fontWeight:'700'}}>Junaidi</Text>
						<Text style={{fontSize:12}}>0811xxxxxxxxx</Text>
					</View>
					<View style={{marginTop:20}}>
						<Text style={{fontWeight:'700'}}>Junaidi</Text>
						<Text style={{fontSize:12}}>0811xxxxxxxxx</Text>
					</View>
					<View style={{marginTop:20}}>
						<Text style={{fontWeight:'700'}}>Junaidi</Text>
						<Text style={{fontSize:12}}>0811xxxxxxxxx</Text>
					</View>
					<View style={{marginTop:20}}>
						<Text style={{fontWeight:'700'}}>Junaidi</Text>
						<Text style={{fontSize:12}}>0811xxxxxxxxx</Text>
					</View>
					<View style={{marginTop:20}}>
						<Text style={{fontWeight:'700'}}>Junaidi</Text>
						<Text style={{fontSize:12}}>0811xxxxxxxxx</Text>
					</View>
				</View>
			</ScrollView>
		);
	}
}