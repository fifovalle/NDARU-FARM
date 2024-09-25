import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import { toast } from "react-toastify";

export default function useTampilkanJasa() {
  const [tampilkanDataJasa, setTampilkanDataJasa] = useState([]);
  const [sedangMemuatTampilkanDataJasa, setSedangMemuatTampilkanDataJasa] =
    useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "jasa"),
      (snapshot) => {
        const jasaData = [];
        snapshot.forEach((doc) => {
          jasaData.push({ id: doc.id, ...doc.data() });
        });
        setTampilkanDataJasa(jasaData);
        setSedangMemuatTampilkanDataJasa(false);
      },
      (error) => {
        toast.error(
          "Gagal mengambil data jasa secara real-time: " + error.message
        );
        setSedangMemuatTampilkanDataJasa(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const hitungJasaBerdasarkanTanggal = (tanggal) => {
    const tanggalFilter = new Date(tanggal).setHours(0, 0, 0, 0);
    const tanggalNext = new Date(tanggal).setHours(23, 59, 59, 999);

    const hitung = tampilkanDataJasa.filter((jasa) => {
      const tanggalPembuatan = jasa.Tanggal_Pembuatan
        ? jasa.Tanggal_Pembuatan.toDate()
        : new Date(jasa.Tanggal_Pembuatan);

      if (isNaN(tanggalPembuatan.getTime())) {
        console.warn(`Tanggal Pembuatan tidak valid untuk jasa ID: ${jasa.id}`);
        return false;
      }

      return (
        tanggalPembuatan.getTime() >= tanggalFilter &&
        tanggalPembuatan.getTime() <= tanggalNext
      );
    }).length;

    return hitung;
  };

  return {
    tampilkanDataJasa,
    sedangMemuatTampilkanDataJasa,
    hitungJasaBerdasarkanTanggal,
  };
}
