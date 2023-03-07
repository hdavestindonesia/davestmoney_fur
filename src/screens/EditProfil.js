import React, { Component } from 'react';
import {NativeModules, Text, Image, TouchableOpacity, ActivityIndicator, View, StyleSheet, ScrollView, Dimensions, Alert, PermissionsAndroid} from 'react-native';
import {blue, green, yellow, screenBackgroundColor, navigatorStyle, WEB_BASE_URL} from '../libs/Constants';
import FloatLabelTextInput from 'react-native-floating-label-text-input'
import {getApi, postApi} from '../libs/api';
import Bold from '../components/Bold';
import Button from '../components/Button';
import SpaceBetween from '../components/SpaceBetween';
import getItem from '../libs/getItem';
import setItem from '../libs/setItem';
import chunk from 'chunk';
import generateCounter from '../libs/generateCounter';
import CryptoJS from 'crypto-js';
import moment from 'moment';
import 'moment/locale/id';
import {clone} from 'lodash'
import base64url from 'base64-url'
import MyWebView from 'react-native-webview-autoheight'
import CookieManager from 'react-native-cookies';
import RNFetchBlob from 'react-native-fetch-blob'
// import QRCode from 'react-native-qrcode';
import QRCode from 'react-native-qrcode-svg';

let {width, height} = Dimensions.get('window')
import { TabNavigator, NavigationActions, StackActions } from "react-navigation";
import { WebView } from 'react-native-webview';
export default class extends Component {
	static navigatorStyle = navigatorStyle;

	constructor(props){
		super(props);
		this.state = {
			user: this.props.navigation.state.params.user ? this.props.navigation.state.params.user : null,
			access_token: null,
			nama: null,
			email: null,
			foto: null,
			fotoBase64: null,
			isProfilePicExists: true,
			isHideMobile: true,
			isHideEmail: true
		}

		// Alert.alert("tes masuk")
	}

	componentDidMount() {

		CookieManager.clearAll()
		  .then((res) => {
		    getItem('USER', (user) => {
					getItem('ACCESS_TOKEN', (access_token) => {
						this.setState({access_token: access_token})

						// Alert.alert("tes ts tes"+user, JSON.stringify(user))

						// this.getBase64('http://209.97.167.125/money_profile/085692277825.jpg', (resp) => {
						// 	this.setState({fotoBase64: resp.replace("data:image/jpeg;base64,", '')})
						// })
					})
				})
		});
	
	}

	getBase64 = (url, cb) => {
		var xhr = new XMLHttpRequest();
	  xhr.onload = function() {
	    var reader = new FileReader();
	    reader.onloadend = function() {
	      cb(reader.result)
	    }
	    reader.readAsDataURL(xhr.response);
	  };
	  xhr.open('GET', url);
	  xhr.responseType = 'blob';
	  xhr.send();
	}

	componentWillMount() {
		// this.props.navigator.setTitle({
		// 	title: 'Edit Profil'
		// })
	}

	goToMenu = (screen) => {
		let {user} = this.state
		if(screen == 'UbahNomorHandphone'){
			// this.props.navigator.push({
			// 	screen,
			// 	passProps: {
			// 		noPonsel: user.no_telp
			// 	}
			// })

			this.props.navigation.navigate(screen,{
				noPonsel: user.no_telp
			})
		}else if(screen == 'UbahAlamatEmail'){
			// this.props.navigator.push({
			// 	screen,
			// 	passProps: {
			// 		email: user.email
			// 	}
			// })

			this.props.navigation.navigate(screen,{
				email: user.email
			})
		}else if(screen == 'VerifikasiEmail'){
			// this.props.navigator.push({
			// 	screen,
			// 	passProps: {
			// 		email: user.email
			// 	}
			// })


			this.props.navigation.navigate(screen,{
				email: user.email
			})



		}
	}

	ubahProfil = (key, value) => {
		let user = clone(this.state.user)
		user[key] = value
		this.setState({ user })
	}

