import React from 'react';
import SpaceBetween from '../components/SpaceBetween';
import {TouchableOpacity, Text} from 'react-native';
import {blue} from '../libs/Constants';

export default ({onPress, array, selectedIndex, backgroundColor=blue, textColor='white'}) => (
	<SpaceBetween style={{backgroundColor:backgroundColor, paddingHorizontal:10}}>
		{array.map((text,i) => (
			<TouchableOpacity onPress={()=> onPress(i)} key={i} style={{borderBottomWidth:4, borderBottomColor:selectedIndex == i ? textColor : 'transparent'}}>
				<Text style={{color:textColor, paddingVertical:8, fontWeight:'600'}}>{text}</Text>
			</TouchableOpacity>
		))}
	</SpaceBetween>
)