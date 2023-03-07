import React, { Component } from 'react';
import {Text, Dimensions, Image, ScrollView, TouchableOpacity, View, StyleSheet} from 'react-native';
import {blue, grey} from '../libs/Constants';
let {width} = Dimensions.get('window')
let inActive = 'rgb(138,138,138)'

export default ({nomor, isOnlyVirtual}) =>  (
	<View>
		<View style={{marginTop:10, paddingVertical: 10, backgroundColor:'white'}}>
			<View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'center'}}>
				<View style={[styles.circle, {backgroundColor: blue}]}>
					<Text style={{color: 'white', fontSize: 20}}>1</Text>
				</View>
				<View style={[styles.panjang, {backgroundColor: nomor > 1 ? blue : grey}]} />
				<View style={[styles.circle, {backgroundColor: nomor > 1 ? blue : grey}]}>
					<Text style={{color: 'white', fontSize: 20}}>2</Text>
				</View>
				<View style={[styles.panjang, {backgroundColor: nomor > 2 ? blue : grey}]} />
				<View style={[styles.circle, {backgroundColor: nomor > 2 ? blue : grey}]}>
					<Text style={{color: 'white', fontSize: 20}}>3</Text>
				</View>
				<View style={[styles.panjang, {backgroundColor: nomor > 2 ? blue : grey}]} />
				<View style={[styles.circle, {backgroundColor: nomor > 3 ? blue : grey}]}>
					<Text style={{color: 'white', fontSize: 20}}>4</Text>
				</View>
			</View>
			<View style={{flexDirection:'row'}}>
				<Info nomor={nomor} children="Data Penumpang" />
				<Info nomor={nomor} children="Rangkuman Perjalanan" />
				<Info nomor={nomor} children="Pembayaran" />
				<Info nomor={nomor} children="Selesai" />
			</View>
		</View>
	</View>
)

let Info = ({children, nomor}) => (
	<Text style={{flex:1, textAlign:'center', marginTop:10, fontSize:10, color:nomor==1?'black':inActive}}>{children}</Text>
)

let number = 30
const styles = StyleSheet.create({
	circle: {
		width: number,
		justifyContent: 'center',
		alignItems: 'center',
		height: number,
		borderRadius: number / 2
	},
	panjang: {
		width: (width/4) - 30,
		height: 1
	},
	panjang2: {
		width: (width/4),
		height: 1
	},
});