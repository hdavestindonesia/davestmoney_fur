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
			user: this.props.navigation.state.params.user ? this.props.navigation.state.params.user : null
		}
	}

	componentDidMount() {
		
	}

	componentWillMount() {
		// this.props.navigator.setTitle({
		// 	title: 'Semua Produk'
		// })
	}

	goToMenu = (screen) => {
		// this.props.navigator.push({
		// 	screen,
		// })

		// this.props.navigation.navigate(screen)

		let {user} = this.state
		this.props.navigation.navigate(screen, {
			user: user
		})
	}

	render() {

		return (
			<ScrollView style={{backgroundColor:'white', padding:10}}>		
				<TouchableOpacity onPress={() => this.goToMenu('PLN')} style={{paddingVertical:10, paddingHorizontal:20, borderBottomWidth:1, borderBottomColor:'lightgrey'}}>
					<Text>PLN</Text>
				</TouchableOpacity>

				<TouchableOpacity onPress={() => this.goToMenu('BPJS')} style={{paddingVertical:10, paddingHorizontal:20, borderBottomWidth:1, borderBottomColor:'lightgrey'}}>
					<Text>BPJS</Text>
				</TouchableOpacity>

				<TouchableOpacity onPress={() => this.goToMenu('Pulsa')} style={{paddingVertical:10, paddingHorizontal:20, borderBottomWidth:1, borderBottomColor:'lightgrey'}}>
					<Text>PULSA</Text>
				</TouchableOpacity>

				<TouchableOpacity onPress={() => this.goToMenu('Telkom')} style={{paddingVertical:10, paddingHorizontal:20, borderBottomWidth:1, borderBottomColor:'lightgrey'}}>
					<Text>Telkom</Text>
				</TouchableOpacity>

				<TouchableOpacity onPress={() => this.goToMenu('Game')} style={{paddingVertical:10, paddingHorizontal:20, borderBottomWidth:1, borderBottomColor:'lightgrey'}}>
					<Text>Game</Text>
				</TouchableOpacity>

				<TouchableOpacity onPress={() => this.goToMenu('PDAM')} style={{paddingVertical:10, paddingHorizontal:20, borderBottomWidth:1, borderBottomColor:'lightgrey'}}>
					<Text>PDAM</Text>
				</TouchableOpacity>

				<TouchableOpacity onPress={() => this.goToMenu('TVKabel')} style={{paddingVertical:10, paddingHorizontal:20, borderBottomWidth:1, borderBottomColor:'lightgrey'}}>
					<Text>TV Kabel</Text>
				</TouchableOpacity>

				<TouchableOpacity onPress={() => this.goToMenu('MultiFinance')} style={{paddingVertical:10, paddingHorizontal:20, borderBottomWidth:1, borderBottomColor:'lightgrey'}}>
					<Text>Multifinance</Text>
				</TouchableOpacity>
			</ScrollView>
		);
	}
}