import React, { Component } from 'react';
import {Text, Image, TouchableOpacity, ActivityIndicator, View, StyleSheet, ScrollView, TextInput, Dimensions, Alert} from 'react-native';
import {blue, green, screenBackgroundColor, navBarHidden, WEB_BASE_URL} from '../libs/Constants';
import FloatLabelTextInput from 'react-native-floating-label-text-input'
import {postApi, postXML} from '../libs/api';
import Bold from '../components/Bold';
import Button from '../components/Button';
import SpaceBetween from '../components/SpaceBetween';
import getItem from '../libs/getItem';
import setItem from '../libs/setItem';
import moment from 'moment';
import 'moment/locale/id';
import generateCounter from '../libs/generateCounter';
import CryptoJS from 'crypto-js';
import { WebView } from 'react-native-webview';
let {width, height} = Dimensions.get('window')
import { TabNavigator, NavigationActions, StackActions } from "react-navigation";
export default class extends Component {
	static navigatorStyle = navBarHidden;

	constructor(props){
		super(props);
		this.state = {
			errMsg: '',
			token:[],
			txtValue: [null, null, null, null, null, null],
			user: this.props.navigation.state.params.user ? this.props.navigation.state.params.user : null,
			securityCode: null
		}

		this.textInputsRefs = [];
	}

