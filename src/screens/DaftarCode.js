import React, { Component } from 'react';
import {Text, Image, TouchableOpacity, ActivityIndicator, View, StyleSheet, ScrollView, TextInput, Alert} from 'react-native';
import {blue, green, screenBackgroundColor, navigatorStyle, WEB_BASE_URL, SECRET_CODE} from '../libs/Constants';
import FloatLabelTextInput from 'react-native-floating-label-text-input'
import {postApi} from '../libs/api';
import Bold from '../components/Bold';
import Button from '../components/Button';
import SpaceBetween from '../components/SpaceBetween';
import getItem from '../libs/getItem';
import moment from 'moment';
import 'moment/locale/id';
import generateCounter from '../libs/generateCounter';
import CryptoJS from 'crypto-js';
import BottomBar from '../components/BottomBar';
import { TabNavigator, NavigationActions, StackActions } from "react-navigation";
import { WebView } from 'react-native-webview';
export default class extends Component {
	static navigatorStyle = navigatorStyle;

	constructor(props){
		super(props);
		this.state = {
			errMsg: '',
			token:[],
			txtValue: [null, null, null, null],
		}

		this.textInputsRefs = [];
	}

	componentDidMount() {
		
	}

	componentWillMount() {
		// this.props.navigator.setTitle({
		// 	title: 'DAFTAR'
		// })
	}

	focus = (id) => {
    if (id >= 0 && id < 6) {
      this.textInputsRefs[id].focus();
    }
  }

	handleEdit = (number, id) => {
		let {txtValue} = this.state
		if(number){
			txtValue[id] = number
			this.focus(id + 1);
			this.setState({txtValue})

			if(id == 5){
				let securityCode = ''
				txtValue.forEach(value => {
		  		if(value){
		  			securityCode = securityCode + value
		  		}
		    })

		    if(securityCode.length == 6){
		    	//this.onVerifikasi()
		    }
			}
		}else{
			txtValue[id] = null
			this.focus(id - 1);
			this.setState({txtValue, isEnableVerification:false})
		}
	}

	onVerifikasi = () => {
		let {daftarParam} = this.props.navigation.state.params
		let {txtValue} = this.state

		let securityCode = ''
		txtValue.forEach(value => {
  		if(value){
  			securityCode = securityCode + value
  		}
    })

    if(securityCode.length < 6){
    	Alert.alert('Info', 'Harap lengkapi Security Code Anda')
    	return
    }

		generateCounter((counter) => {
			let params = {
				command : 'REGISTRASI', 
				idproduk : 'MONEY', 
				counter : counter, 
				signature : CryptoJS.SHA512(SECRET_CODE + counter.toString()).toString(),
				datetime : moment().format('DD/MM/YYYY hh:mm:ss'),
				no_telp : daftarParam.no_telp, 
				nama_user : daftarParam.nama_user, 
				email : daftarParam.email, 
				security_code : securityCode,
			}

			postApi('', params, true, (resp) => {
				if(resp.resultcode == '0000'){
					if(resp.resultcode == '0000'){
						// this.props.navigator.push({
						// 	screen: 'DaftarBerhasil'
						// })

						this.props.navigation.navigate("DaftarBerhasil")
					}
				}else{
					this.setState({errMsg: resp.result})
				}
			})
		})
	}

	render() {
		let {txtValue, errMsg} = this.state

		let pins = [];

    for (let i = 0; i < 6; i++) {
      pins.push(
        <View key={i} style={{flex:1, marginHorizontal:10, borderBottomWidth:1, borderBottomColor:'black', padding:5}}>
					<TextInput 
          	ref={ref => (this.textInputsRefs[i] = ref)}
          	style={{fontSize:24}}
          	underlineColorAndroid={'white'}
          	value={txtValue[i]}
          	onChangeText={text => this.handleEdit(text, i)}
          	maxLength={1}
						keyboardType='phone-pad' />
				</View>
      );
    }

		return (
			<View style={{flex:1}}>
				<ScrollView style={{flex: 1}}>
					<View style={{margin:20}}>
						<Text style={{fontSize:16, textAlign:'center', fontWeight:'600', color:'black'}}>Masukkan Security Code</Text>

						<View style={{flexDirection:'row', alignItems:'center', justifyContent:'center', marginHorizontal:10, marginTop:20}}>
							{pins}
						</View>

						{errMsg ? (
							<Text style={{fontSize:12, textAlign:'center', marginTop:10, color:'red'}}>{errMsg}</Text>
						) : null}

					</View>
				</ScrollView>
				<BottomBar onPress={this.onVerifikasi} backgroundColor={blue} color={'white'} text={'Daftar'} />
			</View>
		);
	}
}