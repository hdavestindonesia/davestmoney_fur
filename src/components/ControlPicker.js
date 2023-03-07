import React from 'react';
import {TouchableOpacity, Text, View, StyleSheet} from 'react-native';
import {borderColor} from '../libs/Constants';

export default ({onPress, text, disable, style=null}) =>  (
	<View style={[{marginBottom:10, backgroundColor:'white'}, style]}>
		<TouchableOpacity onPress={onPress} style={styles.gerbongControl}>
			<Text style={{padding:10, color:disable ? 'rgb(204,204,204)' : 'black'}}>{text}</Text>
			<Text style={{padding:10, color:disable ? 'rgb(204,204,204)' : 'black'}}>▼</Text>
		</TouchableOpacity>
	</View>
)

const styles = StyleSheet.create({
	gerbongControl: {
  	justifyContent: 'space-between',
  	flexDirection: 'row',
    borderColor,
    borderWidth: StyleSheet.hairlineWidth,
  	alignItems: 'center',
  	// shadowOffset: {
  	// 	height: 2
  	// },
  	// shadowColor: 'grey',
  	// shadowOpacity: 0.5
  }
});