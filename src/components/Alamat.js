import React from 'react';
import {View, Text, Image} from 'react-native';
import Regular from './Regular';

export default ({address, style={}}) => {
	let {ReceiverName, ReceiverPhone, Street, Street2, Street3, RegionName, ZipCode, GoogleAddress} = address
	let alamat = `${Street}${Street2 ? ', '+Street2 : ''}${Street3 ? ', '+Street3 : ''}`
	return (
		<View style={style}>
			<Text>{ReceiverName}</Text>
			<Text>{ReceiverPhone}</Text>
			<Text>{alamat}</Text>
			<Text>{RegionName} {ZipCode}</Text>
		</View>
	)
}

