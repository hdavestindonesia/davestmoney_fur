import React from 'react';
import {View, Image, Text, StyleSheet, TextInput, Keyboard} from 'react-native';
import CodePin from '../components/CodePin';
import Button from '../components/Button';
import SpaceBetween from '../components/SpaceBetween';
import NoHandphone from '../components/NoHandphone';
import kAlert from '../libs/kAlert';
import setItem from '../libs/setItem';
const borderColor = 'rgb(230,230,230)'

export default ({onChangeText}) =>  (
	<View style={{flexDirection:'row', marginBottom:10}}>
		<View style={{height:30, justifyContent:'center', alignItems:'center', flexDirection:'row', backgroundColor:borderColor, paddingHorizontal:5}}>
			<Image
			  style={{width:20, height:20}}
			  source={require('../assets/User.png')} />
			<Text style={{textAlign:'center'}}>+62</Text>
		</View>
		<TextInput
		  style={{height:30, width:null, flex:1, paddingLeft:5, borderColor, borderWidth:1}}
		  onChangeText={onChangeText}
		  placeholder='Masukan No Handphone, contoh: 812323'
		  keyboardType='phone-pad'  />
	</View>
)