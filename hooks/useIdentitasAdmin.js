import { useState, useEffect } from "react";
import { setDoc, serverTimestamp, doc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebaseConfig";
import { toast } from "react-toastify";
import { getAuth } from "firebase/auth";

export function useIdentitasAdmin() {
  const pengarah = useRouter();
  const [namaDepan, setNamaDepan] = useState("");
  const [namaBelakang, setNamaBelakang] = useState("");
  const [nomorPonsel, setNomorPonsel] = useState("");
  const [sedangMemuatTambahAdmin, setSedangMemuatTambahAdmin] = useState(false);
  const [email, setEmail] = useState("");
  const [uid, setUid] = useState("");

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      setEmail(user.email);
      setUid(user.uid);
    }
  }, []);

  const apakahNomorPonselValid = (nomorPonsel) => {
    return nomorPonsel.length >= 10 && /^[0-9]+$/.test(nomorPonsel);
  };

  const tambahAdmin = async () => {
    if (!namaDepan || !namaBelakang) {
      toast.error("Nama depan dan nama belakang wajib diisi.");
      return;
    }

    if (!apakahNomorPonselValid(nomorPonsel)) {
      toast.error("Nomor ponsel tidak valid. Pastikan minimal 10 digit.");
      return;
    }

    try {
      setSedangMemuatTambahAdmin(true);

      await setDoc(doc(db, "admin", uid), {
        Nama_Depan: namaDepan,
        Nama_Belakang: namaBelakang,
        Nomor_Ponsel: nomorPonsel,
        Peran_Admin: "Admin",
        Tanggal_Dibuat: serverTimestamp(),
        Email: email,
      });

      toast.success("Data admin berhasil disimpan");
      pengarah.push("/beranda");

      setNamaDepan("");
      setNamaBelakang("");
      setNomorPonsel("");
    } catch (error) {
      toast.error("Gagal menyimpan data admin: " + error.message);
    } finally {
      setSedangMemuatTambahAdmin(false);
    }
  };

  return {
    namaDepan,
    setNamaDepan,
    namaBelakang,
    setNamaBelakang,
    nomorPonsel,
    setNomorPonsel,
    sedangMemuatTambahAdmin,
    tambahAdmin,
  };
}
