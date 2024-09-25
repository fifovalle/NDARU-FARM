import { useState } from "react";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import { toast } from "react-toastify";
import { getStorage, ref, deleteObject } from "firebase/storage";

export default function useHapusJasa() {
  const [sedangMemuatHapusDataJasa, setsedangMemuatHapusDataJasa] =
    useState(false);

  const hapusDataJasa = async (idJasa, urlGambar) => {
    setsedangMemuatHapusDataJasa(true);
    try {
      const jasaDoc = doc(db, "jasa", idJasa);
      await deleteDoc(jasaDoc);
      toast.success("Jasa berhasil dihapus.");

      if (urlGambar) {
        const storage = getStorage();
        const gambarRef = ref(storage, urlGambar);
        await deleteObject(gambarRef);
        toast.success("Gambar berhasil dihapus dari penyimpanan.");
      }
    } catch (error) {
      toast.error("Terjadi kesalahan saat menghapus jasa.");
      console.error("Error deleting jasa: ", error);
    } finally {
      setsedangMemuatHapusDataJasa(false);
    }
  };

  return { hapusDataJasa, sedangMemuatHapusDataJasa };
}
