export const hitungDataGrafik = (rentang, hitungBerdasarkanTanggal) => {
  const tanggalSaatIni = new Date();
  let hitung = [];

  switch (rentang) {
    case "1 tahun":
      for (let i = 0; i < 12; i++) {
        const tanggal = new Date(tanggalSaatIni.getFullYear(), i, 1);
        hitung.push(hitungBerdasarkanTanggal(tanggal));
      }
      break;
    case "1 bulan":
      for (let i = 0; i < 4; i++) {
        const tanggal = new Date(
          tanggalSaatIni.getFullYear(),
          tanggalSaatIni.getMonth(),
          1 + i * 7
        );
        hitung.push(hitungBerdasarkanTanggal(tanggal));
      }
      break;
    case "1 minggu":
      for (let i = 0; i < 7; i++) {
        const tanggal = new Date(tanggalSaatIni);
        tanggal.setDate(i);
        hitung.push(hitungBerdasarkanTanggal(tanggal));
      }
      break;
    default:
      break;
  }

  return hitung;
};
