import React from 'react';
import {TouchableOpacity, Dimensions, Image, Text, View, StyleSheet, Platform} from 'react-native';
import Picker from 'react-native-picker';
import {Navigation} from 'react-native-navigation';
import notif from '../libs/notif';
let {width} = Dimensions.get('window');
const IOS = Platform.OS === 'ios';
const Android = Platform.OS === 'android';

export default ({header, date, pickerData, value, selectedValue, OriginalOrDestination, onConfirm, half, source, style, originDestinationSwitch}) =>  {
	var Picker = require('react-native').Picker;
	let openPicker = () => {
		if ((header == 'Pergi') || (header == 'Pulang')) {
			let minDate = null
			if(header == 'Pergi'){
				minDate = new Date()
			}else{
				minDate = new Date(date)
			}
			Navigation.showLightBox({
				screen: 'DatePicker',
				style: {
					backgroundColor: "rgba(0,0,0,0.5)",
					tapBackgroundToDismiss: true,
					zIndex: 1
				},
				passProps: {
					date,
					minimumDate: minDate,
					maximumDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000 * 90),
					title: `Pilih Tanggal ${header}`,
					onValueChange: data => {
						if (header == 'Pergi') {
							onConfirm({DepartureDate: data, ArrivalDate: data})
						} else {
							onConfirm({ArrivalDate: data})
						}
					}
				}
			})
		} else if (OriginalOrDestination) {
			Navigation.showModal({
				screen:'Search',
				passProps: {
					OriginalOrDestination,
					onChoosen: (obj) => onConfirm(obj)
				}
			})
		} else {
			let Picker = require('react-native-picker').default
			Picker.init({
				pickerData,
				pickerTitleText: header,
				selectedValue,
				pickerConfirmBtnText: 'Simpan',
				pickerCancelBtnText: 'Batal',
				pickerConfirmBtnColor: [0, 123, 188, 1],
				pickerCancelBtnColor: [0, 123, 188, 1],
				onPickerConfirm: data => {
					let obj = {}
					obj[header] = data[0]
					onConfirm(obj)
				}
			});
			Picker.show();
		}
	}

	let pickerConfirm = (itemValue, itemIndex) => {
		let obj = {}
		obj[header] = itemValue
		onConfirm(obj)
	}

	return (
		<View style={[{marginVertical: 10, backgroundColor:'transparent'}, style]}>
			<View style={{flexDirection:'row'}}>
				<Text style={{color: 'grey', marginLeft: 25}}>{header}</Text>
				
			</View>
		{(IOS ?
			(
				<TouchableOpacity onPress={openPicker} style={[{flexDirection:'row', alignItems: 'center', borderBottomColor: 'grey', borderBottomWidth: StyleSheet.hairlineWidth, marginRight: 10}, half ? {width: (width / 2) - 50} : null]}>
					<Image
					style={styles.icon}
					source={source}/>
					<Text style={{fontSize: 12}}>{value.toLocaleString()}</Text>
					{header == 'Berangkat' ? (
						<TouchableOpacity onPress={originDestinationSwitch} style={{position:'absolute', right:0, top:30}}>
							<Image
							style={{width:25, height:25}}
							source={require('../assets/_2arrow.png')} />
						</TouchableOpacity>
					) : null}
				</TouchableOpacity>
				
			) : 
			(
				header === 'Dewasa' || header === 'Bayi' ? 
					(
						<View onPress={openPicker} style={[{flexDirection:'row', alignItems: 'center', borderBottomColor: 'grey', borderBottomWidth: StyleSheet.hairlineWidth, marginRight: 10, paddingTop: 5}, half ? {width: (width / 2) - 50} : null]}>
						<Image
							style={styles.icon}
							source={source}/>
						<Picker
							style={{backgroundColor: 'white', color: 'grey' , width: (width / 2) - 100, height:20}}
							selectedValue={value}
							onValueChange={(itemValue, itemIndex) => pickerConfirm(itemValue, itemIndex)}>
							{pickerData.map((i) => 
								<Picker.Item key={i} value={i.toString()} label={i.toString()}/>)
							}
						</Picker>
						</View>
					) : 
					(
						<TouchableOpacity onPress={openPicker} style={[{flexDirection:'row', alignItems: 'center', borderBottomColor: 'grey', borderBottomWidth: StyleSheet.hairlineWidth, marginRight: 10}, half ? {width: (width / 2) - 50} : null]}>
							<Image
							style={styles.icon}
							source={source}/>
							<Text style={{fontSize: 12}}>{value.toLocaleString()}</Text>
							{header == 'Berangkat' ? (
								<TouchableOpacity onPress={originDestinationSwitch} style={{position:'absolute', right:0, top:30}}>
									<Image
									style={{width:25, height:25}}
									source={require('../assets/_2arrow.png')} />
								</TouchableOpacity>
							) : null}
						</TouchableOpacity>
					)			
			))
		}
		</View>
	)
}

// let InfoButton = (header) => {
// 	let info = header == 'Dewasa' ? '3 tahun keatas' : 'Dibawah 3 tahun'
// 	return (
// 		<TouchableOpacity style={{marginLeft:5}} onPress={()=> notif(info)}>
// 			<Image
// 			  style={{width:15, height:15}}
// 			  source={require('../assets/HelpFilled.png')} />
// 		</TouchableOpacity>
// 	)
// }

const styles = StyleSheet.create({
	icon: {
  	margin: 5,
  	width: 15,
  	height: 15
  }
});