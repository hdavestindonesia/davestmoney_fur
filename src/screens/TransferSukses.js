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
import { WebView } from 'react-native-webview';
let {width, height} = Dimensions.get('window')

export default class extends Component {
	static navigatorStyle = navBarHidden;

	constructor(props){
		super(props);
		this.state = {
			
		}
	}

	componentDidMount() {
		
	}

	render() {
		let {data, type} = this.props.navigation.state.params

		if(!data){
			return null
		}

		return (
			<ScrollView style={{backgroundColor:'white'}}>		
				<View style={{marginTop:80}}>
					<Image
						style={{height:150, width:null, resizeMode:'contain'}}
						source={require('../assets/images/SUKSES.png')}/>
				</View>

				<View style={{marginTop:30}}>
					<SpaceBetween style={{padding:20}}>
						<Text>Waktu</Text>
						<Text>{data.datetime}</Text>
					</SpaceBetween>

					<SpaceBetween style={{padding:20, backgroundColor:'whitesmoke'}}>
						<Text>Jumlah Transfer</Text>
						<Text style={{color:blue, fontSize:20, fontWeight:'600'}}>{Rupiah(data.jumlah)}</Text>
					</SpaceBetween>

					<SpaceBetween style={{padding:20}}>
						<Text>Tipe Transaksi</Text>
						<Text style={{color:blue}}>Transfer</Text>
					</SpaceBetween>

					{type == 'transfer' ? (
						<View>
							<SpaceBetween style={{padding:20}}>
								<Text>No. Handphone</Text>
								<Text style={{color:blue}}>{data.no_telp_tujuan}</Text>
							</SpaceBetween>
							<SpaceBetween style={{padding:20}}>
								<Text>Tujuan</Text>
								<Text style={{color:blue}}>{data.nama}</Text>
							</SpaceBetween>
							<SpaceBetween style={{padding:20}}>
								<Text>Keterangan</Text>
								<Text style={{color:blue}}>{data.keterangan}</Text>
							</SpaceBetween>
							<SpaceBetween style={{padding:20}}>
								<Text>Refnum</Text>
								<Text style={{color:blue}}>{data.refnum}</Text>
							</SpaceBetween>
						</View>
					) : (
						<SpaceBetween style={{padding:20}}>
							<Text>No. Rekening</Text>
							<Text style={{color:blue}}>{data.nama_bank} - {data.no_rekening_tujuan}</Text>
						</SpaceBetween>
					)}

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
				
			</ScrollView>
		);
	}
}