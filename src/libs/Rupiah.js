import {Platform} from 'react-native';

const IOS = Platform.OS === 'ios'
const Android = Platform.OS === 'android'

export default (price, isUseRp = true) =>  {
	if (!price) {
		price = 0
	}

	if(isUseRp){
		price = `Rp ${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`
	}
	else{
		price = `${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`
	}

	return price
}