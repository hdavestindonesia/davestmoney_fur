import React from 'react';

export default ({text,onPress}) =>  (
	<TouchableOpacity onPress={onPress} style={{borderWidth:1, borderColor:'#2C84C3', backgroundColor:'transparent', marginTop:15}}>
		<Text style={{color:'#2C84C3'}}>{text}</Text>
	</TouchableOpacity>
)