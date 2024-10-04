import { useState, useEffect } from "react";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";

export default function useTampilkanAdmin() {
  const [tampilkanDataAdmin, setTampilkanDataAdmin] = useState([]);
  const [sedangMemuatTampilkanDataAdmin, setSedangMemuatTampilkanDataAdmin] =
    useState(true);
  const firestore = getFirestore();

  useEffect(() => {
    const ambilAdmin = onSnapshot(
      collection(firestore, "admin"),
      (querySnapshot) => {
        const admin = [];
        querySnapshot.forEach((documentSnapshot) => {
          admin.push({
            ...documentSnapshot.data(),
            id: documentSnapshot.id,
          });
        });

        setTampilkanDataAdmin(admin);
        setSedangMemuatTampilkanDataAdmin(false);
      }
    );

    return () => ambilAdmin();
  }, [firestore]);

  const hitungAdminBerdasarkanTanggal = (tanggal) => {
    const tanggalFilter = new Date(tanggal).setHours(0, 0, 0, 0);
    const tanggalNext = new Date(tanggal).setHours(23, 59, 59, 999);

    const hitung = tampilkanDataAdmin.filter((admin) => {
      const tanggalPembuatan = admin.Tanggal_Dibuat
        ? admin.Tanggal_Dibuat.toDate()
        : new Date(admin.Tanggal_Dibuat);

      return (
        tanggalPembuatan >= tanggalFilter && tanggalPembuatan <= tanggalNext
      );
    }).length;

    return hitung;
  };

  return {
    tampilkanDataAdmin,
    hitungAdminBerdasarkanTanggal,
    sedangMemuatTampilkanDataAdmin,
  };
}
