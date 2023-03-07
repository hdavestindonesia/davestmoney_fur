import getItem from './getItem';
import setItem from './setItem';

export default (cb) =>  {
	getItem('COUNTER', (counter) => {
		setItem('COUNTER', Number(counter + 1))
		cb && cb(Number(counter + 1))
	})
}