	componentDidMount() {
		getItem('USER', (user) => {
			this.setState({user})
		})

		getItem('SECURITY_CODE', (securityCode) => {
			this.setState({securityCode})
		})
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

			if(id == 3){
				let otpCode = ''
				txtValue.forEach(value => {
		  		if(value){
		  			otpCode = otpCode + value
		  		}
		    })

		    if(otpCode.length == 6){
		    	this.onVerifikasi()
		    }
			}
		}else{
			txtValue[id] = null
			this.focus(id - 1);
			this.setState({txtValue, isEnableVerification:false})
		}
	}

	onVerifikasi = () => {
		let {type, onSuccess} = this.props.navigation.state.params
		let {txtValue, securityCode} = this.state

		let code = ''
		txtValue.forEach(value => {
  		if(value){
  			code = code + value
  		}
    })

    if(securityCode && securityCode != code){
    	this.setState({txtValue: [null, null, null, null, null, null]})
    	Alert.alert('Info','Security Code tidak valid!')
    }else{
    	this.setState({txtValue: [null, null, null, null, null, null]})

			this.props.navigation.dispatch(
            StackActions.pop()
          )
	    onSuccess && onSuccess(code)
    }
	}

	onAddNumber = (number) => {
		let {txtValue} = this.state

		for(let i = 0; i < txtValue.length; ++i){
  		if(!txtValue[i]){
  			txtValue[i] = number.toString()
  			break
  		}
    }

		this.setState({txtValue})

		let securityCode = ''
		txtValue.forEach(value => {
  		if(value){
  			securityCode = securityCode + value
  		}
    })

    if(securityCode.length == 6){
    	this.onVerifikasi()
    }
	}

	onDeleteNumber = () => {
		let {txtValue} = this.state

		for(let i = txtValue.length; i >= 0; --i){
  		if(txtValue[i]){
  			txtValue[i] = null
  			break
  		}
    }

		this.setState({txtValue})
	}

	goToLupaSecurityCode = () => {
		// this.props.navigator.push({
		// 	screen: 'LupaSecurityCode'
		// })

		this.props.navigation.navigate("LupaSecurityCode")
	}

	render() {
		let {txtValue, errMsg} = this.state

		let pins = [];

    for (let i = 0; i < 6; i++) {
      pins.push(
        <View key={i} style={{flex:1, marginHorizontal:5, borderBottomWidth:1, borderBottomColor:'white', padding:5}}>
					<TextInput 
          	ref={ref => (this.textInputsRefs[i] = ref)}
          	style={{fontSize:24, color:'white'}}
          	underlineColorAndroid={green}
          	value={txtValue[i] ? '*' : ''}
          	onChangeText={text => this.handleEdit(text, i)}
          	maxLength={1}
          	editable={false}
						keyboardType='phone-pad' />
				</View>
      );
    }

		return (
			<ScrollView style={{flex: 1, backgroundColor:green}}>
				<View style={{marginTop:40, margin:5}}>
					<Text style={{fontSize:16, textAlign:'center', fontWeight:'600', color:'white'}}>Masukkan Code Anda</Text>

					<View style={{flexDirection:'row', alignItems:'center', justifyContent:'center', marginHorizontal:30, marginTop:20}}>
						{pins}
					</View>

					{errMsg ? (
						<Text style={{fontSize:12, textAlign:'center', marginTop:10, color:'red'}}>{errMsg}</Text>
					) : null}

					<TouchableOpacity onPress={this.goToLupaSecurityCode} style={{marginTop:30}}>
						<Text style={{textAlign:'center', color:'white', fontSize:16}}>Lupa Security Code?</Text>
					</TouchableOpacity>

				</View>

				<View style={{marginTop:50}}>
					<View style={{flexDirection:'row'}}>
						<TouchableOpacity onPress={() => this.onAddNumber(1)}  style={{width:width/3, padding:20}}>
							<Text style={{color:'white', fontSize:24, textAlign:'center'}}>1</Text>
						</TouchableOpacity>
						<TouchableOpacity onPress={() => this.onAddNumber(2)}  style={{width:width/3, padding:20}}>
							<Text style={{color:'white', fontSize:24, textAlign:'center'}}>2</Text>
						</TouchableOpacity>
						<TouchableOpacity onPress={() => this.onAddNumber(3)}  style={{width:width/3, padding:20}}>
							<Text style={{color:'white', fontSize:24, textAlign:'center'}}>3</Text>
						</TouchableOpacity>
					</View>

					<View style={{flexDirection:'row'}}>
						<TouchableOpacity onPress={() => this.onAddNumber(4)}  style={{width:width/3, padding:20}}>
							<Text style={{color:'white', fontSize:24, textAlign:'center'}}>4</Text>
						</TouchableOpacity>
						<TouchableOpacity onPress={() => this.onAddNumber(5)}  style={{width:width/3, padding:20}}>
							<Text style={{color:'white', fontSize:24, textAlign:'center'}}>5</Text>
						</TouchableOpacity>
						<TouchableOpacity onPress={() => this.onAddNumber(6)}  style={{width:width/3, padding:20}}>
							<Text style={{color:'white', fontSize:24, textAlign:'center'}}>6</Text>
						</TouchableOpacity>
					</View>

					<View style={{flexDirection:'row'}}>
						<TouchableOpacity onPress={() => this.onAddNumber(7)}  style={{width:width/3, padding:20}}>
							<Text style={{color:'white', fontSize:24, textAlign:'center'}}>7</Text>
						</TouchableOpacity>
						<TouchableOpacity onPress={() => this.onAddNumber(8)}  style={{width:width/3, padding:20}}>
							<Text style={{color:'white', fontSize:24, textAlign:'center'}}>8</Text>
						</TouchableOpacity>
						<TouchableOpacity onPress={() => this.onAddNumber(9)}  style={{width:width/3, padding:20}}>
							<Text style={{color:'white', fontSize:24, textAlign:'center'}}>9</Text>
						</TouchableOpacity>
					</View>

					<View style={{flexDirection:'row'}}>
						<TouchableOpacity  style={{width:width/3, padding:20}}>
							<Text style={{color:'white', fontSize:24, textAlign:'center'}}></Text>
						</TouchableOpacity>
						<TouchableOpacity onPress={() => this.onAddNumber(0)}  style={{width:width/3, padding:20}}>
							<Text style={{color:'white', fontSize:24, textAlign:'center'}}>0</Text>
						</TouchableOpacity>
						<TouchableOpacity onPress={() => this.onDeleteNumber()}  style={{width:width/3, padding:20}}>
							<Text style={{color:'white', fontSize:24, textAlign:'center'}}>◀</Text>
						</TouchableOpacity>
					</View>
				</View>


				<Text style={{fontSize: 8, textAlign:'center', color:'white', marginTop: 48}}>v 0.0.1</Text>

			</ScrollView>
		);
	}
}