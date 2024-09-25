export const hitungDataGrafikSayuran = (
  rentang,
  hitungSayuranBerdasarkanTanggal
) => {
  const tanggalSaatIni = new Date();
  let hitungParaSayuran = [];

  switch (rentang) {
    case "1 tahun":
      for (let i = 0; i < 12; i++) {
        const tanggal = new Date(tanggalSaatIni.getFullYear(), i, 1);
        hitungParaSayuran.push(hitungSayuranBerdasarkanTanggal(tanggal));
      }
      break;
    case "1 bulan":
      for (let i = 0; i < 4; i++) {
        const tanggal = new Date(
          tanggalSaatIni.getFullYear(),
          tanggalSaatIni.getMonth(),
          1 + i * 7
        );
        hitungParaSayuran.push(hitungSayuranBerdasarkanTanggal(tanggal));
      }
      break;
    case "1 minggu":
      for (let i = 0; i < 7; i++) {
        const tanggal = new Date(
          tanggalSaatIni.getFullYear(),
          tanggalSaatIni.getMonth(),
          tanggalSaatIni.getDate() - i
        );
        hitungParaSayuran.push(hitungSayuranBerdasarkanTanggal(tanggal));
      }
      break;
    default:
      break;
  }

  return hitungParaSayuran;
};
