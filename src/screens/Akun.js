import React, { Component } from 'react';
import {Alert, Text, Image, TouchableOpacity, ActivityIndicator, View, StyleSheet, ScrollView, Dimensions} from 'react-native';
import {blue, green, yellow, screenBackgroundColor, navigatorStyle, WEB_BASE_URL} from '../libs/Constants';
import FloatLabelTextInput from 'react-native-floating-label-text-input'
import {getApi} from '../libs/api';
import Bold from '../components/Bold';
import Button from '../components/Button';
import SpaceBetween from '../components/SpaceBetween';
import getItem from '../libs/getItem';
import chunk from 'chunk';
import logout from '../libs/logout';
import { WebView } from 'react-native-webview';
let {width, height} = Dimensions.get('window')
import { TabNavigator, NavigationActions, StackActions } from "react-navigation";
export default class extends Component {
	static navigatorStyle = navigatorStyle;

	constructor(props){
		super(props);
		this.state = {
			// user: null
			user: this.props.navigation.state.params.user ? this.props.navigation.state.params.user : null
		}
	}

	componentDidMount() {
		getItem('USER', (user) => {
			this.setState({user})
		})
	}

	componentWillMount() {
		// this.props.navigator.setTitle({
		// 	title: 'Akun'
		// })
	}

	onLogout = () => {
		logout(() => {
			// this.props.navigator.resetTo({screen: 'SignIn'})

			this.props.navigation.dispatch(
				StackActions.reset({
			  		index: 0,
			  		actions: [NavigationActions.navigate({ routeName: "SignIn" })]
				})
			)
		})
	}

	goToMenu = (screen) => {
		// this.props.navigator.push({
		// 	screen,
		// })

		// Alert.alert("tessssssssssssssssssssss",screen)

		let {user} = this.state
		this.props.navigation.navigate(screen, {
			user: user
		})
	}

	render() {
		let {user} = this.state

		if(!user){
			return <View/>
		}

		return (
			<ScrollView style={{backgroundColor:'white'}}>		

				<View style={{backgroundColor:'whitesmoke', padding:10, paddingHorizontal:20}}>
					<Text style={{fontSize:16, fontWeight:'600'}}>Akun</Text>
				</View>

				<View style={{marginHorizontal:20}}>
					<TouchableOpacity onPress={() => this.goToMenu('EditProfil')} style={{borderBottomWidth:1, borderBottomColor:'lightgrey', paddingVertical:20, paddingHorizontal:10}}>
						<View>
							<Text style={{}}>Profil</Text>
						</View>
					</TouchableOpacity>

					<TouchableOpacity onPress={() => this.goToMenu('KodePromo')} style={{borderBottomWidth:1, borderBottomColor:'lightgrey', paddingVertical:20, paddingHorizontal:10}}>
						<View>
							<Text style={{}}>Kode Promo</Text>
						</View>
					</TouchableOpacity>

					{user.jenis_user == 0 ? 
						<TouchableOpacity onPress={() => this.goToMenu('Upgrade')} style={{borderBottomWidth:1, borderBottomColor:'lightgrey', paddingVertical:20, paddingHorizontal:10}}>
							<View>
								<Text style={{}}>Upgrade DavestMoney</Text>
							</View>
						</TouchableOpacity>
						: null
					}
				</View>

				<View style={{backgroundColor:'whitesmoke', padding:10, paddingHorizontal:20}}>
					<Text style={{fontSize:16, fontWeight:'600'}}>Keamanan</Text>
				</View>

				<View style={{marginHorizontal:20}}>
					<TouchableOpacity onPress={() => this.goToMenu('SecurityCodeAnda')} style={{borderBottomWidth:1, borderBottomColor:'lightgrey', paddingVertical:20, paddingHorizontal:10}}>
						<View>
							<Text style={{}}>Ubah Security Code</Text>
						</View>
					</TouchableOpacity>
				</View>

				<View style={{backgroundColor:'whitesmoke', padding:10, paddingHorizontal:20}}>
					<Text style={{fontSize:16, fontWeight:'600'}}>Tentang</Text>
				</View>

				<View style={{marginHorizontal:20}}>
					<TouchableOpacity onPress={() => this.goToMenu('Tentang')} style={{borderBottomWidth:1, borderBottomColor:'lightgrey', paddingVertical:20, paddingHorizontal:10}}>
						<View>
							<Text style={{}}>Tentang DavestMoney</Text>
						</View>
					</TouchableOpacity>

					<TouchableOpacity onPress={() => this.goToMenu('Kebijakan')} style={{borderBottomWidth:1, borderBottomColor:'lightgrey', paddingVertical:20, paddingHorizontal:10}}>
						<View>
							<Text style={{}}>Kebijakan Privasi</Text>
						</View>
					</TouchableOpacity>


					<TouchableOpacity onPress={() => this.goToMenu('Informasi')} style={{borderBottomWidth:1, borderBottomColor:'lightgrey', paddingVertical:20, paddingHorizontal:10}}>
						<View>
							<Text style={{}}>Informasi</Text>
						</View>
					</TouchableOpacity>

					<TouchableOpacity onPress={() => this.goToMenu('FAQ')} style={{borderBottomWidth:1, borderBottomColor:'lightgrey', paddingVertical:20, paddingHorizontal:10}}>
						<View>
							<Text style={{}}>FAQ</Text>
						</View>
					</TouchableOpacity>

					<TouchableOpacity onPress={() => this.goToMenu('Saran')} style={{borderBottomWidth:1, borderBottomColor:'lightgrey', paddingVertical:20, paddingHorizontal:10}}>
						<View>
							<Text style={{}}>Pusat Bantuan</Text>
						</View>
					</TouchableOpacity>

					<TouchableOpacity onPress={() => this.goToMenu('Hubungi')} style={{borderBottomWidth:1, borderBottomColor:'lightgrey', paddingVertical:20, paddingHorizontal:10}}>
						<View>
							<Text style={{}}>Hubungi DavestMoney</Text>
						</View>
					</TouchableOpacity>

					<View style={{paddingVertical:20, paddingHorizontal:5}}>
						<Text>Version 1.0.0</Text>
					</View>
				</View>

				<View style={{marginVertical:30}}>
					<Button onPress={() => this.onLogout()} text={'Sign Out'} />
				</View>
				
				
			</ScrollView>
		);
	}
}