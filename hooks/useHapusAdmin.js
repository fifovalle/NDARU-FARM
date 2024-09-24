import { useState } from "react";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import { toast } from "react-toastify";

export default function useHapusAdmin() {
  const [sedangMemuatHapusDataAdmin, setsedangMemuatHapusDataAdmin] =
    useState(false);

  const hapusDataAdmin = async (adminId) => {
    setsedangMemuatHapusDataAdmin(true);
    try {
      const adminDoc = doc(db, "admin", adminId);
      await deleteDoc(adminDoc);
      toast.success("Admin berhasil dihapus.");
    } catch (error) {
      toast.error("Terjadi kesalahan saat menghapus admin.");
      console.error("Error deleting admin: ", error);
    } finally {
      setsedangMemuatHapusDataAdmin(false);
    }
  };

  return { hapusDataAdmin, sedangMemuatHapusDataAdmin };
}
