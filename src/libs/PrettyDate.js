export default (date, day=true, noyear=false) => {
  var namaBulan = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
	var namaBulanLengkap = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
  var namaHari = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  date = new Date(date)
  var hari = date.getDate();
  var indexBulan = date.getMonth();
  var indexHari = date.getDay();
  var tahun = date.getFullYear();
  if (day) {
  	return `${namaHari[indexHari]}, ${hari} ${namaBulan[indexBulan]} ${tahun}`;
  } else if (noyear) {
    return `${namaHari[indexHari]}, ${hari} ${namaBulanLengkap[indexBulan]}`;
  } else {
  	return `${hari} ${namaBulan[indexBulan]} ${tahun}`;
  };
}