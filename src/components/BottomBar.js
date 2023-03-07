import React, { Component } from 'react';
import {ScrollView, Share, Alert, Image, ActivityIndicator, TouchableOpacity, Dimensions, Text, View, StyleSheet} from 'react-native';
import Bold from '../components/Bold';
let {width, height} = Dimensions.get('window')

export default ({source, text, color='black', backgroundColor='white', onPress}) =>  (
	<View>
		<TouchableOpacity onPress={onPress} style={[styles.container, {backgroundColor}]}>
			<Bold style={{color}}>{text}</Bold>
		</TouchableOpacity>
	</View>
)

const styles = StyleSheet.create({
	container: {
		bottom: 0,
		right: 0,
		left: 0,
		position: 'absolute',
		zIndex: 1,
		flexDirection:'row',
		width,
		height: 60,
		justifyContent: 'center',
		alignItems: 'center',
	}
});