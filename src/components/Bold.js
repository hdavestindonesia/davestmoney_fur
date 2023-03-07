import React from 'react';
import {Text} from 'react-native';

export default ({children, style=null, onPress=null}) =>  (
	<Text onPress={onPress} style={[{fontWeight:'500'}, style]}>
	  {children}
	</Text>
)