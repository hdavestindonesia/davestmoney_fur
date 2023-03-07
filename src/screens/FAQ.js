import React, { Component } from 'react';
import {Text, Image, TouchableOpacity, ActivityIndicator, View, StyleSheet, ScrollView, Alert} from 'react-native';
import {blue, green, screenBackgroundColor, navigatorStyle, WEB_BASE_URL, SECRET_CODE} from '../libs/Constants';
import FloatLabelTextInput from 'react-native-floating-label-text-input'
import {getApi, postApi} from '../libs/api';
import Bold from '../components/Bold';
import Button from '../components/Button';
import SpaceBetween from '../components/SpaceBetween';
import getItem from '../libs/getItem';
import Checkmark from '../components/Checkmark';
import generateCounter from '../libs/generateCounter';
import CryptoJS from 'crypto-js';
import moment from 'moment';
import 'moment/locale/id';
import MyWebView from 'react-native-webview-autoheight'
import { TabNavigator, NavigationActions, StackActions } from "react-navigation";
import { WebView } from 'react-native-webview';
export default class extends Component {
	static navigatorStyle = navigatorStyle;

	constructor(props){
		super(props);
		this.state = {
			user: this.props.navigation.state.params.user ? this.props.navigation.state.params.user : null,
			teks: null,
			listInfo: [],
			selectedIndex: null
		}
	}

	componentDidMount() {
		getItem('USER', (user) => {
			this.setState({user: user}, () => {
				this.getData()
			})
		})
	}

	getData = () => {
		let {user} = this.state
		generateCounter((counter) => {
			let params = {
				command : 'GETFAQ',
				idproduk : 'MONEY',
				counter : counter,
				no_telp : user.no_telp,
				signature : CryptoJS.SHA512(user.access_token + counter.toString()).toString(),
				datetime : moment().format('DD/MM/YYYY hh:mm:ss'),
			}

			postApi('', params, true, (resp) => {
				if(resp.resultcode == '0000'){
					this.setState({listInfo: resp.list_informasi})
				}else{
					Alert.alert('Info', resp.result)
				}
			})
		})
	}

	componentWillMount() {
		// this.props.navigator.setTitle({
		// 	title: 'FAQ'
		// })
	}

	render() {
		let {listInfo, selectedIndex} = this.state

		return (
			<ScrollView style={{}}>

				{listInfo.map((data, i) => (

					<View>
						<TouchableOpacity key={i} onPress={() => this.setState({selectedIndex: selectedIndex != i ? i : null})} style={{marginHorizontal:20, marginTop:20, borderWidth:1, borderColor:'lightgrey', paddingVertical:20, paddingHorizontal:10}}>
							<SpaceBetween>
								<View style={{}}>
									<Text style={{marginLeft:10}}>{data.kategori}</Text>
								</View>

								<View>
									<Text>▼</Text>
								</View>
							</SpaceBetween>
						</TouchableOpacity>

						{selectedIndex == i &&
							<View style={{paddingHorizontal:20}}>

				<WebView
			        originWhitelist={['*']}
			        source={{html: data.isi}}
			        scalesPageToFit={false}
			    />
			    
							</View>
						}
					</View>

				))}

			</ScrollView>
		);
	}
}