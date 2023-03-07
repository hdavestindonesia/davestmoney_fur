import React, { Component } from 'react';
import {Text, Image, TouchableOpacity, ActivityIndicator, View, StyleSheet, ScrollView, Dimensions, Alert} from 'react-native';
import {blue, green, yellow, screenBackgroundColor, navBarHidden, WEB_BASE_URL} from '../libs/Constants';
import FloatLabelTextInput from 'react-native-floating-label-text-input'
import {postXML} from '../libs/api';
import Bold from '../components/Bold';
import Button from '../components/Button';
import SpaceBetween from '../components/SpaceBetween';
import getItem from '../libs/getItem';
import chunk from 'chunk';
import {Navigation} from 'react-native-navigation'
import Rupiah from '../libs/Rupiah';
import xml2js from 'react-native-xml2js'
import moment from 'moment';
import 'moment/locale/id';
import generateCounter from '../libs/generateCounter';
import CryptoJS from 'crypto-js';
// import QRCode from 'react-native-qrcode';
import QRCode from 'react-native-qrcode-svg';
import { TabNavigator, NavigationActions, StackActions } from "react-navigation";
import { WebView } from 'react-native-webview';
let {width, height} = Dimensions.get('window')

export default class extends Component {

	constructor(props){
		super(props);
		this.state = {
			
		}
	}

	componentDidMount() {
		
	}

	componentWillMount() {
		
	}

	render() {
		let {qrcode} = this.props.navigation.state.params
		return (
			<View style={{width:width-40, backgroundColor:'white', justifyContent: 'center'}}>		
				<View style={{alignItems:'center', padding:10}}>
          <QRCode
            value={qrcode}
            size={200}
            bgColor='black'
            fgColor='white'/>
        </View>

        <TouchableOpacity onPress={() => Navigation.dismissLightBox()} style={{backgroundColor:blue, padding:10}}>
          <Text style={{textAlign:'center', color:'white'}}>Tutup</Text>
        </TouchableOpacity>
			</View>
		);
	}
}