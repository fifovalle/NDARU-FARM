import { useState } from "react";
import { toast } from "react-toastify";
import { doc, deleteDoc, getDoc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { db, storage } from "@/lib/firebaseConfig";

export default function useHapusSaranaPertanian(idSaranaPertanian) {
  const [
    sedangMemuatHapusSaranaPertanian,
    setSedangMemuatHapusSaranaPertanian,
  ] = useState(false);

  const hapusSaranaPertanian = async () => {
    setSedangMemuatHapusSaranaPertanian(true);

    try {
      const saranaPertanianRef = doc(db, "sarana_pertanian", idSaranaPertanian);
      const docSnap = await getDoc(saranaPertanianRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        const gambarLama = data.Gambar;

        if (gambarLama) {
          const gambarRef = ref(storage, gambarLama);
          await deleteObject(gambarRef);
        }

        await deleteDoc(saranaPertanianRef);
        toast.success("Sarana Pertanian berhasil dihapus!");
      } else {
        toast.error("Data sarana pertanian tidak ditemukan!");
      }
    } catch (error) {
      toast.error("Gagal menghapus sarana pertanian: " + error.message);
    } finally {
      setSedangMemuatHapusSaranaPertanian(false);
    }
  };

  return {
    sedangMemuatHapusSaranaPertanian,
    hapusSaranaPertanian,
  };
}
