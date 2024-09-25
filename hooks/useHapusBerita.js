import { useState } from "react";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import { toast } from "react-toastify";
import { getStorage, ref, deleteObject } from "firebase/storage";

export default function useHapusBerita() {
  const [sedangMemuatHapusDataBerita, setsedangMemuatHapusDataBerita] =
    useState(false);

  const hapusDataBerita = async (beritaId, urlGambar) => {
    setsedangMemuatHapusDataBerita(true);
    try {
      const beritaDoc = doc(db, "berita", beritaId);
      await deleteDoc(beritaDoc);
      toast.success("Berita berhasil dihapus.");

      if (urlGambar) {
        const storage = getStorage();
        const gambarRef = ref(storage, urlGambar);
        await deleteObject(gambarRef);
        toast.success("Gambar berhasil dihapus dari penyimpanan.");
      }
    } catch (error) {
      toast.error("Terjadi kesalahan saat menghapus berita.");
      console.error("Error deleting berita: ", error);
    } finally {
      setsedangMemuatHapusDataBerita(false);
    }
  };

  return { hapusDataBerita, sedangMemuatHapusDataBerita };
}
