import {headers, headersLogin, API_BASE_URL, ApplicationSecret, VIRTUAL_API_URL, API_TRX_URL} from './Constants';
import urls from './urls';
import {stringify} from 'qs';
import RNProgressHUB from 'react-native-progresshub';
import getItem from '../libs/getItem';
import CryptoJS from 'crypto-js';
import moment from 'moment';
import xml2js from 'react-native-xml2js'

let getApi = (url, params, isLoading=false, cb) => {
	if (isLoading) {
		RNProgressHUB.showSpinIndeterminate()
	};

	params = params ? `?${stringify(params)}` : ''

	let uri = API_BASE_URL
	if(url){
		uri = `${API_BASE_URL}/${urls[url]}${params}`
	}

	fetch(uri, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	})
	.then((response) => response.json())
	.then((responseJson) => {
		if (isLoading) {
			RNProgressHUB.dismiss()
		};
		cb && cb(responseJson)
	})
	.catch((error) => {
		if (isLoading) {
			RNProgressHUB.dismiss()
		};
	})
}

let postApi = (url, body, isLoading=false, cb) => {
	if (isLoading) {
		RNProgressHUB.showSpinIndeterminate()
	};

	let uri = API_BASE_URL
	if(url){
		uri = `${API_BASE_URL}${urls[url]}`
	}
	
	fetch(uri, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body)
	})
	.then((response) => response.json())
	.then((responseJson) => {
		if (isLoading) {
			RNProgressHUB.dismiss()
		};
		cb && cb(responseJson)
	})
	.catch((error) => {
		if (isLoading) {
			RNProgressHUB.dismiss()
		};
	})
}

let postXML = (url, body, isLoading=false, cb, err=null) => {
	if (isLoading) {
		RNProgressHUB.showSpinIndeterminate()
	};

	let uri = API_TRX_URL
	if(url){
		uri = `${API_TRX_URL}${urls[url]}`
	}
	
	fetch(uri, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/xml'
		},
		body: body
	})
	.then((response) => response.text())
	.then((responseXML) => {
		if (isLoading) {
			RNProgressHUB.dismiss()
		};

		xml2js.parseString(responseXML, (err, result) => {
			cb && cb(result)
		})
	})
	.catch((error) => {
		if (isLoading) {
			RNProgressHUB.dismiss()
		}

		err && err()
	})
}

export {getApi, postApi, postXML}