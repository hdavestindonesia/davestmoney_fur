import {getApi} from '../libs/api';
import {Linking} from 'react-native';
import {last} from 'lodash';
import getItem from '../libs/getItem';
import setItem from '../libs/setItem';
import {WEB_BASE_URL} from '../libs/Constants';

export default ({navigator, banner=null, regionID, mfp_id, url, cb, screenDict, title, isThankYouPage=false, isReset=false, source=''}) => {
	console.log({url})
	let baseURL = WEB_BASE_URL
	baseURL = baseURL.replace('https://', '')
	baseURL = baseURL.replace('http://', '')
	baseURL = baseURL.replace('/', '')


	if (screenDict) {
		if(isReset){
			navigator.resetTo(screenDict)
		}else{
			navigator.push(screenDict)
		}
	} else {
		Linking.openURL(url)
	};
}