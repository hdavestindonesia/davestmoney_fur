export default (input) =>  {
	let date = new Date(input)
	let tanggal = date.getDate()
	if (tanggal.toString().length == 1) {
		tanggal = `0${tanggal}`
	}
	let bulan = date.getMonth() + 1
	if (bulan.toString().length == 1) {
		bulan = `0${bulan}`
	}
	let year = date.getFullYear()

	return `${tanggal}${bulan}${year}`
}