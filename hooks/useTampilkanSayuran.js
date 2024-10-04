import { useState, useEffect } from "react";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";

export default function useTampilkanSayuran() {
  const [tampilkanDataSayuran, setTampilkanDataSayuran] = useState([]);
  const [
    sedangMemuatTampilkanDataSayuran,
    setSedangMemuatTampilkanDataSayuran,
  ] = useState(true);
  const firestore = getFirestore();

  useEffect(() => {
    const ambilSayuran = onSnapshot(
      collection(firestore, "sayuran"),
      (querySnapshot) => {
        const sayuran = [];
        querySnapshot.forEach((documentSnapshot) => {
          sayuran.push({
            ...documentSnapshot.data(),
            id: documentSnapshot.id,
          });
        });

        setTampilkanDataSayuran(sayuran);
        setSedangMemuatTampilkanDataSayuran(false);
      }
    );

    return () => ambilSayuran();
  }, [firestore]);

  const hitungSayuranBerdasarkanTanggal = (tanggal) => {
    const tanggalFilter = new Date(tanggal).setHours(0, 0, 0, 0);
    const tanggalNext = new Date(tanggal).setHours(23, 59, 59, 999);

    const hitung = tampilkanDataSayuran.filter((sayuran) => {
      const tanggalPembuatan = sayuran.Tanggal_Dibuat
        ? sayuran.Tanggal_Dibuat.toDate()
        : new Date(sayuran.Tanggal_Dibuat);

      return (
        tanggalPembuatan >= tanggalFilter && tanggalPembuatan <= tanggalNext
      );
    }).length;

    return hitung;
  };

  return {
    tampilkanDataSayuran,
    hitungSayuranBerdasarkanTanggal,
    sedangMemuatTampilkanDataSayuran,
  };
}
