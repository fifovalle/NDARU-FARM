import { useState } from "react";
import { toast } from "react-toastify";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/lib/firebaseConfig";

export default function useTambahBerita() {
  const [gambarBerita, setGambarBerita] = useState(null);
  const [judul, setJudul] = useState("");
  const [tanggalTerbit, setTanggalTerbit] = useState("");
  const [kategori, setKategori] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [sedangMemuatTambahBerita, setSedangMemuatTambahBerita] =
    useState(false);

  const tanganiGambarBerita = (event) => {
    const file = event.target.files[0];
    if (file) {
      const ukuranFile = file.size / (1024 * 1024);
      if (ukuranFile > 2) {
        toast.error("Ukuran gambar tidak boleh lebih dari 2 MB");
        setGambarBerita(null);
      } else {
        setGambarBerita(file);
      }
    }
  };

  const validasiFormulir = () => {
    if (!judul) {
      toast.error("Masukkan judul berita");
      return false;
    }
    if (!tanggalTerbit) {
      toast.error("Masukkan tanggal terbit berita");
      return false;
    }
    if (!kategori) {
      toast.error("Pilih kategori berita");
      return false;
    }
    if (!deskripsi) {
      toast.error("Masukkan deskripsi berita");
      return false;
    }
    if (!gambarBerita) {
      toast.error("Unggah gambar berita");
      return false;
    }
    return true;
  };

  const tambahBerita = async () => {
    setSedangMemuatTambahBerita(true);

    if (!validasiFormulir()) {
      setSedangMemuatTambahBerita(false);
      return;
    }

    try {
      const gambarUnik = `${Date.now()}_${gambarBerita.name}`;
      const storageRef = ref(storage, `Gambar_Berita/${gambarUnik}`);

      await uploadBytes(storageRef, gambarBerita);

      const urlGambar = await getDownloadURL(storageRef);

      const beritaRef = collection(db, "berita");
      await addDoc(beritaRef, {
        Judul: judul,
        Tanggal_Terbit: tanggalTerbit,
        Kategori: kategori,
        Deskripsi: deskripsi,
        Gambar: urlGambar,
        Tanggal_Dibuat: serverTimestamp(),
      });

      toast.success("Berita berhasil ditambahkan!");
      setJudul("");
      setTanggalTerbit("");
      setKategori("");
      setDeskripsi("");
      setGambarBerita(null);
    } catch (error) {
      toast.error("Gagal menambahkan berita: " + error.message);
    } finally {
      setSedangMemuatTambahBerita(false);
    }
  };

  return {
    judul,
    setJudul,
    tanggalTerbit,
    setTanggalTerbit,
    kategori,
    setKategori,
    deskripsi,
    setDeskripsi,
    gambarBerita,
    tanganiGambarBerita,
    sedangMemuatTambahBerita,
    tambahBerita,
  };
}
