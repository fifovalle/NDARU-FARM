import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import { toast } from "react-toastify";

export default function useTampilkanAdmin() {
  const [tampilkanDataAdmin, setTampilkanDataAdmin] = useState([]);
  const [sedangMemuatTampilkanDataAdmin, setSedangMemuatTampilkanDataAdmin] =
    useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "admin"),
      (snapshot) => {
        const adminData = [];
        snapshot.forEach((doc) => {
          adminData.push({ id: doc.id, ...doc.data() });
        });
        setTampilkanDataAdmin(adminData);
        setSedangMemuatTampilkanDataAdmin(false);
      },
      (error) => {
        toast.error(
          "Gagal mengambil data admin secara real-time: " + error.message
        );
        setSedangMemuatTampilkanDataAdmin(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const hitungAdminBerdasarkanTanggal = (tanggal) => {
    const tanggalFilter = new Date(tanggal).setHours(0, 0, 0, 0);
    const tanggalNext = new Date(tanggal).setHours(23, 59, 59, 999);

    const hitung = tampilkanDataAdmin.filter((admin) => {
      const tanggalPembuatan = admin.Tanggal_Pembuatan
        ? admin.Tanggal_Pembuatan.toDate()
        : new Date(admin.Tanggal_Pembuatan);

      if (isNaN(tanggalPembuatan.getTime())) {
        console.warn(
          `Tanggal Pembuatan tidak valid untuk admin ID: ${admin.id}`
        );
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
    tampilkanDataAdmin,
    sedangMemuatTampilkanDataAdmin,
    hitungAdminBerdasarkanTanggal,
  };
}
