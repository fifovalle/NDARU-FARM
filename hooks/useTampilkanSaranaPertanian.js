import { useState, useEffect } from "react";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";

export default function useTampilkanSaranaPertanian() {
  const [tampilkanDataSaranaPertanian, setTampilkanDataSaranaPertanian] =
    useState([]);
  const [
    sedangMemuatTampilkanDataSaranaPertanian,
    setSedangMemuatTampilkanDataSaranaPertanian,
  ] = useState(true);
  const firestore = getFirestore();

  useEffect(() => {
    const ambilSaranaPertanian = onSnapshot(
      collection(firestore, "sarana_pertanian"),
      (querySnapshot) => {
        const saranaPertanian = [];
        querySnapshot.forEach((documentSnapshot) => {
          saranaPertanian.push({
            ...documentSnapshot.data(),
            id: documentSnapshot.id,
          });
        });

        setTampilkanDataSaranaPertanian(saranaPertanian);
        setSedangMemuatTampilkanDataSaranaPertanian(false);
      }
    );

    return () => ambilSaranaPertanian();
  }, [firestore]);

  const hitungSaranaPertanianBerdasarkanTanggal = (tanggal) => {
    const tanggalFilter = new Date(tanggal).setHours(0, 0, 0, 0);
    const tanggalNext = new Date(tanggal).setHours(23, 59, 59, 999);

    const hitung = tampilkanDataSaranaPertanian.filter((saranaPertanian) => {
      const tanggalPembuatan = saranaPertanian.Tanggal_Dibuat
        ? saranaPertanian.Tanggal_Dibuat.toDate()
        : new Date(saranaPertanian.Tanggal_Dibuat);

      return (
        tanggalPembuatan >= tanggalFilter && tanggalPembuatan <= tanggalNext
      );
    }).length;

    return hitung;
  };

  return {
    tampilkanDataSaranaPertanian,
    hitungSaranaPertanianBerdasarkanTanggal,
    sedangMemuatTampilkanDataSaranaPertanian,
  };
}
