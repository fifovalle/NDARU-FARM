import { useState } from "react";
import { toast } from "react-toastify";
import { doc, deleteDoc, getDoc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { db, storage } from "@/lib/firebaseConfig";

export default function useHapusBerita(idBerita) {
  const [sedangMemuatHapusBerita, setSedangMemuatHapusBerita] = useState(false);

  const hapusBerita = async () => {
    setSedangMemuatHapusBerita(true);

    try {
      const beritaRef = doc(db, "berita", idBerita);
      const docSnap = await getDoc(beritaRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        const gambarLama = data.Gambar;

        if (gambarLama) {
          const gambarRef = ref(storage, gambarLama);
          await deleteObject(gambarRef);
        }

        await deleteDoc(beritaRef);
        toast.success("Berita berhasil dihapus!");
      } else {
        toast.error("Data berita tidak ditemukan!");
      }
    } catch (error) {
      toast.error("Gagal menghapus berita: " + error.message);
    } finally {
      setSedangMemuatHapusBerita(false);
    }
  };

  return {
    sedangMemuatHapusBerita,
    hapusBerita,
  };
}
