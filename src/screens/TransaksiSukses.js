import React, { Component } from 'react';
import {Text, Image, TouchableOpacity, ActivityIndicator, View, StyleSheet, ScrollView, Dimensions} from 'react-native';
import {blue, green, yellow, screenBackgroundColor, navBarHidden, WEB_BASE_URL} from '../libs/Constants';
import FloatLabelTextInput from 'react-native-floating-label-text-input'
import {getApi} from '../libs/api';
import Bold from '../components/Bold';
import Button from '../components/Button';
import SpaceBetween from '../components/SpaceBetween';
import getItem from '../libs/getItem';
import chunk from 'chunk';
import Rupiah from '../libs/Rupiah';
import { TabNavigator, NavigationActions, StackActions } from "react-navigation";
let {width, height} = Dimensions.get('window')
import { WebView } from 'react-native-webview';

export default class extends Component {
	static navigatorStyle = navBarHidden;

	constructor(props){
		super(props);
		this.state = {
			
		}
	}

	componentDidMount() {
		
	}

	renderPULSA = () => {
		let {data, type} = this.props.navigation.state.params
		
		return(
			<View style={{marginTop:30}}>
				<SpaceBetween style={{paddingVertical:10, paddingHorizontal:20, backgroundColor:'whitesmoke'}}>
					<Text>PULSA</Text>
					<Text style={{color:blue, fontSize:20, fontWeight:'600'}}></Text>
				</SpaceBetween>

				<SpaceBetween style={{paddingVertical:10, paddingHorizontal:20}}>
					<Text>Waktu</Text>
					<Text>{data.datetime}</Text>
				</SpaceBetween>

				<SpaceBetween style={{paddingVertical:10, paddingHorizontal:20}}>
					<Text>RefNum</Text>
					<Text>{data.billerref}</Text>
				</SpaceBetween>

				<SpaceBetween style={{paddingVertical:10, paddingHorizontal:20}}>
					<Text>Provider</Text>
					<Text style={{color:blue}}>{data.kodeoperator}</Text>
				</SpaceBetween>

				<SpaceBetween style={{paddingVertical:10, paddingHorizontal:20}}>
					<Text>Nomor Tujuan</Text>
					<Text style={{color:blue}}>{data.nohp}</Text>
				</SpaceBetween>

				<SpaceBetween style={{paddingVertical:10, paddingHorizontal:20}}>
					<Text>Nominal</Text>
					<Text style={{color:blue}}>{data.nominal}</Text>
				</SpaceBetween>

				<SpaceBetween style={{paddingVertical:10, paddingHorizontal:20}}>
					<Text>Biaya Layanan</Text>
					<Text style={{color:blue}}>{Rupiah(Number(data.admin))}</Text>
				</SpaceBetween>

				<SpaceBetween style={{paddingVertical:10, paddingHorizontal:20}}>
					<Text>Cashback</Text>
					<Text style={{color:blue}}>{Rupiah(Number(data.cashback))}</Text>
				</SpaceBetween>

				<View style={{marginTop:50}}>
					<Button onPress={() => 
						this.props.navigation.dispatch(
							StackActions.reset({
						  		index: 0,
						  		actions: [NavigationActions.navigate({ routeName: "Home" })]
							})
						)
					} text={'Selesai'} />
				</View>
			</View>
		)
	}

