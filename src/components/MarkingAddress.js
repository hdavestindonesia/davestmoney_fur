import React from 'react';
import {Image, Dimensions, View, StyleSheet} from 'react-native';
import MapView from 'react-native-maps';
const LATITUDE_DELTA = 0.0022;
const { width, height } = Dimensions.get('window');

export default ({addressFromGoogleMaps, canScroll, onRegionChangeComplete}) =>  (
	<View>
		<MapView 
			initialRegion={Object.assign({}, addressFromGoogleMaps.latlng, {latitudeDelta:LATITUDE_DELTA, longitudeDelta:LATITUDE_DELTA * ((width-40)/250)})}
			scrollEnabled={canScroll ? true : false}
			style={{height:250}}
			zoomEnabled={canScroll ? true : false}
			pitchEnabled={canScroll ? true : false}
			rotateEnabled={canScroll ? true : false}
			onRegionChangeComplete={onRegionChangeComplete}>
		</MapView>
		<View style={{position:'absolute', bottom:125, right:0, left:0, alignItems:'center', justifyContent:'center'}}>
			<Image style={{width:97.2, height:75.6}} source={require('../assets/ipp/location.png')}/>
		</View>
	</View>
)