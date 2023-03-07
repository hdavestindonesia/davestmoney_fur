import React from 'react';
import {View, StyleSheet, ScrollView, Dimensions, Text, TouchableOpacity} from 'react-native';
import {red, biru} from '../libs/Constants';
let width = Dimensions.get('window').width / 3

export default ({top=0}) =>  (
	<View style={{top, right:0, left:0, position:'absolute', zIndex: 1, backgroundColor:'rgb(201,201,205)', flexDirection:'row'}}>
		<View style={{height:3,width,backgroundColor:red}} />
		<View style={{height:3,width,backgroundColor:biru}} />
		<View style={{height:3,width,backgroundColor:'rgb(255,195,76)'}} />
	</View>
)