	onGetFoto = async (type) => {

		try {
	    const granted = await PermissionsAndroid.request(
	      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
	      {
	        title: 'Ambil foto',
	        message: 'Ambil foto',
	        buttonNeutral: 'Ask Me Later',
	        buttonNegative: 'Cancel',
	        buttonPositive: 'OK',
	      },
	    );
	    if (granted === PermissionsAndroid.RESULTS.GRANTED || granted === true) {
	      
	    	// this.props.navigator.push({
			// 		screen: 'MediaPicker',
			// 		passProps: {
			// 			onSelected: (uri) => {

			// 				RNFetchBlob.fs.stat(uri)
			// 				.then((stats) => {
			// 					if(stats.size <= 2000000){
			// 						let foto = {
			// 							uri,
			// 							name: type + '.jpg',
			// 							tmp_name: type + '.jpg',
			// 							type: 'image/jpeg',
			// 						}

			// 						NativeModules.RNImageToBase64.getBase64String(uri, (err, base64) => {
			// 						  this.setState({foto, fotoBase64: base64url.escape(base64)})
			// 						})
			// 					}else{
			// 						Alert.alert('Info', 'Ukuran Foto maksimal 2MB')
			// 					}
			// 				})
			// 				.catch((err) => {})
							
			// 			}
			// 		}
			// 	})

	    	this.props.navigation.navigate("MediaPicker",{
						onSelected: (uri) => {

							RNFetchBlob.fs.stat(uri)
							.then((stats) => {
								if(stats.size <= 2000000){
									let foto = {
										uri,
										name: type + '.jpg',
										tmp_name: type + '.jpg',
										type: 'image/jpeg',
									}

									NativeModules.RNImageToBase64.getBase64String(uri, (err, base64) => {
									  this.setState({foto, fotoBase64: base64url.escape(base64)})
									})
								}else{
									Alert.alert('Info', 'Ukuran Foto maksimal 2MB')
								}
							})
							.catch((err) => {})
							
						}
			})


	    } else {
	      console.log('permission denied');
	    }
	  } catch (err) {
	    console.warn(err);
	  }
	}

	onSimpan = () => {
		let {user, nama, fotoBase64} = this.state

		generateCounter((counter) => {
			let params = {
				command : 'EDITINFO', 
				idproduk : 'MONEY', 
				counter : counter, 
				no_telp : user.no_telp, 
				signature : CryptoJS.SHA512(user.access_token + counter.toString()).toString(),
				datetime : moment().format('DD/MM/YYYY hh:mm:ss'),
				no_telp_baru : user.no_telp,
				nama_user : user.nama_user,
				email : user.email,
				file_image : fotoBase64 ? fotoBase64.replace(/\n/g, '') : ''
			}

			postApi('', params, true, (resp) => {
				if(resp.resultcode == '0000'){

					Alert.alert('Info', resp.result)
					generateCounter((counter) => {
						let params = {
							command : 'GETINFO', 
							idproduk : 'MONEY', 
							counter : counter, 
							no_telp : user.no_telp, 
							signature : CryptoJS.SHA512(user.access_token + counter.toString()).toString(),
							datetime : moment().format('DD/MM/YYYY hh:mm:ss'),
						}

						postApi('', params, false, (resp) => {
							if(resp.resultcode == '0000'){
								resp.access_token = user.access_token
								setItem('USER', resp)
							}else{
								//Alert.alert('Info', resp.result)
							}
						})
					})
				}else{
					Alert.alert('Info', resp.result)
				}
			})
		})
	}

	showQR = (qrcode) => {
		this.props.navigator.showLightBox({
			screen: 'QRCode',
			passProps: {
				qrcode
			},
			style: {
				backgroundColor: '#33333380'
			}
		})
	}

	reverseString = (str) => {
		// Step 1. Use the split() method to return a new array
    var splitString = str.split(""); // var splitString = "hello".split("");
    // ["h", "e", "l", "l", "o"]
 
    // Step 2. Use the reverse() method to reverse the new created array
    var reverseArray = splitString.reverse(); // var reverseArray = ["h", "e", "l", "l", "o"].reverse();
    // ["o", "l", "l", "e", "h"]
 
    // Step 3. Use the join() method to join all elements of the array into a string
    var joinArray = reverseArray.join(""); // var joinArray = ["o", "l", "l", "e", "h"].join("");
    // "olleh"
    
    //Step 4. Return the reversed string
    return joinArray; // "olleh"
	}

