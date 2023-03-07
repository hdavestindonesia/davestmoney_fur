import React from 'react';
import { StyleSheet, View } from 'react-native';
import {green} from '../libs/Constants';
export default () => <View style={styles.activeDot} />

const styles = StyleSheet.create({
  activeDot: {
    backgroundColor: 'white',
    width: 10,
    height: 10,
    borderRadius: 5,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: green
  }
});