	renderBPJS = () => {
		let {data, type} = this.props.navigation.state.params
		
		return(
			<View style={{marginTop:30}}>
				<SpaceBetween style={{paddingVertical:10, paddingHorizontal:20, backgroundColor:'whitesmoke'}}>
					<Text>BPJS Kesehatan</Text>
					<Text style={{color:blue, fontSize:20, fontWeight:'600'}}></Text>
				</SpaceBetween>

				<SpaceBetween style={{paddingVertical:10, paddingHorizontal:20}}>
					<Text>Waktu</Text>
					<Text>{data.datetime}</Text>
				</SpaceBetween>

				<SpaceBetween style={{paddingVertical:10, paddingHorizontal:20}}>
					<Text>RefNum</Text>
					<Text>{data.refnum}</Text>
				</SpaceBetween>

				<SpaceBetween style={{paddingVertical:10, paddingHorizontal:20}}>
					<Text>No. Virtual Account</Text>
					<Text style={{color:blue}}>{data.nova}</Text>
				</SpaceBetween>

				<SpaceBetween style={{paddingVertical:10, paddingHorizontal:20}}>
					<Text>Nama Pelanggan</Text>
					<Text style={{color:blue}}>{data.namapelanggan}</Text>
				</SpaceBetween>

				{/*
				<SpaceBetween style={{paddingVertical:10, paddingHorizontal:20}}>
					<Text>Cabang</Text>
					<Text style={{color:blue}}>{data.kodecabang} {data.namacabang}</Text>
				</SpaceBetween>
				*/}

				<SpaceBetween style={{paddingVertical:10, paddingHorizontal:20}}>
					<Text>Biaya Tagihan</Text>
					<Text style={{color:blue}}>{Rupiah(Number(data.rppremi))}</Text>
				</SpaceBetween>

				<SpaceBetween style={{paddingVertical:10, paddingHorizontal:20}}>
					<Text>Biaya Layanan</Text>
					<Text style={{color:blue}}>{Rupiah(Number(data.rpadmin))}</Text>
				</SpaceBetween>

				<SpaceBetween style={{paddingVertical:10, paddingHorizontal:20}}>
					<Text>Cashback</Text>
					<Text style={{color:blue}}>{Rupiah(Number(data.cashback))}</Text>
				</SpaceBetween>

				<SpaceBetween style={{paddingVertical:10, paddingHorizontal:20}}>
					<Text>Total Bayar</Text>
					<Text style={{color:blue}}>{Rupiah(Number(data.totaltagihan))}</Text>
				</SpaceBetween>

				<View style={{marginTop:50}}>
					<Button onPress={() => 
						this.props.navigation.dispatch(
							StackActions.reset({
						  		index: 0,
						  		actions: [NavigationActions.navigate({ routeName: "Home" })]
							})
						)
					} text={'Selesai'} />
				</View>
			</View>
		)
	}

	renderPLNPOS = () => {
		let {data, type} = this.props.navigation.state.params
		
		return(
			<View style={{marginTop:30}}>
				<SpaceBetween style={{paddingVertical:10, paddingHorizontal:20, backgroundColor:'whitesmoke'}}>
					<Text>PLN POST PAID</Text>
					<Text style={{color:blue, fontSize:20, fontWeight:'600'}}></Text>
				</SpaceBetween>

				<SpaceBetween style={{paddingVertical:10, paddingHorizontal:20}}>
					<Text>Waktu</Text>
					<Text>{data.datetime}</Text>
				</SpaceBetween>

				<SpaceBetween style={{paddingVertical:10, paddingHorizontal:20}}>
					<Text>RefNum</Text>
					<Text>{data.switcherrefnum}</Text>
				</SpaceBetween>

				<SpaceBetween style={{paddingVertical:10, paddingHorizontal:20}}>
					<Text>ID Pelanggan/ID Meter</Text>
					<Text style={{color:blue}}>{data.idpel}</Text>
				</SpaceBetween>

				<SpaceBetween style={{paddingVertical:10, paddingHorizontal:20}}>
					<Text>Nama Pelanggan</Text>
					<Text style={{color:blue}}>{data.nama}</Text>
				</SpaceBetween>

				<SpaceBetween style={{paddingVertical:10, paddingHorizontal:20}}>
					<Text>Daya</Text>
					<Text style={{color:blue}}>{data.daya}</Text>
				</SpaceBetween>

				<SpaceBetween style={{paddingVertical:10, paddingHorizontal:20}}>
					<Text>Jatuh Tempo Tagihan</Text>
					<Text style={{color:blue}}>{Number(data.jatuhtempo1)}</Text>
				</SpaceBetween>

				<SpaceBetween style={{paddingVertical:10, paddingHorizontal:20}}>
					<Text>Biaya Tagihan</Text>
					<Text style={{color:blue}}>{Rupiah(Number(data.rptagihan1))}</Text>
				</SpaceBetween>

				<SpaceBetween style={{paddingVertical:10, paddingHorizontal:20}}>
					<Text>Biaya Layanan</Text>
					<Text style={{color:blue}}>{Rupiah(Number(data.admin))}</Text>
				</SpaceBetween>

				<SpaceBetween style={{paddingVertical:10, paddingHorizontal:20}}>
					<Text>Cashback</Text>
					<Text style={{color:blue}}>{Rupiah(Number(data.cashback))}</Text>
				</SpaceBetween>

				<SpaceBetween style={{paddingVertical:10, paddingHorizontal:20}}>
					<Text>Total Bayar</Text>
					<Text style={{color:blue}}>{Rupiah(Number(data.totaltagihan))}</Text>
				</SpaceBetween>

				<View style={{marginTop:50}}>
					<Button onPress={() => 
						this.props.navigation.dispatch(
							StackActions.reset({
						  		index: 0,
						  		actions: [NavigationActions.navigate({ routeName: "Home" })]
							})
						)
					} text={'Selesai'} />
				</View>
			</View>
		)
	}

