import React from 'react';
import {Image} from 'react-native';

export default ({BadgeType, style}) =>  {
	let source = require('../assets/ico-1.png')
	if (BadgeType == 2) {
		source = require('../assets/ico-2.png')
	} else if (BadgeType == 3) {
		source = require('../assets/ico-3.png')
	} else if (BadgeType == 4) {
		source = require('../assets/ico-4.png')
	};

	return <Image style={[{width:25, height:25, resizeMode:'contain'}, style]} source={source} />
}