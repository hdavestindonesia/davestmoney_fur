import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import 'moment/locale/id';

export default ({navigator, value, text, minDate, maxDate, onChange}) => {

	let goToList = () => {

		if(!minDate){
			minDate = moment().add(-200, 'years').toDate()
		}

		if(!maxDate){
			maxDate = moment().toDate()
		}		

		navigator.showLightBox({
			screen: 'DatePicker',
			passProps: {
				title: 'Tanggal Pembayaran',
				date: moment().toDate(),
				minDate: minDate,
				maxDate: maxDate,
				onValueChange: (date) => onChange(date)
			},
			style: {
				backgroundColor: "rgba(0,0,0,0.5)",
				tapBackgroundToDismiss: true
			}
		})
	}

	return (
		<TouchableOpacity onPress={goToList}>
			<View style={{paddingVertical:10, borderBottomWidth:1, borderBottomColor:'lightgrey'}}>
				<Text style={{fontSize:15, marginLeft:5}}>{value ? value : text}</Text>
			</View>

			<View style={{position:'absolute', right:10, top:5}}>
				<Icon name="calendar" size={20} color={'grey'} />
			</View>
		</TouchableOpacity>
	)
}