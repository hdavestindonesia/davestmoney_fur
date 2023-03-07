import React from 'react';
import {Text} from 'react-native';

export default ({children, size}) =>  (
	<Text style={{fontSize:size}}>
	  {children}
	</Text>
)