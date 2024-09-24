export const formatNomorPonsel = (nomor) => {
  nomor = nomor.replace(/[^0-9]/g, "");

  if (nomor.startsWith("0")) {
    nomor = nomor.substring(1);
  }

  let nomorPonselSetelahDiFormat = `+62 ${nomor}`;

  nomorPonselSetelahDiFormat = nomorPonselSetelahDiFormat.replace(
    /(\+62 \d{3})(\d{4})(\d{3})/,
    "$1-$2-$3"
  );

  return nomorPonselSetelahDiFormat;
};