	render() {
		let {user, foto, isProfilePicExists, fotoBase64, isHideEmail, isHideMobile} = this.state

		if(!user){
			return null
		}

		let email = user.email
		if(isHideEmail){
			if(user.email){
				let split = user.email.split('@')
				email = 'xxxxx@' + split[1]
			}
		}

		let mobile = user.no_telp
		if(isHideMobile){
			let reverse = this.reverseString(user.no_telp)
			let last4 = this.reverseString(reverse.substring(0, 4))
			let replaceStr = reverse.substring(4, 15).replace(/[0-9]/g, "x")
			mobile = replaceStr + last4
		}

		let kemitraan = ''
		if(user.jenis_user == 0){
			kemitraan = 'End User'
		}else if(user.jenis_user == 1){
			kemitraan = 'Registered User'
		}else{
			kemitraan = 'Merchant'
		}


		// Alert.alert("user",JSON.stringify(user))
		// Alert.alert("user",JSON.stringify(user.nama_user))


		return (
			<View style={{backgroundColor:'black', width: "100%", height: "100%"}}>	


				

				<TouchableOpacity onPress={() => this.onGetFoto('fotoDiri')} style={{marginTop:20}}>
					<Text style={{color:blue, textAlign:'center'}}>Ubah Foto</Text>
				</TouchableOpacity>

				<View style={{marginTop:20, marginHorizontal:20}}>

					<View>
						<Text style={{fontSize:12}}>Nama Lengkap</Text>
						<Text style={{fontSize:14}}>{user.nama_user}</Text>
					</View>
					
					<View style={{marginTop:20}}>
						<Text style={{fontSize:12}}>Kemitraan User</Text>
						<Text style={{fontSize:14}}>{kemitraan}</Text>
					</View>

					<View style={{marginTop:20}}>
						<Text style={{fontSize:12}}>No. Handphone</Text>
						<SpaceBetween style={{marginTop:10, borderBottomWidth:1, borderBottomColor:'lightgrey'}}>
							

							<View style={{flexDirection:'row', alignItems:'center'}}>
								<TouchableOpacity onPress={() => this.goToMenu('UbahNomorHandphone')}>
									<Text style={{color:blue}}>Ubah</Text>
								</TouchableOpacity>
								<TouchableOpacity onPress={() => this.setState({ isHideMobile: !isHideMobile })} style={{ marginLeft:10 }}>
									<Image style={{ height: 30, width: 30 }} source={!isHideMobile ? require('../assets/images/eye.png') : require('../assets/images/eye2.png')} />
								</TouchableOpacity>
							</View>
						</SpaceBetween>
					</View>



					<View style={{marginTop:20}}>
						<Text style={{fontSize:12}}>Email</Text>
						<SpaceBetween style={{marginTop:10, borderBottomWidth:1, borderBottomColor:'lightgrey'}}>
							<View style={{marginLeft:5}}>
								<Text style={{fontSize:16}}>{email}</Text>
							</View>

							<View style={{flexDirection:'row', alignItems:'center'}}>
								{user.email_verified == 1 ? 
									<TouchableOpacity onPress={() => this.goToMenu('UbahAlamatEmail')}>
										<Text style={{color:blue}}>Ubah</Text>
									</TouchableOpacity>
									: 
									<TouchableOpacity onPress={() => this.goToMenu('VerifikasiEmail')}>
										<Text style={{color:blue}}>Verifikasi</Text>
									</TouchableOpacity>
								}

								<TouchableOpacity onPress={() => this.setState({ isHideEmail: !isHideEmail })} style={{ marginLeft:10 }}>
									<Image style={{ height: 30, width: 30 }} source={!isHideEmail ? require('../assets/images/eye.png') : require('../assets/images/eye2.png')} />
								</TouchableOpacity>
							</View>
							
						</SpaceBetween>
					</View>


					<TouchableOpacity onPress={() => this.showQR(user.no_telp)} style={{marginTop:20, alignItems:'center', padding:10, borderWidth:1, borderColor:'lightgrey', borderRadius:5}}>
						<QRCode
				          value={user.no_telp}
				          size={100}
				          bgColor='black'
				          fgColor='white'
				        />
					</TouchableOpacity>


					
				</View>

				<View style={{marginVertical:30}}>
					<Button onPress={this.onSimpan} text={'Simpan'} />
				</View>
				
			</View>
		);



	}
}