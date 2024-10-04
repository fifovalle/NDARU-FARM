import { useState } from "react";
import { toast } from "react-toastify";
import { doc, deleteDoc, getDoc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { db, storage } from "@/lib/firebaseConfig";

export default function useHapusAdmin(idAdmin) {
  const [sedangMemuatHapusAdmin, setSedangMemuatHapusAdmin] = useState(false);

  const hapusAdmin = async () => {
    setSedangMemuatHapusAdmin(true);

    try {
      const adminRef = doc(db, "admin", idAdmin);
      const docSnap = await getDoc(adminRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        const gambarLama = data.Gambar;

        if (gambarLama) {
          const gambarRef = ref(storage, gambarLama);
          await deleteObject(gambarRef);
        }

        await deleteDoc(adminRef);
        toast.success("Admin berhasil dihapus!");
      } else {
        toast.error("Data admin tidak ditemukan!");
      }
    } catch (error) {
      toast.error("Gagal menghapus admin: " + error.message);
    } finally {
      setSedangMemuatHapusAdmin(false);
    }
  };

  return {
    sedangMemuatHapusAdmin,
    hapusAdmin,
  };
}
