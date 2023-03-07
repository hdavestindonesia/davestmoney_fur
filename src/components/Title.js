import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {blue} from '../libs/Constants';

export default ({title}) =>  (
	<Text style={styles.header}>
	  {title}
	</Text>
)

const styles = StyleSheet.create({
  header: {
  	fontSize: 16,
  	marginTop: 10,
  	marginHorizontal:40,
  	color: blue,
  	fontWeight: '500'
  }
});