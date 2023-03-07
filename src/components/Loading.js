import React, {Component} from 'react';
import {ActivityIndicator, View, Text} from 'react-native';

export default ({text}) => (
	<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
		<ActivityIndicator animating={true} size="large" color="grey"/>
		<Text style={{marginTop:5, textAlign:'center', fontFamily:'AppleSDGothicNeo-Light', fontSize:16}}>
		  {text}
		</Text>
	</View>
)