	renderPLNNON = () => {
		let {data, type} = this.props.navigation.state.params
		
		return(
			<View style={{marginTop:30}}>
				<SpaceBetween style={{paddingVertical:10, paddingHorizontal:20, backgroundColor:'whitesmoke'}}>
					<Text>PLN NON TAGLIS</Text>
					<Text style={{color:blue, fontSize:20, fontWeight:'600'}}></Text>
				</SpaceBetween>

				<SpaceBetween style={{paddingVertical:10, paddingHorizontal:20}}>
					<Text>Waktu</Text>
					<Text>{data.datetime}</Text>
				</SpaceBetween>

				<SpaceBetween style={{paddingVertical:10, paddingHorizontal:20}}>
					<Text>RefNum</Text>
					<Text>{data.switcherrefnum}</Text>
				</SpaceBetween>

				<SpaceBetween style={{paddingVertical:10, paddingHorizontal:20}}>
					<Text>No Reg</Text>
					<Text style={{color:blue}}>{data.noreg}</Text>
				</SpaceBetween>

				<SpaceBetween style={{paddingVertical:10, paddingHorizontal:20}}>
					<Text>Nama Pelanggan</Text>
					<Text style={{color:blue}}>{data.nama}</Text>
				</SpaceBetween>

				<SpaceBetween style={{paddingVertical:10, paddingHorizontal:20}}>
					<Text>Biaya Tagihan</Text>
					<Text style={{color:blue}}>{Rupiah(Number(data.rptagihan))}</Text>
				</SpaceBetween>

				<SpaceBetween style={{paddingVertical:10, paddingHorizontal:20}}>
					<Text>Biaya Layanan</Text>
					<Text style={{color:blue}}>{Rupiah(Number(data.admin))}</Text>
				</SpaceBetween>

				<SpaceBetween style={{paddingVertical:10, paddingHorizontal:20}}>
					<Text>Cashback</Text>
					<Text style={{color:blue}}>{Rupiah(Number(data.cashback))}</Text>
				</SpaceBetween>

				<SpaceBetween style={{paddingVertical:10, paddingHorizontal:20}}>
					<Text>Total Bayar</Text>
					<Text style={{color:blue}}>{Rupiah(Number(data.totaltagihan))}</Text>
				</SpaceBetween>

				<View style={{marginTop:50}}>
					<Button onPress={() => 
						this.props.navigation.dispatch(
							StackActions.reset({
						  		index: 0,
						  		actions: [NavigationActions.navigate({ routeName: "Home" })]
							})
						)
					} text={'Selesai'} />
				</View>
			</View>
		)
	}

	renderPLNPRE = () => {
		let {data, type} = this.props.navigation.state.params
		
		return(
			<View style={{marginTop:30}}>
				<SpaceBetween style={{paddingVertical:10, paddingHorizontal:20, backgroundColor:'whitesmoke'}}>
					<Text>PLN PREPAID</Text>
					<Text style={{color:blue, fontSize:20, fontWeight:'600'}}></Text>
				</SpaceBetween>

				<SpaceBetween style={{paddingVertical:10, paddingHorizontal:20}}>
					<Text>Waktu</Text>
					<Text>{data.datetime}</Text>
				</SpaceBetween>

				<SpaceBetween style={{paddingVertical:10, paddingHorizontal:20}}>
					<Text>RefNum</Text>
					<Text>{data.swref}</Text>
				</SpaceBetween>

				<SpaceBetween style={{paddingVertical:10, paddingHorizontal:20}}>
					<Text>ID Meter</Text>
					<Text style={{color:blue}}>{data.idmeter}</Text>
				</SpaceBetween>

				<SpaceBetween style={{paddingVertical:10, paddingHorizontal:20}}>
					<Text>Nama Pelanggan</Text>
					<Text style={{color:blue}}>{data.nama}</Text>
				</SpaceBetween>

				<SpaceBetween style={{paddingVertical:10, paddingHorizontal:20}}>
					<Text>Daya</Text>
					<Text style={{color:blue}}>{Number(data.daya)}</Text>
				</SpaceBetween>

				<SpaceBetween style={{paddingVertical:10, paddingHorizontal:20}}>
					<Text>Token</Text>
					<Text style={{color:blue}}>{data.token}</Text>
				</SpaceBetween>

				<View style={{marginTop:50}}>
					<Button onPress={() => 
						this.props.navigation.dispatch(
							StackActions.reset({
						  		index: 0,
						  		actions: [NavigationActions.navigate({ routeName: "Home" })]
							})
						)
					} text={'Selesai'} />
				</View>
			</View>
		)
	}

