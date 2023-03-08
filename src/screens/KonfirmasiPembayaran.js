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

let {width, height} = Dimensions.get('window')
import { TabNavigator, NavigationActions, StackActions } from "react-navigation";
import { WebView } from 'react-native-webview';
export default class extends Component {

	constructor(props){
		super(props);
		this.state = {
			
		}
	}

	componentDidMount() {
		
	}

	componentWillMount() {
		
	}

	render() {

		return (
			<View style={{width:width-40, backgroundColor:'white', justifyContent: 'center', alignSelf: "center", marginTop: 38}}>		
				<View style={{padding:20}}>
					<View>
						<Text style={{color:blue, fontWeight:'700', fontSize:20}}>Konfirmasi Pembayaran</Text>
					</View>

					<View style={{marginTop:20}}>
						<Text>Produk BPJS</Text>
						<Text style={{color:blue}}>Kesehatan</Text>
					</View>

					<View style={{marginTop:20}}>
						<Text>No. Handphone</Text>
						<Text style={{color:blue}}>Samsu - 08xxxxxxxx</Text>
					</View>

					<View style={{marginTop:20}}>
						<Text>No. Virtual Account</Text>
						<Text style={{color:blue}}>12345</Text>
					</View>

					<View style={{marginTop:20}}>
						<Text>Jumlah Bulan</Text>
						<Text style={{color:blue}}>1 Bulan</Text>
					</View>

					<View style={{marginTop:20}}>
						<Text>Biaya Tagihan</Text>
						<Text style={{color:blue}}>Rp. 80.000</Text>
					</View>

					<View style={{marginTop:20}}>
						<Text>Biaya Layanan</Text>
						<Text style={{color:blue}}>Rp. 2500</Text>
					</View>

					<View style={{marginTop:20}}>
						<Text>Total Bayar</Text>
						<Text style={{color:blue}}>Rp. 82.500</Text>
					</View>

					<View style={{marginTop:20}}>
						<Text>Metode Pembayaran</Text>
						<Text style={{color:blue}}>Saldo</Text>
					</View>
				</View>

				<View>
					<SpaceBetween>
						<TouchableOpacity style={{width:(width-40)/2, padding:10}}>
							<Text style={{textAlign:'center'}}>Batalkan</Text>
						</TouchableOpacity>

						<TouchableOpacity style={{backgroundColor:blue, width:(width-40)/2, padding:10}}>
							<Text style={{textAlign:'center', color:'white'}}>Konfirmasi</Text>
						</TouchableOpacity>
					</SpaceBetween>
				</View>
				
			</View>
		);
	}
}