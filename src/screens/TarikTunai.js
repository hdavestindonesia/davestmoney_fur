import React, { Component } from 'react';
import {Text, Image, TouchableOpacity, ActivityIndicator, View, StyleSheet, ScrollView, Dimensions, Alert} from 'react-native';
import {blue, green, yellow, screenBackgroundColor, navigatorStyle, WEB_BASE_URL} from '../libs/Constants';
import FloatLabelTextInput from 'react-native-floating-label-text-input'
import {postApi} from '../libs/api';
import Bold from '../components/Bold';
import Button from '../components/Button';
import SpaceBetween from '../components/SpaceBetween';
import getItem from '../libs/getItem';
import chunk from 'chunk';
import SwitchSelector from '../components/SwitchSelector';
import DropDownList from '../components/DropDownList';
import moment from 'moment';
import 'moment/locale/id';
import generateCounter from '../libs/generateCounter';
import CryptoJS from 'crypto-js';
import Rupiah from '../libs/Rupiah';

let {width, height} = Dimensions.get('window')
import { TabNavigator, NavigationActions, StackActions } from "react-navigation";
import { WebView } from 'react-native-webview';
const selectorOptions = [
	{
		label: 'Penarikan Tunai', value: 0
	},
	{
		label: 'Terima Penarikan', value: 1
	}
]

export default class extends Component {
	static navigatorStyle = navigatorStyle;

	constructor(props){
		super(props);
		this.state = {
			switchSelected: 0,
			user: this.props.navigation.state.params.user ? this.props.navigation.state.params.user : null,
			tarikTunaiOptions: [],
			tarikTunaiList: []
		}
	}

	componentDidMount() {
		getItem('USER', (user) => {
			this.setState({user: user}, () => {
				this.getOptions()
				this.getListTarikTunai()
			})
		})
	}

	componentWillMount() {
		// this.props.navigator.setTitle({
		// 	title: 'Tarik Tunai'
		// })
	}

	getOptions = () => {
		let {user} = this.state
		generateCounter((counter) => {
			let params = {
				command : 'GETTARIKTUNAIOPTIONS',
				idproduk : 'MONEY',
				counter : counter,
				no_telp : user.no_telp,
				signature : CryptoJS.SHA512(user.access_token + counter.toString()).toString(),
				datetime : moment().format('DD/MM/YYYY hh:mm:ss'),
			}

			postApi('', params, true, (resp) => {
				if(resp.resultcode == '0000'){
					this.setState({tarikTunaiOptions: resp.options_list})
				}else{
					Alert.alert('Info', resp.result)
				}
			})
		})
	}

	getListTarikTunai = () => {
		let {user} = this.state
		generateCounter((counter) => {
			let params = {
				command : 'GETTARIKTUNAILIST',
				idproduk : 'MONEY',
				counter : counter,
				no_telp : user.no_telp,
				signature : CryptoJS.SHA512(user.access_token + counter.toString()).toString(),
				datetime : moment().format('DD/MM/YYYY hh:mm:ss'),
			}

			postApi('', params, true, (resp) => {
				if(resp.resultcode == '0000'){
					this.setState({tarikTunaiList: resp.tariktunai_list})
				}else{
					Alert.alert('Info', resp.result)
				}
			})
		})
	}

	goToDetail = (data) => {
		// this.props.navigator.push({
		// 	screen: 'TarikTunaiDetail',
		// 	passProps: {
		// 		data,
		// 		onSuccess: () => {
		// 			this.getListTarikTunai()
		// 		}
		// 	}
		// })


		this.props.navigation.navigate("TarikTunaiDetail",{
			data,
			onSuccess: () => {
				this.getListTarikTunai()
			}
		})
	}

	onLihat = (data) => {
		// this.props.navigator.push({
		// 	screen: 'LihatTarikTunai',
		// 	passProps: {
		// 		data
		// 	}
		// })

		this.props.navigation.navigate("LihatTarikTunai",{
			data
		})
	}

	onBatal = (data) => {

		Alert.alert('Info', 'Apakah Anda yakin ingin membatalkannya?', [{
			text: 'Tidak'
		}, {
			text: 'Ya',
			onPress: () => {
				this.processBatal(data)
			}
		}])

	}

