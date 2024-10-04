import { useState, useEffect } from "react";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";

export default function useTampilkanBerita() {
  const [tampilkanDataBerita, setTampilkanDataBerita] = useState([]);
  const [sedangMemuatTampilkanDataBerita, setSedangMemuatTampilkanDataBerita] =
    useState(true);
  const firestore = getFirestore();

  useEffect(() => {
    const ambilBerita = onSnapshot(
      collection(firestore, "berita"),
      (querySnapshot) => {
        const berita = [];
        querySnapshot.forEach((documentSnapshot) => {
          berita.push({
            ...documentSnapshot.data(),
            id: documentSnapshot.id,
          });
        });

        setTampilkanDataBerita(berita);
        setSedangMemuatTampilkanDataBerita(false);
      }
    );

    return () => ambilBerita();
  }, [firestore]);

  const hitungBeritaBerdasarkanTanggal = (tanggal) => {
    const tanggalFilter = new Date(tanggal).setHours(0, 0, 0, 0);
    const tanggalNext = new Date(tanggal).setHours(23, 59, 59, 999);

    const hitung = tampilkanDataBerita.filter((berita) => {
      const tanggalPembuatan = berita.Tanggal_Dibuat
        ? berita.Tanggal_Dibuat.toDate()
        : new Date(berita.Tanggal_Dibuat);

      return (
        tanggalPembuatan >= tanggalFilter && tanggalPembuatan <= tanggalNext
      );
    }).length;

    return hitung;
  };

  return {
    tampilkanDataBerita,
    hitungBeritaBerdasarkanTanggal,
    sedangMemuatTampilkanDataBerita,
  };
}
