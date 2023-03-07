export default (input, thankYouPage, nosecond=false) =>  {
	let date = new Date(input)
	// console.log(date)
	let minute = date.getMinutes()
	if (minute.toString().length == 1) {
		minute = `0${minute}`
	}
	let hour = date.getHours()
	// console.log(hour)
	if (hour.toString().length == 1) {
		hour = `0${hour}`
	}
	let second = date.getSeconds()
	if (second.toString().length == 1) {
		second = `0${second}`
	}
	if (thankYouPage) {
		return `${hour}:${minute}:${second}`
	} else if (nosecond) {
		return `${hour}:${minute}`
	} else {
		return `${hour}${minute}`
	};
	
}