	renderTELKOM = () => {
		let {data, type} = this.props.navigation.state.params
		
		return(
			<View style={{marginTop:30}}>
				<SpaceBetween style={{paddingVertical:10, paddingHorizontal:20, backgroundColor:'whitesmoke'}}>
					<Text>TELKOM PASCABAYAR</Text>
					<Text style={{color:blue, fontSize:20, fontWeight:'600'}}></Text>
				</SpaceBetween>

				<SpaceBetween style={{paddingVertical:10, paddingHorizontal:20}}>
					<Text>Waktu</Text>
					<Text>{data.datetime}</Text>
				</SpaceBetween>

				<SpaceBetween style={{paddingVertical:10, paddingHorizontal:20}}>
					<Text>RefNum</Text>
					<Text>{data.refnum}</Text>
				</SpaceBetween>

				<SpaceBetween style={{paddingVertical:10, paddingHorizontal:20}}>
					<Text>ID Pelanggan</Text>
					<Text style={{color:blue}}>{data.idpel}</Text>
				</SpaceBetween>

				<SpaceBetween style={{paddingVertical:10, paddingHorizontal:20}}>
					<Text>Nama Pelanggan</Text>
					<Text style={{color:blue}}>{data.namapelanggan}</Text>
				</SpaceBetween>

				<SpaceBetween style={{paddingVertical:10, paddingHorizontal:20}}>
					<Text>Biaya Tagihan</Text>
					<Text style={{color:blue}}>{Rupiah(Number(data.rptagihan1))}</Text>
				</SpaceBetween>

				<SpaceBetween style={{paddingVertical:10, paddingHorizontal:20}}>
					<Text>Biaya Layanan</Text>
					<Text style={{color:blue}}>{Rupiah(Number(data.admin))}</Text>
				</SpaceBetween>

				<SpaceBetween style={{paddingVertical:10, paddingHorizontal:20}}>
					<Text>Cashback</Text>
					<Text style={{color:blue}}>{Rupiah(Number(data.cashback))}</Text>
				</SpaceBetween>

				<SpaceBetween style={{paddingVertical:10, paddingHorizontal:20}}>
					<Text>Total Bayar</Text>
					<Text style={{color:blue}}>{Rupiah(Number(data.totaltagihan))}</Text>
				</SpaceBetween>

				<View style={{marginTop:50}}>
					<Button onPress={() => 
						this.props.navigation.dispatch(
							StackActions.reset({
						  		index: 0,
						  		actions: [NavigationActions.navigate({ routeName: "Home" })]
							})
						)
					} text={'Selesai'} />
				</View>
			</View>
		)
	}

