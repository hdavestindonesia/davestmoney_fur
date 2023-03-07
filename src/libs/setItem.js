import {AsyncStorage} from 'react-native';
import CryptoJS from 'crypto-js';

//export default (key, value, cb) => AsyncStorage.setItem(key, JSON.stringify(value), () => cb && cb())


export default (key, value, cb) => {
	value = JSON.stringify(value)

	value = CryptoJS.AES.encrypt(value, '2badfdf8-5d76-4c49-81cd-c7c3588eebc2').toString()

	AsyncStorage.setItem(key, value, () => cb && cb())
}