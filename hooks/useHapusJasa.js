import { useState } from "react";
import { toast } from "react-toastify";
import { doc, deleteDoc, getDoc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { db, storage } from "@/lib/firebaseConfig";

export default function useHapusJasa(jasaId) {
  const [sedangMemuatHapusJasa, setSedangMemuatHapusJasa] = useState(false);

  const hapusJasa = async () => {
    setSedangMemuatHapusJasa(true);

    try {
      const jasaRef = doc(db, "jasa", jasaId);
      const docSnap = await getDoc(jasaRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        const gambarLama = data.Gambar;

        if (gambarLama) {
          const gambarRef = ref(storage, gambarLama);
          await deleteObject(gambarRef);
        }

        await deleteDoc(jasaRef);
        toast.success("Jasa berhasil dihapus!");
      } else {
        toast.error("Data jasa tidak ditemukan!");
      }
    } catch (error) {
      toast.error("Gagal menghapus jasa: " + error.message);
    } finally {
      setSedangMemuatHapusJasa(false);
    }
  };

  return {
    sedangMemuatHapusJasa,
    hapusJasa,
  };
}
