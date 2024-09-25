import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import { toast } from "react-toastify";

export default function useTambahAdmin() {
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
      await addDoc(collection(db, "admin"), {
        Nama_Depan: namaDepan,
        Nama_Belakang: namaBelakang,
        Nama_Pengguna: namaPengguna,
        Email: email,
        Kata_Sandi: kataSandi,
        Konfirmasi_Kata_Sandi: konfirmasiKataSandi,
        Nomor_Ponsel: nomorPonsel,
        Jenis_Kelamin: jenisKelamin,
        Tanggal_Pembuatan: new Date(),
      });
      toast.success("Data admin berhasil disimpan");
    } catch (error) {
      toast.error("Gagal menyimpan data admin: " + error.message);
    }
  };

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
