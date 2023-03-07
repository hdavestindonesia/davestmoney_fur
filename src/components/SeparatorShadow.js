import React, { Component } from 'react';
import {StyleSheet, View} from 'react-native';
import {borderColor} from '../libs/Constants';

export default ({paddingLeft}) => (
	<View 
		shadowOffset={{height:3}}
	  shadowColor={borderColor}
	  shadowOpacity={0.5}
		style={[styles.separator, {marginLeft: paddingLeft}]} />
)

const styles = StyleSheet.create({
  separator: {
    height: 3,
    backgroundColor: borderColor
  }
})