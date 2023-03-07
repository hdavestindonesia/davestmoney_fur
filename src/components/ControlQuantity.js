import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import SpaceBetween from '../components/SpaceBetween';

export default ({quantity, onChangeQuantity, minimumQuantity=1}) =>  {
	
	let Control = (sign, qty) => {
		if (sign == '+') {
			qty = qty + 1
		} else {
			if (qty !== minimumQuantity) {
				qty = qty - 1
			}
		};
		
		return (
			<TouchableOpacity onPress={() => onChangeQuantity(qty)} style={{backgroundColor:'grey', justifyContent: 'center', alignItems: 'center'}}>
			  <Text style={{color:'white', textAlign:'center', paddingHorizontal:10, fontSize:20}}>{sign}</Text>
			</TouchableOpacity>
		)
	}

	return (
		<SpaceBetween style={{marginHorizontal:10}}>
			<Text> </Text>
			<SpaceBetween style={{borderWidth:StyleSheet.hairlineWidth, marginTop:5, alignSelf:'flex-end'}}>
				{Control('-', quantity)}
				<Text style={{paddingHorizontal:15}}>{quantity}</Text>
				{Control('+', quantity)}
			</SpaceBetween>
		</SpaceBetween>
	);
}