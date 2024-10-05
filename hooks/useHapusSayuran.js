import { useState } from "react";
import { toast } from "react-toastify";
import { doc, deleteDoc, getDoc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { db, storage } from "@/lib/firebaseConfig";

export default function useHapusSayuran(idSayuran) {
  const [sedangMemuatHapusSayuran, setSedangMemuatHapusSayuran] =
    useState(false);

  const hapusSayuran = async () => {
    setSedangMemuatHapusSayuran(true);

    try {
      const sayuranRef = doc(db, "sayuran", idSayuran);
      const docSnap = await getDoc(sayuranRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        const gambarLama = data.Gambar;

        if (gambarLama) {
          const gambarRef = ref(storage, gambarLama);
          await deleteObject(gambarRef);
        }

        await deleteDoc(sayuranRef);
        toast.success("Sayuran berhasil dihapus!");
      } else {
        toast.error("Data sayuran tidak ditemukan!");
      }
    } catch (error) {
      toast.error("Gagal menghapus sayuran: " + error.message);
    } finally {
      setSedangMemuatHapusSayuran(false);
    }
  };

  return {
    sedangMemuatHapusSayuran,
    hapusSayuran,
  };
}
