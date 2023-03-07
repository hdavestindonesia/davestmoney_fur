export default (date) => {
	// "2017-08-02T13:00:00.188215"
  var namaBulan = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
  var namaHari = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  let tanggal = date.split('T')[0]
  let tanggalArray = tanggal.split('-')
  let date = tanggalArray[2]
  let month = tanggalArray[1]
  let year = tanggalArray[0]
  var hari = date.getDate();

  var indexBulan = Number(month) - 1
  var indexHari = Number(month) - 1
  var indexHari = date.getDay();
  var tahun = date.getFullYear();
  if (day) {
  	return `${namaHari[indexHari]}, ${hari} ${namaBulan[indexBulan]} ${tahun}`;
  } else {
  	return `${hari} ${namaBulan[indexBulan]} ${tahun}`;
  };
}