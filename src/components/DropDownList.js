import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet, Alert} from 'react-native';


export default ({navigator, value, text, options, onChange}) => {


	let goToList = () => {
		// navigator && navigator.push({
		// 	screen: 'PickerList',
		// 	title: text,
		// 	passProps: {
		// 		options,
		// 		onChange: (data) => {
		// 			onChange && onChange(data)
		// 		}
		// 	}
		// })


		this.props.navigation.navigate("PickerList",{
			options,
			onChange: (data) => {
				onChange && onChange(data)
			}
		})

	}

	return (
		<View style={{width: "90%", height: 50, alignSelf: "center"}}>

			<TouchableOpacity onPress={goToList}>
				<View style={{paddingVertical:10, borderBottomWidth:1, borderBottomColor:'lightgrey'}}>
					<Text style={{fontSize:15, marginLeft:5}}>{value ? value : text}</Text>
				</View>

				<View style={{position:'absolute', right:10, top:5}}>
					<Text style={{fontSize:20}}>▼</Text>
				</View>
			</TouchableOpacity>

		</View>
	)
}


// export default ({navigator, value, text, options, onChange}) => {
// 	let goToList = () => {
// 		navigator && navigator.push({
// 			screen: 'PickerList',
// 			title: text,
// 			passProps: {
// 				options,
// 				onChange: (data) => {
// 					onChange && onChange(data)
// 				}
// 			}
// 		})
// 	}

// 	return (
// 		<TouchableOpacity onPress={goToList}>
// 			<View style={{paddingVertical:10, borderBottomWidth:1, borderBottomColor:'lightgrey'}}>
// 				<Text style={{fontSize:15, marginLeft:5}}>{value ? value : text}</Text>
// 			</View>

// 			<View style={{position:'absolute', right:10, top:5}}>
// 				<Text style={{fontSize:20}}>▼</Text>
// 			</View>
// 		</TouchableOpacity>
// 	)
// }