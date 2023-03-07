import React, { Component } from 'react';
import {TouchableOpacity, View} from 'react-native';
import FloatLabelTextInput from 'react-native-floating-label-text-input'

export default ({onPress, value, placeholder, leftPadding=15, editable=true, noBorder=false}) => (
	<TouchableOpacity activeOpacity={editable ? 0 : 1} onPress={()=> editable ? onPress() : null}>
		<View pointerEvents='none'>
			<FloatLabelTextInput 
				leftPadding={leftPadding} 
		  	value={value} 
		  	noBorder={noBorder}
		  	autoCorrect={false} 
		  	editable={false} 
		  	placeholder={placeholder} />
		</View>
	</TouchableOpacity>
)