	renderPDAM = () => {
		let {data, type} = this.props.navigation.state.params
		
		return(
			<View style={{marginTop:30}}>
				<SpaceBetween style={{paddingVertical:10, paddingHorizontal:20, backgroundColor:'whitesmoke'}}>
					<Text>PDAM</Text>
					<Text style={{color:blue, fontSize:20, fontWeight:'600'}}></Text>
				</SpaceBetween>

				<SpaceBetween style={{paddingVertical:10, paddingHorizontal:20}}>
					<Text>Waktu</Text>
					<Text>{data.datetime}</Text>
				</SpaceBetween>

				<SpaceBetween style={{paddingVertical:10, paddingHorizontal:20}}>
					<Text>RefNum</Text>
					<Text>{data.refnum}</Text>
				</SpaceBetween>

				<SpaceBetween style={{paddingVertical:10, paddingHorizontal:20}}>
					<Text>Nama PDAM</Text>
					<Text style={{color:blue}}>{data.namapdam}</Text>
				</SpaceBetween>

				<SpaceBetween style={{paddingVertical:10, paddingHorizontal:20}}>
					<Text>ID Pelanggan</Text>
					<Text style={{color:blue}}>{data.idpel}</Text>
				</SpaceBetween>

				<SpaceBetween style={{paddingVertical:10, paddingHorizontal:20}}>
					<Text>Nama Pelanggan</Text>
					<Text style={{color:blue}}>{data.namapelanggan}</Text>
				</SpaceBetween>

				<SpaceBetween style={{paddingVertical:10, paddingHorizontal:20}}>
					<Text>Biaya Layanan</Text>
					<Text style={{color:blue}}>{Rupiah(Number(data.admin))}</Text>
				</SpaceBetween>

				<SpaceBetween style={{paddingVertical:10, paddingHorizontal:20}}>
					<Text>Cashback</Text>
					<Text style={{color:blue}}>{Rupiah(Number(data.cashback))}</Text>
				</SpaceBetween>

				<SpaceBetween style={{paddingVertical:10, paddingHorizontal:20}}>
					<Text>Total Bayar</Text>
					<Text style={{color:blue}}>{Rupiah(Number(data.totaltagihan))}</Text>
				</SpaceBetween>

				<View style={{marginTop:50}}>
					<Button onPress={() => 
						this.props.navigation.dispatch(
							StackActions.reset({
						  		index: 0,
						  		actions: [NavigationActions.navigate({ routeName: "Home" })]
							})
						)
					} text={'Selesai'} />
				</View>
			</View>
		)
	}

	renderMultifinace = () => {
		let {data, type} = this.props.navigation.state.params
		
		return(
			<View style={{marginTop:30}}>
				<SpaceBetween style={{paddingVertical:10, paddingHorizontal:20, backgroundColor:'whitesmoke'}}>
					<Text>Multifinance</Text>
					<Text style={{color:blue, fontSize:20, fontWeight:'600'}}></Text>
				</SpaceBetween>

				<SpaceBetween style={{paddingVertical:10, paddingHorizontal:20}}>
					<Text>Waktu</Text>
					<Text>{data.datetime}</Text>
				</SpaceBetween>

				<SpaceBetween style={{paddingVertical:10, paddingHorizontal:20}}>
					<Text>RefNum</Text>
					<Text>{data.billerrefnum}</Text>
				</SpaceBetween>

				<SpaceBetween style={{paddingVertical:10, paddingHorizontal:20}}>
					<Text>Produk Multifinance</Text>
					<Text style={{color:blue}}>{data.ptname}</Text>
				</SpaceBetween>

				<SpaceBetween style={{paddingVertical:10, paddingHorizontal:20}}>
					<Text>ID Pelanggan</Text>
					<Text style={{color:blue}}>{data.idpel}</Text>
				</SpaceBetween>

				<SpaceBetween style={{paddingVertical:10, paddingHorizontal:20}}>
					<Text>Nama Pelanggan</Text>
					<Text style={{color:blue}}>{data.namapelanggan}</Text>
				</SpaceBetween>

				<SpaceBetween style={{paddingVertical:10, paddingHorizontal:20}}>
					<Text>Biaya Tagihan</Text>
					<Text style={{color:blue}}>{Rupiah(Number(data.hargatagihan))}</Text>
				</SpaceBetween>

				<SpaceBetween style={{paddingVertical:10, paddingHorizontal:20}}>
					<Text>Biaya Layanan</Text>
					<Text style={{color:blue}}>{Rupiah(Number(data.admin))}</Text>
				</SpaceBetween>

				<SpaceBetween style={{paddingVertical:10, paddingHorizontal:20}}>
					<Text>Cashback</Text>
					<Text style={{color:blue}}>{Rupiah(Number(data.cashback))}</Text>
				</SpaceBetween>

				<SpaceBetween style={{paddingVertical:10, paddingHorizontal:20}}>
					<Text>Total Bayar</Text>
					<Text style={{color:blue}}>{Rupiah(Number(data.totaltagihan))}</Text>
				</SpaceBetween>

				<View style={{marginTop:50}}>
					<Button onPress={() => 
						this.props.navigation.dispatch(
							StackActions.reset({
						  		index: 0,
						  		actions: [NavigationActions.navigate({ routeName: "Home" })]
							})
						)
					} text={'Selesai'} />
				</View>
			</View>
		)
	}

