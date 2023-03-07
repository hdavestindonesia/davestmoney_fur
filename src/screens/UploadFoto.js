import React, { Component } from 'react';
import {NativeModules, Text, Image, TouchableOpacity, ActivityIndicator, View, StyleSheet, ScrollView, Dimensions, Alert, PermissionsAndroid} from 'react-native';
import {blue, green, yellow, screenBackgroundColor, navigatorStyle, WEB_BASE_URL} from '../libs/Constants';
import FloatLabelTextInput from 'react-native-floating-label-text-input'
import {getApi, postApi} from '../libs/api';
import Bold from '../components/Bold';
import Button from '../components/Button';
import SpaceBetween from '../components/SpaceBetween';
import getItem from '../libs/getItem';
import chunk from 'chunk';
import SwitchSelector from '../components/SwitchSelector';
import DropDownList from '../components/DropDownList';
import generateCounter from '../libs/generateCounter';
import CryptoJS from 'crypto-js';
import moment from 'moment';
import 'moment/locale/id';
import base64url from 'base64-url'
import RNFetchBlob from 'react-native-fetch-blob'
import RNProgressHUB from 'react-native-progresshub';
import ImageResizer from 'react-native-image-resizer';
import Permissions from 'react-native-permissions';
import { TabNavigator, NavigationActions, StackActions } from "react-navigation";
import { WebView } from 'react-native-webview';
let {width, height} = Dimensions.get('window')

export default class extends Component {
	static navigatorStyle = navigatorStyle;

	constructor(props){
		super(props);
		this.state = {
			fotoDiri: null,
			fotoKTP: null,
			fotoDiriKTP: null,
			fotoDiriBase64: null,
			fotoKTPBase64: null,
			fotoDiriKTPBase64: null,
		}
	}

	componentDidMount() {
		
	}