	processBatal = (data) => {
		let {user} = this.state

		generateCounter((counter) => {
			let params = {
				command : 'CANCELTARIKTUNAI',
				idproduk : 'MONEY',
				counter : counter,
				no_telp : user.no_telp,
				signature : CryptoJS.SHA512(user.access_token + counter.toString()).toString(),
				datetime : moment().format('DD/MM/YYYY hh:mm:ss'),
				kode_tariktunai : data.kode
			}

			postApi('', params, true, (resp) => {
				if(resp.resultcode == '0000'){
					this.getListTarikTunai()
				}else{
					Alert.alert('Info', resp.result)
				}
			})
		})
	}

	render() {
		let {switchSelected, tarikTunaiOptions, tarikTunaiList, user} = this.state

		if(!user){
			return null
		}

		return (
			<ScrollView style={{backgroundColor:'white'}}>		

				<View style={{backgroundColor:'whitesmoke', padding:10, paddingHorizontal:20}}>
					<SpaceBetween>
						<Text style={{fontSize:16, fontWeight:'600'}}>SALDO DavestMoney</Text>
						<Text style={{fontSize:16, fontWeight:'600'}}>{Rupiah(user.sisasaldo)}</Text>
					</SpaceBetween>
				</View>

				{/* 
				<View style={{paddingVertical:20, paddingHorizontal:40, borderBottomWidth:2, borderBottomColor:'lightgrey'}}>
					<SwitchSelector backgroundColor={'whitesmoke'} borderColor={'grey'} buttonColor={yellow} selectedColor={'white'} textColor={'grey'} options={selectorOptions} initial={0} onPress={(value) => this.setState({switchSelected: value})} />
				</View>
				*/}

				{switchSelected == 0 && 
					<View>
						<View style={{padding:20, borderBottomWidth:2, borderBottomColor:'lightgrey'}}>
							<View>

								{tarikTunaiOptions.map((data, i) => (
									<TouchableOpacity key={i} onPress={() => this.goToDetail(data)} style={{marginHorizontal:20, marginVertical:10, borderWidth:1, borderColor:'lightgrey', paddingVertical:10, paddingHorizontal:10}}>
										<SpaceBetween>
											<View style={{flexDirection:'row', alignItems:'center'}}>
												{data.logo_image ? 
													<Image
														style={{height:30, width:30, resizeMode:'contain'}}
														source={{uri: data.logo_image}} />
													: null
												}
												<Text style={{fontSize:14, marginLeft:10}}>{data.nama}</Text>
											</View>

											<View>
												<Text style={{fontSize:20}}>></Text>
											</View>
										</SpaceBetween>
									</TouchableOpacity>
								))}

							</View>
						</View>

						<View style={{marginHorizontal:10, marginTop:20}}>
							<Text style={{color:'black', fontWeight:'700'}}>List Penarikan</Text>

							{tarikTunaiList.map((data, i) => (
								<View key={i} style={{borderWidth:1, borderColor:'lightgrey', paddingVertical:20, paddingHorizontal:10, marginTop:10}}>
									<SpaceBetween>
										<View>
											<Text style={{fontWeight:'700', color:'black'}}>Penarikan {Rupiah(data.nominal)}</Text>
											<Text style={{fontSize:10}}>Berlaku Hingga</Text>
											<Text style={{fontSize:10}}>{moment(data.berlaku_sampai).format('DD/MM/YYYY hh:mm:ss')}</Text>
										</View>

										<View>
											<Text style={{fontWeight:'700', color:blue}}>
												<Text onPress={() => this.onLihat(data)}>Lihat   </Text>
												<Text onPress={() => this.onBatal(data)}>   Batalkan</Text>
											</Text>
										</View>
									</SpaceBetween>
								</View>
							))}
							
						</View>
					</View>
				}

				{switchSelected == 1 && 
					<View style={{marginHorizontal:20}}>
						<View style={{paddingVertical:20, paddingHorizontal:10}}>
							<FloatLabelTextInput 
								autoCorrect={false} 
								placeholder="Nominal" />
						</View>

						<View style={{paddingVertical:20, paddingHorizontal:10}}>
							<FloatLabelTextInput 
								autoCorrect={false} 
								placeholder="Keterangan" />
						</View>

						<Button text={'Proses'} />
					</View>
				}
			</ScrollView>
		);
	}
}