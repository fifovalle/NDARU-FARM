import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import { toast } from "react-toastify";

export default function useTampilkanBerita() {
  const [tampilkanDataBerita, setTampilkanDataBerita] = useState([]);
  const [sedangMemuatTampilkanDataBerita, setSedangMemuatTampilkanDataBerita] =
    useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "berita"),
      (snapshot) => {
        setSedangMemuatTampilkanDataBerita(true);
        const beritaData = [];

        snapshot.forEach((doc) => {
          const data = doc.data();
          if (data.Tanggal_Terbit && data.Tanggal_Terbit.toDate) {
            data.Tanggal_Terbit =
              data.Tanggal_Terbit.toDate().toLocaleDateString("id-ID");
          }
          beritaData.push({ id: doc.id, ...data });
        });

        setTampilkanDataBerita(beritaData);
        setSedangMemuatTampilkanDataBerita(false);
      },
      (error) => {
        toast.error("Gagal mengambil data berita: " + error.message);
        setSedangMemuatTampilkanDataBerita(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return { tampilkanDataBerita, sedangMemuatTampilkanDataBerita };
}
