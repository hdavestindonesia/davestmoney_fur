import React from 'react';
import {Image, View, StyleSheet} from 'react-native';
import {inRange} from 'lodash';

export default ({rating}) =>  (
	<View style={{flexDirection:'row', alignItems:'center'}}>
		{Star({rating, min: 0.01, max: 0.5})}
		{Star({rating, min: 1.0, max: 1.5})}
		{Star({rating, min: 2.0, max: 2.5})}
		{Star({rating, min: 3.0, max: 3.5})}
		{Star({rating, min: 4.0, max: 4.5})}
	</View>
)

let Star = ({rating,min,max}) => {
	if (inRange(rating, min, max)) {
		return <Image style={styles.star} source={require('../assets/StarHalfEmptyFilled.png')} />
	} else if (rating >= max) {
		return <Image style={styles.star} source={require('../assets/StarFilled.png')} />
	} else {
		return <Image style={styles.star} source={require('../assets/Star.png')} />
	}
}

const styles = StyleSheet.create({
	star: {
		width: 12,
		height: 12,
		tintColor: '#D4AF37'
	},
	browse: {
		flexDirection: 'row',
		marginVertical: 5
	},
	kursus: {
		flexDirection: 'row',
		alignItems: 'center',
		flex: 1,
	},
	durationkursus: {
		backgroundColor: 'transparent',
		marginRight: 10,
		fontSize: 12,
		color: '#D0D3D4'
	},
	durationbrowse: {
		backgroundColor: 'transparent',
		fontFamily: 'AppleSDGothicNeo-Light',
		marginRight: 10,
		fontSize: 12,
		color: '#D0D3D4'
	}
});