import { useState, useEffect } from "react";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";

export default function useTampilkanJasa() {
  const [tampilkanDataJasa, setTampilkanDataJasa] = useState([]);
  const [sedangMemuatTampilkanDataJasa, setSedangMemuatTampilkanDataJasa] =
    useState(true);
  const firestore = getFirestore();

  useEffect(() => {
    const ambilJasa = onSnapshot(
      collection(firestore, "jasa"),
      (querySnapshot) => {
        const jasa = [];
        querySnapshot.forEach((documentSnapshot) => {
          jasa.push({
            ...documentSnapshot.data(),
            id: documentSnapshot.id,
          });
        });

        setTampilkanDataJasa(jasa);
        setSedangMemuatTampilkanDataJasa(false);
      }
    );

    return () => ambilJasa();
  }, [firestore]);

  const hitungJasaBerdasarkanTanggal = (tanggal) => {
    const tanggalFilter = new Date(tanggal).setHours(0, 0, 0, 0);
    const tanggalNext = new Date(tanggal).setHours(23, 59, 59, 999);

    const hitung = tampilkanDataJasa.filter((jasa) => {
      const tanggalPembuatan = jasa.Tanggal_Dibuat
        ? jasa.Tanggal_Dibuat.toDate()
        : new Date(jasa.Tanggal_Dibuat);

      return (
        tanggalPembuatan >= tanggalFilter && tanggalPembuatan <= tanggalNext
      );
    }).length;

    return hitung;
  };

  return {
    tampilkanDataJasa,
    hitungJasaBerdasarkanTanggal,
    sedangMemuatTampilkanDataJasa,
  };
}