	componentWillMount() {
		// this.props.navigator.setTitle({
		// 	title: 'Upload Foto'
		// })
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
									
			// 						if(type == 'fotoDiri'){
			// 							this.setState({fotoDiri: foto})

			// 							NativeModules.RNImageToBase64.getBase64String(uri, (err, base64) => {
			// 							  this.setState({fotoDiriBase64: base64url.escape(base64)})
			// 							})
			// 						}else if (type == 'fotoKTP'){
			// 							this.setState({fotoKTP: foto})

			// 							NativeModules.RNImageToBase64.getBase64String(uri, (err, base64) => {
			// 							  this.setState({fotoKTPBase64: base64url.escape(base64)})
			// 							})
			// 						}else if (type == 'fotoDiriKTP'){
			// 							this.setState({fotoDiriKTP: foto})

			// 							NativeModules.RNImageToBase64.getBase64String(uri, (err, base64) => {
			// 							  this.setState({fotoDiriKTPBase64: base64url.escape(base64)})
			// 							})
			// 						}

			// 					}else{
			// 						Alert.alert('Info', 'Ukuran Foto maksimal 2MB')
			// 					}
			// 				})
			// 				.catch((err) => {})


			// 				let foto = {
			// 					uri,
			// 					name: type + '.jpg',
			// 					tmp_name: type + '.jpg',
			// 					type: 'image/jpeg',
			// 				}
							
			// 			}
			// 		}
			// 	})



	    	this.props.navigation.navigate("SignInCode",{
						onSelected: (uri) => {

							RNFetchBlob.fs.stat(uri)
							.then((stats) => {
								if(stats.size <= 2000000){
									
									if(type == 'fotoDiri'){
										this.setState({fotoDiri: foto})

										NativeModules.RNImageToBase64.getBase64String(uri, (err, base64) => {
										  this.setState({fotoDiriBase64: base64url.escape(base64)})
										})
									}else if (type == 'fotoKTP'){
										this.setState({fotoKTP: foto})

										NativeModules.RNImageToBase64.getBase64String(uri, (err, base64) => {
										  this.setState({fotoKTPBase64: base64url.escape(base64)})
										})
									}else if (type == 'fotoDiriKTP'){
										this.setState({fotoDiriKTP: foto})

										NativeModules.RNImageToBase64.getBase64String(uri, (err, base64) => {
										  this.setState({fotoDiriKTPBase64: base64url.escape(base64)})
										})
									}

								}else{
									Alert.alert('Info', 'Ukuran Foto maksimal 2MB')
								}
							})
							.catch((err) => {})


							let foto = {
								uri,
								name: type + '.jpg',
								tmp_name: type + '.jpg',
								type: 'image/jpeg',
							}
							
						}
			})

	    } else {
	      console.log('permission denied');
	    }
	  } catch (err) {
	    console.warn(err);
	  }
	}

	goToCamera = (type) => {

		Permissions.request('camera').then(response => {
			if (response == 'authorized'){
				Permissions.request('storage').then(response => {
					if (response == 'authorized'){

						// this.props.navigator.push({
						// 	screen: 'Camera',
						// 	passProps: {
						// 		typeCamera: type == 'fotoKTP' ? 'back' : 'front',
						// 		onCapture: (data) => {
									
						// 			RNProgressHUB.showSpinIndeterminate()
						// 			ImageResizer.createResizedImage(data.path, 1280, 720, 'JPEG', 75).then((response) => {
						// 				RNProgressHUB.dismiss()
										
						// 				if(type == 'fotoDiri'){
						// 					this.setState({fotoDiri: response})
	
						// 					NativeModules.RNImageToBase64.getBase64String(response.uri, (err, base64) => {
						// 						this.setState({fotoDiriBase64: base64url.escape(base64)})
						// 					})
						// 				}else if (type == 'fotoKTP'){
						// 					this.setState({fotoKTP: response})
	
						// 					NativeModules.RNImageToBase64.getBase64String(response.uri, (err, base64) => {
						// 						this.setState({fotoKTPBase64: base64url.escape(base64)})
						// 					})
						// 				}else if (type == 'fotoDiriKTP'){
						// 					this.setState({fotoDiriKTP: response})
	
						// 					NativeModules.RNImageToBase64.getBase64String(response.uri, (err, base64) => {
						// 						this.setState({fotoDiriKTPBase64: base64url.escape(base64)})
						// 					})
						// 				}

						// 			}).catch((err) => {
										
						// 			});

						// 		}
						// 	}
						// })






						this.props.navigation.navigate("Camera",{
								typeCamera: type == 'fotoKTP' ? 'back' : 'front',
								onCapture: (data) => {
									
									RNProgressHUB.showSpinIndeterminate()
									ImageResizer.createResizedImage(data.path, 1280, 720, 'JPEG', 75).then((response) => {
										RNProgressHUB.dismiss()
										
										if(type == 'fotoDiri'){
											this.setState({fotoDiri: response})
	
											NativeModules.RNImageToBase64.getBase64String(response.uri, (err, base64) => {
												this.setState({fotoDiriBase64: base64url.escape(base64)})
											})
										}else if (type == 'fotoKTP'){
											this.setState({fotoKTP: response})
	
											NativeModules.RNImageToBase64.getBase64String(response.uri, (err, base64) => {
												this.setState({fotoKTPBase64: base64url.escape(base64)})
											})
										}else if (type == 'fotoDiriKTP'){
											this.setState({fotoDiriKTP: response})
	
											NativeModules.RNImageToBase64.getBase64String(response.uri, (err, base64) => {
												this.setState({fotoDiriKTPBase64: base64url.escape(base64)})
											})
										}

									}).catch((err) => {
										
									});

								}
						})






					}
				})
			}
    })
	}

	onKonfirmasi = () => {
		let {fotoDiriBase64, fotoKTPBase64, fotoDiriKTPBase64} = this.state
		let {data} = this.props.navigation.state.params
		let {user} = data

		generateCounter((counter) => {
			let params = {
				command : 'UPGRADEACCOUNT',
				idproduk : 'MONEY',
				counter : counter,
				no_telp : user.no_telp,
				signature : CryptoJS.SHA512(user.access_token + counter.toString()).toString(),
				datetime : moment().format('DD/MM/YYYY hh:mm:ss'),
				nomor_ktp : data.noKTP,
				nama_ktp : data.nama,
				tempat_lahir : data.tmpLahir,
				tgl_lahir : moment(data.tglLahir).format('YYYY-MM-DD'),
				alamat : data.alamat,
				foto_diri : fotoDiriBase64 ? fotoDiriBase64.replace(/\n/g, '') : '',
				foto_ktp : fotoKTPBase64 ? fotoKTPBase64.replace(/\n/g, '') : '',
				foto_diri_ktp : fotoDiriKTPBase64 ? fotoDiriKTPBase64.replace(/\n/g, '') : '',
				pekerjaan: data.pekerjaan,
				jenis_kelamin: data.jenis_kelamin,
				kewarganegaraan: data.kewarganegaraan,
			}

			postApi('', params, true, (resp) => {
				if(resp.resultcode == '0000'){
					Alert.alert('Info', resp.result)
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

	render() {
		let {fotoDiri, fotoKTP, fotoDiriKTP} = this.state
		return (
			<View style={{flex:1}}>
				<ScrollView style={{flex:1, backgroundColor:'whitesmoke', padding:20}}>
					<View style={{marginBottom:20, backgroundColor:'white', borderWidth:1, borderColor:'lightgrey'}}>
						<View style={{backgroundColor:'lightgrey', padding:5}}>
							<Text style={{textAlign:'center', color:'black'}}>Foto Diri</Text>
						</View>

						<TouchableOpacity onPress={() => this.goToCamera('fotoDiri')} style={{padding:20, alignItems:'center'}}>
							{fotoDiri ? (
								<Image
									style={{height:130, width:80}}
									source={{uri: fotoDiri.uri}} />
							) : (
								<Image
									style={{height:60, width:50}}
									source={require('../assets/images/uploadfoto.png')}/>
							)}
						</TouchableOpacity>
					</View>

					<View style={{marginBottom:20, backgroundColor:'white', borderWidth:1, borderColor:'lightgrey'}}>
						<View style={{backgroundColor:'lightgrey', padding:5}}>
							<Text style={{textAlign:'center', color:'black'}}>Foto KTP</Text>
						</View>

						<TouchableOpacity onPress={() => this.goToCamera('fotoKTP')} style={{padding:20, alignItems:'center'}}>
							{fotoKTP ? (
								<Image
									style={{height:130, width:80}}
									source={{uri: fotoKTP.uri}} />
							) : (
								<Image
									style={{height:60, width:50}}
									source={require('../assets/images/uploadfoto.png')}/>
							)}
						</TouchableOpacity>
					</View>

					<View style={{marginBottom:20, backgroundColor:'white', borderWidth:1, borderColor:'lightgrey'}}>
						<View style={{backgroundColor:'lightgrey', padding:5}}>
							<Text style={{textAlign:'center', color:'black'}}>Foto Diri Beserta KTP</Text>
						</View>

						<TouchableOpacity onPress={() => this.goToCamera('fotoDiriKTP')} style={{padding:20, alignItems:'center'}}>
							{fotoDiriKTP ? (
								<Image
									style={{height:130, width:80}}
									source={{uri: fotoDiriKTP.uri}} />
							) : (
								<Image
									style={{height:60, width:50}}
									source={require('../assets/images/uploadfoto.png')}/>
							)}
						</TouchableOpacity>
					</View>

					<View style={{marginTop:30}}>
						<Button onPress={this.onKonfirmasi} text={'Konfirmasi'} />
					</View>

					<View style={{marginBottom:100}}/>
				</ScrollView>
			</View>
		);
	}
}