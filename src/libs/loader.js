import {headers, headersLogin, API_URL, API_BASE_URL} from './Constants';
import {Navigation} from 'react-native-navigation'

let showLoader = () => {
	Navigation.showLightBox({
		screen: 'Loader',
		style: {
		  tapBackgroundToDismiss: false
		}
	})
}

let hideLoader = () => {
	Navigation.dismissLightBox()
}

export {showLoader, hideLoader}