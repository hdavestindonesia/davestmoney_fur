import {Dimensions} from 'react-native';
import kAlert from '../libs/kAlert';
const {width, height} = Dimensions.get('window');
import {stringify} from 'qs';

function fetching(params, callback) {
	params = Object.assign({}, params, {key:'AIzaSyCZfQkqpZ2qs_hNGj8zfHFcihSFDXp59PM'})
	console.log({getLatLng:params})
	let url = `https://maps.googleapis.com/maps/api/geocode/json?${stringify(params)}`
	fetch(url)
	.then((response) => response.json())
	.then((responseJson) => {
		if (responseJson.status == 'OK') {
			let json = responseJson.results[0]
			let location = json.geometry.location
			let newObject = {
				address: json.formatted_address,
				latlng: {
					latitude: location.lat,
					longitude: location.lng
				}
			}
			callback(newObject)
		} else {
			let newObject = {
				address: '',
				latlng: {
					latitude: 0,
					longitude: 0
				}
			}
			callback(newObject)
		};
	})
	.catch((error) => {
		kAlert('Koneksi error')
		console.error(error);
	});
}

export default (address, cb) => fetching(address, (object) => cb(object))