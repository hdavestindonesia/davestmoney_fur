import React, { Component } from 'react';
import {Text, Image, TouchableOpacity, ActivityIndicator, View, StyleSheet, ScrollView} from 'react-native';
import {blue, green, screenBackgroundColor, navigatorStyle, WEB_BASE_URL} from '../libs/Constants';
import FloatLabelTextInput from 'react-native-floating-label-text-input'
import {getApi} from '../libs/api';
import Bold from '../components/Bold';
import Button from '../components/Button';
import SpaceBetween from '../components/SpaceBetween';
import getItem from '../libs/getItem';
import { TabNavigator, NavigationActions, StackActions } from "react-navigation";
import { WebView } from 'react-native-webview';
import Checkmark from '../components/Checkmark';
export default class extends Component {
	static navigatorStyle = navigatorStyle;

	constructor(props){
		super(props);
		this.state = {
			isConfirmed: false
		}
	}

	componentDidMount() {
		
	}

	componentWillMount() {
		// this.props.navigator.setTitle({
		// 	title: 'DAFTAR'
		// })
	}

	onSignIn = () => {
		// this.props.navigator.resetTo({
		// 	screen: 'SignIn',
		// })

			this.props.navigation.dispatch(
				StackActions.reset({
			  		index: 0,
			  		actions: [NavigationActions.navigate({ routeName: "SignIn" })]
				})
			)
	}

	render() {
		let {isConfirmed} = this.state
		return (
			<ScrollView style={{margin:20}}>
				<Text style={{fontSize:20, fontWeight:'600'}}>Selamat!</Text>

				<Text style={{fontSize:16}}>Email dan Nomor Ponsel Anda telah terdaftar. Silahkan Sign In untuk masuk</Text>

				<View style={{marginTop:100}}>
					<Button onPress={() => this.onSignIn()} text={'Sign In'} />
				</View>

			</ScrollView>
		);
	}
}