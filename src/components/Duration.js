import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

export default ({Original, DurationInHour, DurationInMinutes, Destination}) =>  (
	<View style={{flexDirection:'row', alignItems: 'center'}}>
		<Text style={styles.sub}>{Original[1]}</Text>
		<Text style={styles.sub}>{`${DurationInHour} j ${DurationInMinutes} m`}</Text>
		<Text style={styles.sub}>{Destination[1]}</Text>
	</View>
)

const styles = StyleSheet.create({
	sub: {
		color: 'grey',
		marginHorizontal: 9,
		fontSize: 10,
	}
});