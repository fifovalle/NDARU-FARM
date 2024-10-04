export const formatTanggal = (timestamp) => {
  if (!timestamp || typeof timestamp.toDate !== "function") {
    return "Tanggal tidak tersedia";
  }

  const date = timestamp.toDate();
  const hari = date.getDate();
  const bulan = date.toLocaleString("id-ID", { month: "long" });
  const tahun = date.getFullYear();

  return `${hari} ${bulan} ${tahun}`;
};
