import React, { Component } from 'react';
import {Text, Image, TouchableOpacity, ActivityIndicator, View, StyleSheet, ScrollView, Dimensions, Alert, TextInput} from 'react-native';
import {blue, green, yellow, screenBackgroundColor, navigatorStyle, WEB_BASE_URL} from '../libs/Constants';
import FloatLabelTextInput from 'react-native-floating-label-text-input'
import {postApi} from '../libs/api';
import Bold from '../components/Bold';
import Button from '../components/Button';
import SpaceBetween from '../components/SpaceBetween';
import getItem from '../libs/getItem';
import chunk from 'chunk';
import moment from 'moment';
import 'moment/locale/id';
import generateCounter from '../libs/generateCounter';
import CryptoJS from 'crypto-js';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { TabNavigator, NavigationActions, StackActions } from "react-navigation";
import { WebView } from 'react-native-webview';
let {width, height} = Dimensions.get('window')

const typeOptions = [
  {label: 'Saran', value: 0 },
  {label: 'Pertanyaan', value: 1 },
  {label: 'Keluhan', value: 2 }
];

const typePriority = [
	{label: 'High', value: 3 },
	{label: 'Medium', value: 2 },
	{label: 'Low', value: 1 }
  ];

export default class extends Component {
	static navigatorStyle = navigatorStyle;

	constructor(props){
		super(props);
		this.state = {
			user: this.props.navigation.state.params.user ? this.props.navigation.state.params.user : null,
			type: 0,
			type_priority:1,
			subject: null,
			pesan: null
		}
	}

	componentDidMount() {
		getItem('USER', (user) => {
			this.setState({user: user})
		})
	}

	componentWillMount() {
		// this.props.navigator.setTitle({
		// 	title: 'Saran'
		// })
	}

	onKirim = () => {
		let {user, subject, type, pesan, type_priority} = this.state

		if(!subject || !pesan){
			Alert.alert('Info', 'Harap isikan Subject dan Pesan!')
			return
		}

		generateCounter((counter) => {
			let params = {
				command : 'SARANPERTANYAAN',
				idproduk : 'MONEY',
				counter : counter,
				no_telp : user.no_telp,
				signature : CryptoJS.SHA512(user.access_token + counter.toString()).toString(),
				datetime : moment().format('DD/MM/YYYY hh:mm:ss'),
				tipe: type,
				priority: type_priority,
				subjek: subject,
				teks: pesan
			}

			postApi('', params, true, (resp) => {
				this.setState({subject:null, pesan: null})
				if(resp.resultcode == '0000'){
					Alert.alert('Info', 'Saran Anda sudah terkirim')
				}else{
					Alert.alert('Info', resp.result)
				}
			})
		})
	}

	render() {
		let {subject, type, pesan} = this.state
		return (
			<ScrollView style={{flex:1, backgroundColor:'white', padding:20}}>		
				<FloatLabelTextInput 
					onChangeTextValue={(subject) => this.setState({subject})}
					autoCorrect={false} 
					value={subject}
					placeholder="Subjek" />

				<View style={{alignItems:'center', marginTop:20, padding:10}}>
					<RadioForm
						radio_props={typeOptions}
						formHorizontal={true}
						labelColor={'grey'}
						selectedLabelColor={'grey'}
						buttonColor={blue}
						selectedButtonColor={blue}
						labelStyle={{marginRight:20}}
						initial={0}
						onPress={(value) => {this.setState({type:value})}} />
        		</View>

				<View style={{alignItems:'center', marginTop:20, padding:10}}>
					<RadioForm
						radio_props={typePriority}
						formHorizontal={true}
						labelColor={'grey'}
						selectedLabelColor={'grey'}
						buttonColor={blue}
						selectedButtonColor={blue}
						labelStyle={{marginRight:20}}
						initial={0}
						onPress={(value) => {this.setState({type_priority:value})}} />
        		</View>

				<View style={{marginTop:20}}>
					<TextInput
		        style={{height:90, borderRadius:5, padding:10, borderColor:'grey', borderWidth:1, fontSize:12}}
		        multiline
		        autoCorrect={false} 
		        onChangeText={(pesan) => this.setState({pesan})}
		        placeholder='Tulis pesan'
		        maxLength={200}
		        returnKeyType='go'
		        blurOnSubmit={true}
		        value={pesan} />
				</View>

				<View style={{marginTop:20}}>
					<Button onPress={() => this.onKirim()} text={'Kirim'} />
				</View>

			</ScrollView>
		);
	}
}