import React, { Component } from 'react';
import {Text, StyleSheet, TouchableOpacity, View} from 'react-native';

export default ({text, checked, onPress}) =>  (
	<TouchableOpacity onPress={onPress} style={{flexDirection:'row', alignItems:'center', marginTop:10}}>
		<View style={styles.ractangle}>
			<Text style={{textAlign: 'center', fontSize:12}}>{checked ? '✓' : ' '}</Text>
		</View>
		<Text style={{fontSize:12, marginLeft:5}}>{text}</Text>
	</TouchableOpacity>
)

const styles = StyleSheet.create({
  ractangle: {
  	alignItems: 'center',
  	justifyContent: 'center',
  	borderWidth: 1,
  	shadowColor: 'grey',
  	shadowOpacity: 0.5,
  	width: 15,
  	height: 15
  },
});
