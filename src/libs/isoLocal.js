import {isNumber} from 'lodash';

export default (input) =>  {
	let a = input ? input : Date.now()
	if (!isNumber(a)) {
		a = a.getTime()
	};
	let b = a + (7*60*60*1000)
	return new Date(b).toISOString()
}