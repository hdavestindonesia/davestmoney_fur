import React from 'react';
import {TouchableOpacity, ActivityIndicator, Text, StyleSheet} from 'react-native';
import {blue, yellow} from '../libs/Constants';

export default ({text, onPress, backgroundColor=blue, borderColor=blue, textColor='white'}) => (
	<TouchableOpacity onPress={onPress} style={{backgroundColor:backgroundColor, borderWidth:1, borderColor:borderColor, marginHorizontal:30, paddingVertical:10, borderRadius:5}}>
		<Text style={{textAlign:'center', fontSize:20, color:textColor}}>{text}</Text>
	</TouchableOpacity>
)