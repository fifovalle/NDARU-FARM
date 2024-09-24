export const hitungDataGrafikAdmin = (
  rentang,
  hitungAdminBerdasarkanTanggal
) => {
  const tanggalSaatIni = new Date();
  let hitungParaAdmin = [];

  switch (rentang) {
    case "1 tahun":
      for (let i = 0; i < 12; i++) {
        const tanggal = new Date(tanggalSaatIni.getFullYear(), i, 1);
        hitungParaAdmin.push(hitungAdminBerdasarkanTanggal(tanggal));
      }
      break;
    case "1 bulan":
      for (let i = 0; i < 4; i++) {
        const tanggal = new Date(
          tanggalSaatIni.getFullYear(),
          tanggalSaatIni.getMonth(),
          1 + i * 7
        );
        hitungParaAdmin.push(hitungAdminBerdasarkanTanggal(tanggal));
      }
      break;
    case "1 minggu":
      for (let i = 0; i < 7; i++) {
        const tanggal = new Date(
          tanggalSaatIni.getFullYear(),
          tanggalSaatIni.getMonth(),
          tanggalSaatIni.getDate() - i
        );
        hitungParaAdmin.push(hitungAdminBerdasarkanTanggal(tanggal));
      }
      break;
    default:
      break;
  }

  return hitungParaAdmin;
};
