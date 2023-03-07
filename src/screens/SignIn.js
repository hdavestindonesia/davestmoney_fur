import React, { Component } from 'react';
import {Text, Image, TouchableOpacity, ActivityIndicator, View, StyleSheet, ScrollView, Dimensions, Alert} from 'react-native';
import {blue, green, screenBackgroundColor, navBarHidden, WEB_BASE_URL, SECRET_CODE} from '../libs/Constants';
import FloatLabelTextInput from 'react-native-floating-label-text-input'
import {postApi} from '../libs/api';
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
			noPonsel: null,
			isShowSignIn: false,
			user: null
		}
	}

	componentDidMount() {
		getItem('USER', (user) => {
			if(user){
				this.setState({user})
				
				generateCounter((counter) => {
					let params = {
						command : 'CEKSESSION',
						idproduk : 'MONEY',
						counter : counter,
						no_telp : user.no_telp, 
						signature : CryptoJS.SHA512(user.access_token + counter.toString()).toString(),
						datetime : moment().format('DD/MM/YYYY hh:mm:ss')
					}

					postApi('', params, true, (resp) => {
						if(resp.resultcode == '0000'){
							// this.props.navigator.resetTo({
							// 	screen: 'MasukkanCode',
							// 	passProps:{
							// 		type:'login',
							// 		onSuccess: (securityCode) => {
							// 			this.login(securityCode)
							// 		}
							// 	},
							// })

							this.props.navigation.dispatch(
								StackActions.reset({
							  		index: 0,
							  		actions: [NavigationActions.navigate({ 
							  			routeName: "MasukkanCode",
	                    params: {
	                        type:'login',
	                        onSuccess: (securityCode) => {
														this.login(securityCode)
													}
	                    } 
							  		})]
								})
							)
						}else{
							this.setState({isShowSignIn: true})
						}
					})
				})

			}else{
				this.setState({isShowSignIn: true})
			}
		})
	}

	login = (securityCode) => {


		let {user} = this.state
		generateCounter((counter) => {

			// Alert.alert("tesssssssssssssssssssssss")
			// Alert.alert("tessssssssssss", JSON.stringify(securityCode))

		


			let params = {
				command : 'LOGIN', 
				idproduk : 'MONEY', 
				counter : counter, 
				no_telp : user.no_telp, 
				signature : CryptoJS.SHA512(CryptoJS.SHA512(securityCode) + user.access_token + counter.toString()).toString(),
				datetime : moment().format('DD/MM/YYYY hh:mm:ss')
			}
			postApi('', params, true, (resp) => {
				// Alert.alert("resp res",JSON.stringify(resp))
				if(resp.resultcode == '0000'){
					resp.access_token = user.access_token
					setItem('USER', resp)
					setItem('SECURITY_CODE', securityCode)
					// this.props.navigator.resetTo({
					// 	screen: 'Home'
					// })

					// Alert.alert("prosese masuk")

					this.props.navigation.dispatch(
						StackActions.reset({
					  		index: 0,
					  		actions: [NavigationActions.navigate({ routeName: "Home" })]
						})
					)
				}else{
					Alert.alert('Info', resp.result)
				}
			})

		})


	}

	onSignIn = (noPonsel) => {

		if(!noPonsel){
			Alert.alert('Info', 'Harap isikan No. Ponsel')
			return
		}

		// Alert.alert("tesssssssssss")
		// var sha = CryptoJS.SHA512(SECRET_CODE + counter.toString()).toString()
		// Alert.alert(sha)

		// generateCounter((counter) => {
		// 	Alert.alert("counter",JSON.stringify(counter))
		// })


		generateCounter((counter) => {

			let params = {
				command : 'GETOTP',
				idproduk : 'MONEY',
				counter : counter,
				no_telp : noPonsel, 
				signature : CryptoJS.SHA512(SECRET_CODE + counter.toString()).toString(),
				datetime : moment().format('DD/MM/YYYY hh:mm:ss'),
				tipe_otp : 1
			}
			//////////////////////////////////////////////
			postApi('', params, true, (resp) => {

				// Alert.alert("respresp",JSON.stringify(resp))

				if(resp.resultcode == '0000'){
					// this.props.navigator.push({
					// 	screen: 'SignInCode',
					// 	passProps: {
					// 		type: 'login',
					// 		noPonsel,
					// 		durasi_otp: resp.durasi_otp
					// 	}
					// })

					this.props.navigation.navigate("SignInCode",{
						type: 'login',
						noPonsel,
						durasi_otp: resp.durasi_otp,

						tes: "aaaaaaaaaaaaabbbbbbbcccc"
					})

				}else{
					Alert.alert('Info', resp.result)
				}

			})

		})
	}

	onHubungiKami = () => {

		this.props.navigation.navigate("Hubungi")

		// this.props.navigator.push({
    //   id: 'Hubungi'
    // });

	}

	onDaftar = () => {
		this.props.navigation.navigate("SyaratKetentuan")

		// this.props.navigator.push({
    //   id: 'SyaratKetentuan'
    // });
	}

	render() {
		let {noPonsel, isShowSignIn} = this.state

		if(!isShowSignIn){
			return null
		}

		return (
			<View style={{flex:1, alignItems:'stretch', justifyContent:'center'}}>

				<View style={{position:'absolute', top:0, bottom:0, left:0, right:0, height:height}}>
					<View style={{height:height/2, backgroundColor:green, alignItems:'center'}}>
						<View style={{marginTop:height/8}}>
							<Image
							  style={{height:26, width:250}}
							  source={require('../assets/images/logo_white.png')}/>
						</View>
					</View>

					<View style={{height:height/2, backgroundColor:'white'}}>
					</View>
				</View>

				<View>
					<ScrollView>
						<View style={{backgroundColor:'white', borderWidth:1, borderColor:'lightgrey', marginHorizontal:20, padding: 20, borderRadius: 18}}>
							<View style={{flexDirection:'row', alignItems:'center'}}>
								<View style={{flex:2}}>
									<Image
									  style={{height:50, width:50, tintColor:'grey'}}
									  source={require('../assets/images/phone.png')}/>
								</View>

								<View style={{flex:8}}>
									<FloatLabelTextInput 
										value={noPonsel}
										onChangeTextValue={(noPonsel) => this.setState({noPonsel: noPonsel.replace(/[^0-9]/g, '')})}
										onBlur={() => this.setState({noPonsel: noPonsel.replace(/[^0-9]/g, '')})}
										autoCorrect={false} 
										keyboardType={'phone-pad'}
										placeholder="Masukkan No. Ponsel" />
								</View>
							</View>
		 
							<View style={{marginTop:30}}>
								<Button onPress={() => this.onSignIn(noPonsel)} text={'Sign In'} backgroundColor={'white'} textColor={blue} />
							</View>

							<View style={{marginTop:40, flexDirection:'row'}}>
								<View style={{flex:4, marginTop:10}}>
									<View style={{borderWidth:1, borderColor:'black'}} />
								</View>
								<Text style={{flex:2, textAlign:'center', fontSize:16, color:'black', backgroundColor:'white'}}>Atau</Text>
								<View style={{flex:4, marginTop:10}}>
									<View style={{borderWidth:1, borderColor:'black'}} />
								</View>
							</View>

							<View style={{marginTop:30}}>
								<Button onPress={() => this.onDaftar()} text={'Daftar'} />
							</View>

							<View style={{marginTop:20,alignItems: 'flex-end', flexDirection:'row',marginHorizontal:20}}>
								<TouchableOpacity onPress={this.onHubungiKami} style={{paddingTop:7}}>
									<Text style={{color:blue,alignItems: 'flex-end', fontSize:15}}>Hubungi Kami</Text>
								</TouchableOpacity>
							</View>
						</View>
					</ScrollView>
				</View>

				<Text style={{fontSize: 8, textAlign:'center', color:'black', marginTop: 68}}>v 0.0.1</Text>

			</View>
		);
	}
}