import React from 'react';
import {View} from 'react-native';

export default ({children, style=null}) =>  (
	<View style={[{justifyContent:'center', alignItems:'center'}, style]}>
		{children}
	</View>
)