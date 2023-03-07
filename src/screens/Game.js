import React, { Component } from 'react';
import {Text, Image, TouchableOpacity, ActivityIndicator, View, StyleSheet, ScrollView, Dimensions, Alert} from 'react-native';
import {blue, green, yellow, screenBackgroundColor, navigatorStyle, WEB_BASE_URL} from '../libs/Constants';
import FloatLabelTextInput from 'react-native-floating-label-text-input'
import {postXML} from '../libs/api';
import Bold from '../components/Bold';
import Button from '../components/Button';
import SpaceBetween from '../components/SpaceBetween';
import getItem from '../libs/getItem';
import chunk from 'chunk';
import DropDownList from '../components/DropDownList';
import Rupiah from '../libs/Rupiah';
import xml2js from 'react-native-xml2js'
import moment from 'moment';
import 'moment/locale/id';
import generateCounter from '../libs/generateCounter';
import CryptoJS from 'crypto-js';
let {width, height} = Dimensions.get('window')
import { TabNavigator, NavigationActions, StackActions } from "react-navigation";
let optionsJmlBln = [
	{
		label: '1 Bulan',
		value: 1
	},
	{
		label: '2 Bulan',
		value: 2
	},
	{
		label: '3 Bulan',
		value: 3
	},
	{
		label: '4 Bulan',
		value: 4
	},
	{
		label: '5 Bulan',
		value: 5
	},
]

export default class extends Component {
	static navigatorStyle = navigatorStyle;

	constructor(props){
		super(props);
		this.state = {
			user: this.props.navigation.state.params.user ? this.props.navigation.state.params.user : null,
			virtualAccount: null,
			jmlBln: null
		}
	}

	componentDidMount() {
		getItem('USER', (user) => {
			this.setState({user: user})
		})
	}

	componentWillMount() {
		// this.props.navigator.setTitle({
		// 	title: 'Game'
		// })
	}

	showConfirmation = () => {
		this.props.navigator.showLightBox({
			screen: 'KonfirmasiPembayaran',
			passProps: {
				user
			},
			style: {
				backgroundColor: '#33333380'
			}
		})
	}

	onProses = () => {
		let {user, virtualAccount, jmlBln} = this.state

		//let xml = '<?xml version="1.0"?><posh><command>INQUIRY</command><idagen>081242085613</idagen><nova>0007463031563869</nova><jmlbln>2</jmlbln><counter>12513</counter><pin>4701309272e8bfd673badc2c0a534935</pin><idproduk>BPJSKS</idproduk></posh>'

		generateCounter((counter) => {
			let params = {
				command : 'INQUIRY', 
				idagen : user.no_telp, 
				nova : virtualAccount,
				jmlbln : jmlBln,
				counter : counter, 
				pin : CryptoJS.SHA512(user.access_token + counter.toString()).toString(),
				idproduk : 'BPJSKS'
			}

			var builder = new xml2js.Builder({rootName: 'posh'});
			var xml = builder.buildObject(params);

			postXML('', xml, true, (resp) => {
				if(resp.posh.resultcode[0] == '0000'){
					
					let data = resp.posh
					data.jmlBln = jmlBln
					data.counter = counter

					this.props.navigator.showLightBox({
						screen: 'KonfirmasiBPJS',
						passProps: {
							data: data,
							user
						},
						style: {
							backgroundColor: '#33333380'
						}
					})
				}else{
					Alert.alert('Info', resp.posh.result[0])
				}
			})
		})
	}

	onCallback = (resp) => {
		console.log(resp)
	}

	onError = () => {

	}

	render() {
		let {user, virtualAccount, jmlBln} = this.state

		if(!user){
			return null
		}

		return (
			<ScrollView style={{backgroundColor:'white', padding:20}}>
				
			</ScrollView>
		);
	}
}