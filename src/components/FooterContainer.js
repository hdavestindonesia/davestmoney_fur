import React from 'react';
import {
	Text,
	TouchableOpacity,
	Image,
	View,
	StyleSheet,
	Dimensions
} from 'react-native';
import FooterLabel from './FooterLabel'
let borderTop = {borderTopWidth:StyleSheet.hairlineWidth}
var height = {height:50}

export default ({width,onPress,containerStyle,iconStyle,color,text,source}) => (
	<View style={[height, borderTop, containerStyle, {width:width}]}>
	  <TouchableOpacity style={[height, styles.containerLabel]} onPress={()=> onPress()}>
	  	<Image style={[{alignSelf: 'center'}, iconStyle]} source={source} />
    	<FooterLabel color={color} text={text} />
	  </TouchableOpacity>
	</View>
)

const styles = StyleSheet.create({
	containerLabel: {
		flexDirection: 'row', 
		backgroundColor:'transparent', 
		justifyContent:'center'
	}
});