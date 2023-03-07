import React from 'react';
import {View, Text} from 'react-native';

export default ({left, right, center}) => (
	<View style={{flexDirection:'row', marginBottom:3}}>
		<View style={{flex:center ? 1 : 3, marginRight:5}}>
			<Text style={{textAlign:'right', fontSize:12, color:'grey'}}>{left}</Text>
		</View>
		<View style={{flex:center ? 1 : 7, marginLeft:5}}>
			<Text style={{fontSize:12}}>{right}</Text>
		</View>
	</View>
)