	renderTVKabel = () => {
		let {data, type} = this.props.navigation.state.params
		
		return(
			<View style={{marginTop:30}}>
				<SpaceBetween style={{paddingVertical:10, paddingHorizontal:20, backgroundColor:'whitesmoke'}}>
					<Text>TV Kabel</Text>
					<Text style={{color:blue, fontSize:20, fontWeight:'600'}}></Text>
				</SpaceBetween>

				<SpaceBetween style={{paddingVertical:10, paddingHorizontal:20}}>
					<Text>Waktu</Text>
					<Text>{data.datetime}</Text>
				</SpaceBetween>
				
				<SpaceBetween style={{paddingVertical:10, paddingHorizontal:20}}>
					<Text>RefNum</Text>
					<Text>{data.billerrefnum}</Text>
				</SpaceBetween>

				<SpaceBetween style={{paddingVertical:10, paddingHorizontal:20}}>
					<Text>Produk Multifinance</Text>
					<Text style={{color:blue}}>{data.idproduk}</Text>
				</SpaceBetween>

				<SpaceBetween style={{paddingVertical:10, paddingHorizontal:20}}>
					<Text>ID Pelanggan</Text>
					<Text style={{color:blue}}>{data.idpel}</Text>
				</SpaceBetween>

				<SpaceBetween style={{paddingVertical:10, paddingHorizontal:20}}>
					<Text>Nama Pelanggan</Text>
					<Text style={{color:blue}}>{data.namapelanggan}</Text>
				</SpaceBetween>

				<SpaceBetween style={{paddingVertical:10, paddingHorizontal:20}}>
					<Text>Biaya Tagihan</Text>
					<Text style={{color:blue}}>{Rupiah(Number(data.hargatagihan))}</Text>
				</SpaceBetween>

				<SpaceBetween style={{paddingVertical:10, paddingHorizontal:20}}>
					<Text>Biaya Layanan</Text>
					<Text style={{color:blue}}>{Rupiah(Number(data.admin))}</Text>
				</SpaceBetween>

				<SpaceBetween style={{paddingVertical:10, paddingHorizontal:20}}>
					<Text>Cashback</Text>
					<Text style={{color:blue}}>{Rupiah(Number(data.cashback))}</Text>
				</SpaceBetween>

				<SpaceBetween style={{paddingVertical:10, paddingHorizontal:20}}>
					<Text>Total Bayar</Text>
					<Text style={{color:blue}}>{Rupiah(Number(data.totaltagihan))}</Text>
				</SpaceBetween>

				<View style={{marginTop:50}}>
					<Button onPress={() => 
						this.props.navigation.dispatch(
							StackActions.reset({
						  		index: 0,
						  		actions: [NavigationActions.navigate({ routeName: "Home" })]
							})
						)
					} text={'Selesai'} />
				</View>
			</View>
		)
	}

	render() {
		let {data, type} = this.props.navigation.state.params

		if(!data){
			return null
		}

		return (
			<ScrollView style={{backgroundColor:'white'}}>		
				<View style={{marginTop:20}}>
					<Image
						style={{height:150, width:null, resizeMode:'contain'}}
						source={require('../assets/images/SUKSES.png')}/>
				</View>

				{data.idproduk == 'PULSA1' ? this.renderPULSA() : null}
				{data.idproduk == 'BPJSKS' ? this.renderBPJS() : null}
				{data.idproduk == 'PLNPOS' ? this.renderPLNPOS() : null}
				{data.idproduk == 'PLNNON' ? this.renderPLNNON() : null}
				{data.idproduk == 'PLNPRE' ? this.renderPLNPRE() : null}
				{data.idproduk == 'TELKOM' ? this.renderTELKOM() : null}
				{data.idproduk[0].includes('PDM') ? this.renderPDAM() : null}
				{data.idproduk[0].includes('MFC') ? this.renderMultifinace() : null}
				{data.idproduk[0].includes('TV') ? this.renderTVKabel() : null}
				
			</ScrollView>
		);
	}
}