import setItem from './setItem';

export default (cb) =>  {
	setItem('COUNTER', 0)
	setItem('ACCESS_TOKEN', null)
	setItem('USER', null)
	setItem('SECURITY_CODE', null)
	setItem('DEVICE_INFO', null)
	setItem('NOTIFICATIONS', null)

	cb && cb('')
}