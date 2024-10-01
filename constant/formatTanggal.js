export const formatTanggal = (timestamp) => {
  const tanggal = timestamp.toDate();
  const pilihan = { month: "long", day: "2-digit", year: "numeric" };
  return tanggal.toLocaleDateString("id-ID", pilihan);
};
