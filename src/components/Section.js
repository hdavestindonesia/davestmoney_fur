import React from 'react';
import {Image, Text, View} from 'react-native';
import {nonActiveColor} from '../libs/Constants';

export default ({text, source, disable}) => (
	<View style={{flex: 1, alignItems: 'center', justifyContent:'center'}}>
		<Image
		  style={[{width:40, height:40, resizeMode:'contain'}, disable ? {tintColor:nonActiveColor} : null]}
		  source={source}/>
		<Text style={{textAlign:'center', color:disable ? 'rgb(204,204,204)' : 'black'}}>{text}</Text>
	</View>
)

