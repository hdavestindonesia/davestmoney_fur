import React, { Component } from 'react';
import {StyleSheet, View} from 'react-native';
import {borderColor} from '../libs/Constants';

export default ({style=null}) => (
	<View style={[styles.separator, style]} />
)

const styles = StyleSheet.create({
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor:borderColor
  }
})