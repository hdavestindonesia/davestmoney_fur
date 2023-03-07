export default (date, thankYouPage, semicolon) => {
	// "2017-08-02T13:00:00.188215"
	let tanggal = date.split('T')[0]
	let waktu = date.split('T')[1]
	let waktuArray = waktu.split('.')[0].split(':')
	let hour = waktuArray[0]
	let minute = waktuArray[1]
	let second = waktuArray[2]
	if (semicolon) {
		return `${hour}:${minute}`
	} else if (thankYouPage) {
		let foo = waktu.split('.')[0]
		return foo.substring(0, foo.length - 3)
	} else {
		return `${hour}${minute}`
	}
}