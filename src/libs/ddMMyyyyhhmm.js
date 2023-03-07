export default (input) =>  {
	let date = new Date(input.split('T')[0])
	let tanggal = date.getDate()
	if (tanggal.toString().length == 1) {
		tanggal = `0${tanggal}`
	}
	let bulan = date.getMonth() + 1
	if (bulan.toString().length == 1) {
		bulan = `0${bulan}`
	}
	let year = date.getFullYear()

	let waktu = input.split('T')[1]
	let waktuArray = waktu.split('.')[0].split(':')
	let hour = waktuArray[0]
	let minute = waktuArray[1]
	let second = waktuArray[2]

	return `${tanggal}${bulan}${year}${hour}${minute}`
}