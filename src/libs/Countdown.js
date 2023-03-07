export default (days, hours, minutes, seconds) =>  {
	let hari = ''
	if (days > 0) {
		hari = `${days} Hari `
	}

	let jam = ''
	if (hours > 0) {
		jam = `${hours} Jam `
	}

	let menit = ''
	if (minutes > 0) {
		menit = `${minutes} Menit `
	}

	let detik = ''
	if (seconds > 0) {
		detik = `${seconds} Detik`
	}

	return `${hari}${jam}${menit}${detik}`
}