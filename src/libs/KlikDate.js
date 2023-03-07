export default (date, format) => {
  var namaBulan = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
	var namaBulanLengkap = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
  var namaHari = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  date = new Date(date)
  var hari = date.getDate();
  var indexBulan = date.getMonth();
  var indexHari = date.getDay();
  var tahun = date.getFullYear();

  if (format == 'dd-MMMM-yyyy') {
  	return `${hari}-${namaBulanLengkap[indexBulan]}-${tahun}`;
  }

  if (format == 'dd-MM-yyyy') {
    return `${hari}-${indexBulan + 1}-${tahun}`;
  }
}