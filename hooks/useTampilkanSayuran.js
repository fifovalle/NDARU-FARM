import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import { toast } from "react-toastify";

export default function useTampilkanSayuran() {
  const [tampilkanDataSayuran, setTampilkanDataSayuran] = useState([]);
  const [
    sedangMemuatTampilkanDataSayuran,
    setSedangMemuatTampilkanDataSayuran,
  ] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "sayuran"),
      (snapshot) => {
        setSedangMemuatTampilkanDataSayuran(true);
        const sayuranData = [];

        snapshot.forEach((doc) => {
          const data = doc.data();
          sayuranData.push({ id: doc.id, ...data });
        });

        setTampilkanDataSayuran(sayuranData);
        setSedangMemuatTampilkanDataSayuran(false);
      },
      (error) => {
        toast.error("Gagal mengambil data sayuran: " + error.message);
        setSedangMemuatTampilkanDataSayuran(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return { tampilkanDataSayuran, sedangMemuatTampilkanDataSayuran };
}
