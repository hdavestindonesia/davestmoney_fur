import React, { Component } from 'react';
import {Text, Image, TouchableOpacity, ActivityIndicator, View, StyleSheet, ScrollView, Dimensions} from 'react-native';
import {blue, green, yellow, screenBackgroundColor, navBarHidden, WEB_BASE_URL} from '../libs/Constants';
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
	static navigatorStyle = navBarHidden;

	constructor(props){
		super(props);
		this.state = {
			
		}
	}

	componentDidMount() {
		
	}

	render() {

		return (
			<ScrollView style={{backgroundColor:'white'}}>		
				<View style={{marginTop:80}}>
					<Image
						style={{height:150, width:null, resizeMode:'contain'}}
						source={require('../assets/images/Gagal.png')}/>
				</View>

				<View style={{marginTop:50, marginHorizontal:30}}>
					<View>
						<Text style={{textAlign:'center', fontSize:18, fontWeight:'700'}}>Sistem Tidak Dapat Memproses Permintaan Anda!</Text>
					</View>

					<View style={{marginTop:100}}>
						<TouchableOpacity style={{backgroundColor:blue, borderWidth:1, borderColor:blue, marginHorizontal:30, paddingVertical:10, borderRadius:5}}>
							<Text style={{textAlign:'center', fontSize:20, fontWeight:'600', color:'white'}}>Selesai</Text>
						</TouchableOpacity>
					</View>
					<View style={{marginTop:10}}>
						<Button text={'Ulang'} />
					</View>
				</View>
				
			</ScrollView>
		);
	}
}