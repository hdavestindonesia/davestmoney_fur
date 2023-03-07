let namaBulan = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
let namaBulanLengkap = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
let namaHari = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

export default (input, format) =>  {
	if (!input) {
		input = Date.now()
	};
	let rawDate = new Date(input)
	let l = rawDate.toLocaleString().split(', ')
	let date = l[0]
	let arrDate = date.split('/')
	
	let time = l[1].split(' ')[0]
	let arrTime = time.split(':')

	if (l[1].includes('PM') && (l[1].slice(0,2) !== '12')) {
		arrTime[0] = Number(arrTime[0]) + 12
	};
	
	let format0 = `${arrDate[1]} ${namaBulan[arrDate[0] - 1]} ${arrDate[2]}`

	let HH = arrTime[0].toString()
	if (HH.length == 1) {
		HH = `0${HH}`
	};
	
	let mm = arrTime[1].toString()
	if (mm.length == 1) {
		mm = `0${mm}`
	};
	
	let ss = arrTime[2].toString()
	if (ss.length == 1) {
		ss = `0${ss}`
	};
	
	let format1 = `${HH}:${mm}`
	let format2 = `${HH}:${mm}:${ss}`
	if (format == '1 Jan 2000') {
		return format0
	} else if (format == '00:00') {
		return format1
	} else if (format == '1 Jan 2000, 00:00') {
		return `${format0}, ${format1}`
	} else if (format == '00:00:00') {
		return format2
	} else if (format == 'dd-MM-yyyy HH:mm:ss') {
		let dd = arrDate[1].toString()
		if (dd.length == 1) {
			dd = `0${dd}`
		};
		
		let MM = arrDate[0].toString()
		if (MM.length == 1) {
			MM = `0${MM}`
		};
		return `${dd}-${MM}-${arrDate[2]} ${format2}`
	};
}