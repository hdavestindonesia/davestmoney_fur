import React from 'react';
import {TouchableOpacity, StyleSheet, View} from 'react-native';

export default ({children, onPress=null, style=null}) => onPress ? (
	<TouchableOpacity onPress={onPress} style={[styles.container, style]}>
		{children}
	</TouchableOpacity>
) : (
	<View style={[styles.container, style]}>
		{children}
	</View>
)

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
});