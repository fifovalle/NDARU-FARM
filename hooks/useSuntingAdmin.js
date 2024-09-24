import { useState, useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import { toast } from "react-toastify";

export default function useSuntingAdmin(idAdmin = null) {
  const [namaDepan, setNamaDepan] = useState("");
  const [namaBelakang, setNamaBelakang] = useState("");
  const [namaPengguna, setNamaPengguna] = useState("");
  const [email, setEmail] = useState("");
  const [kataSandi, setKataSandi] = useState("");
  const [konfirmasiKataSandi, setKonfirmasiKataSandi] = useState("");
  const [nomorPonsel, setNomorPonsel] = useState("");
  const [jenisKelamin, setJenisKelamin] = useState("");

  const apakahEmailValid = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const apakahNomorPonselValid = (nomorPonsel) => {
    return nomorPonsel.length >= 10 && /^[0-9]+$/.test(nomorPonsel);
  };

  const ambilDataAdmin = async (id) => {
    if (!id) return;

    try {
      const docRef = doc(db, "admin", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setNamaDepan(data.Nama_Depan);
        setNamaBelakang(data.Nama_Belakang);
        setNamaPengguna(data.Nama_Pengguna);
        setEmail(data.Email);
        setKataSandi(data.Kata_Sandi);
        setKonfirmasiKataSandi(data.Konfirmasi_Kata_Sandi);
        setNomorPonsel(data.Nomor_Ponsel);
        setJenisKelamin(data.Jenis_Kelamin);
      } else {
        toast.error("Data admin tidak ditemukan.");
      }
    } catch (error) {
      toast.error("Gagal mengambil data admin: " + error.message);
    }
  };

  const simpanDataAdmin = async () => {
    if (!namaDepan || !namaBelakang) {
      toast.error("Nama depan dan nama belakang wajib diisi.");
      return;
    }

    if (!namaPengguna || namaPengguna.length < 4) {
      toast.error("Nama pengguna minimal harus terdiri dari 4 karakter.");
      return;
    }

    if (!apakahEmailValid(email)) {
      toast.error("Format email tidak valid.");
      return;
    }

    if (kataSandi !== konfirmasiKataSandi) {
      toast.error("Kata sandi dan konfirmasi kata sandi tidak cocok.");
      return;
    }

    if (kataSandi.length < 8) {
      toast.error("Kata sandi minimal harus terdiri dari 8 karakter.");
      return;
    }

    if (!apakahNomorPonselValid(nomorPonsel)) {
      toast.error("Nomor ponsel tidak valid. Pastikan minimal 10 digit.");
      return;
    }

    if (!jenisKelamin) {
      toast.error("Jenis kelamin wajib diisi.");
      return;
    }

    try {
      if (idAdmin) {
        const docRef = doc(db, "admin", idAdmin);
        await updateDoc(docRef, {
          Nama_Depan: namaDepan,
          Nama_Belakang: namaBelakang,
          Nama_Pengguna: namaPengguna,
          Email: email,
          Kata_Sandi: kataSandi,
          Nomor_Ponsel: nomorPonsel,
          Jenis_Kelamin: jenisKelamin,
          Tanggal_Diperbarui: new Date(),
        });
        toast.success("Data admin berhasil diperbarui");
      }
    } catch (error) {
      toast.error("Gagal menyimpan data admin: " + error.message);
    }
  };

  useEffect(() => {
    if (idAdmin) {
      ambilDataAdmin(idAdmin);
    }
  }, [idAdmin]);

  return {
    namaDepan,
    setNamaDepan,
    namaBelakang,
    setNamaBelakang,
    namaPengguna,
    setNamaPengguna,
    email,
    setEmail,
    kataSandi,
    setKataSandi,
    konfirmasiKataSandi,
    setKonfirmasiKataSandi,
    nomorPonsel,
    setNomorPonsel,
    jenisKelamin,
    setJenisKelamin,
    simpanDataAdmin,
  };
}
