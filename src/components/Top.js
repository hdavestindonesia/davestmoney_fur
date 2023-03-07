import React from 'react';
import {Text, View} from 'react-native';
import TopBorder from '../components/TopBorder';

export default ({style={}, top=0, children}) =>  (
	<View style={style}>
		<TopBorder top={top} />
		{children}
	</View>
)