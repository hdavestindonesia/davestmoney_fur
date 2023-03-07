import React from 'react';
import {
	Text,
	TouchableOpacity,
	Image,
	View,
	StyleSheet,
	Dimensions
} from 'react-native';
import FooterContainer from './FooterContainer'

export default ({leftPress,rightPress,width,color,borderRightWidth=StyleSheet.hairlineWidth}) => (
	<View style={styles.wrapper}>
		<FooterContainer
			width={width}
			onPress={()=> leftPress()}
			containerStyle={{borderRightWidth,borderColor:color}}
			iconStyle={{width:30, height:30, tintColor:color}}
			source={require('../assets/diskette1.png')}
			color={color} 
			text="Save" />
		<FooterContainer
			width={width}
			onPress={()=> rightPress()}
			containerStyle={{borderColor:color}}
			iconStyle={{width:30, height:30, tintColor:color}}
			source={require('../assets/close.png')}
			color={color} 
			text="Cancel" />
	</View>
)

const styles = StyleSheet.create({
	wrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent:'center',
    height:50
  }
});