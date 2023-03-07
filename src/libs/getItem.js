import {AsyncStorage} from 'react-native';
import CryptoJS from 'crypto-js';

export default (storage: string, cb) => {
	return new Promise((resolve, reject) => {
		AsyncStorage.getItem(storage, (err: ?Error, result) => {
			if (result) {
				// cb && cb(JSON.parse(result))
    		// resolve(JSON.parse(result))
				try{
					let bytes = CryptoJS.AES.decrypt(result, '2badfdf8-5d76-4c49-81cd-c7c3588eebc2')
					result = bytes.toString(CryptoJS.enc.Utf8)
					cb && cb(JSON.parse(result))
					resolve(JSON.parse(result))
				}catch(err){
					cb && cb('')
					resolve('')
				}
			}else{
				cb && cb('')
				resolve('')
			}
		})
	})
}