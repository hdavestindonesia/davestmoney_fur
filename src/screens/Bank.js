import React, { Component } from 'react';
import {Text, Image, TouchableOpacity, ActivityIndicator, View, StyleSheet, ScrollView, Dimensions} from 'react-native';
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
import { TabNavigator, NavigationActions, StackActions } from "react-navigation";
let {width, height} = Dimensions.get('window')
export default class extends Component {
	static navigatorStyle = navigatorStyle;

	constructor(props){
		super(props);
		this.state = {
			user: this.props.navigation.state.params.user ? this.props.navigation.state.params.user : null,
			bankList: [],
			key: null,
		}
	}

	componentDidMount() {
		getItem('USER', (user) => {
			this.setState({user: user}, () => {
				this.getBankList()
			})
		})
	}

	componentWillMount() {
		// this.props.navigator.setTitle({
		// 	title: 'Bank'
		// })
	}

	getBankList = () => {
		let {user} = this.state
		generateCounter((counter) => {
			let params = {
				command : 'GETBANKLIST',
				idproduk : 'MONEY',
				counter : counter,
				no_telp : user.no_telp,
				signature : CryptoJS.SHA512(user.access_token + counter.toString()).toString(),
				datetime : moment().format('DD/MM/YYYY hh:mm:ss'),
			}

			postApi('', params, true, (resp) => {
				if(resp.resultcode == '0000'){
					this.setState({bankList: resp.bank_list})
				}else{
					Alert.alert('Info', resp.result)
				}
			})
		})
	}

	onPressBank = (data) => {
		// this.props.navigator.pop()

		this.props.navigation.dispatch(
			StackActions.pop()
		)
		this.props.onChange && this.props.onChange(data)
	}

	render() {
		let {bankList} = this.state
		return (
			<ScrollView style={{flex:1, backgroundColor:'white'}}>		
				<View style={{padding:10}}>
					<FloatLabelTextInput 
						onChangeTextValue={(key) => this.setState({key})}
						autoCorrect={false} 
						placeholder="Cari" />

					{bankList.map((data, i) => (
						<TouchableOpacity key={i} onPress={() => this.onPressBank(data)} style={{padding:10, borderBottomWidth:1, borderBottomColor:'whitesmoke'}}>
							<Text style={{color:'black'}}>{data.nama_bank}</Text>
						</TouchableOpacity>
					))}
				</View>
			</ScrollView>
		);
	}
}