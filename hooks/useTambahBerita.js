import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db } from "@/lib/firebaseConfig";
import { toast } from "react-toastify";

export default function useTambahBerita() {
  const [judulBerita, setJudulBerita] = useState("");
  const [tanggalTerbit, setTanggalTerbit] = useState("");
  const [kategoriBerita, setKategoriBerita] = useState("");
  const [deskripsiBerita, setDeskripsiBerita] = useState("");
  const [gambarBerita, setGambarBerita] = useState(null);
  const [fileGambar, setFileGambar] = useState(null);

  const tanganiGambarBerita = (event) => {
    const file = event.target.files[0];
    if (file) {
      setGambarBerita(URL.createObjectURL(file));
      setFileGambar(file);
    }
  };

  const simpanDataBerita = async () => {
    try {
      let urlGambar = null;

      if (fileGambar) {
        const storage = getStorage();
        const namaYangUnik = `${Date.now()}-${fileGambar.name}`;
        const storageRef = ref(storage, `Gambar_Berita/${namaYangUnik}`);
        await uploadBytes(storageRef, fileGambar);
        urlGambar = await getDownloadURL(storageRef);
      }

      await addDoc(collection(db, "berita"), {
        Judul: judulBerita,
        Tanggal_Terbit: tanggalTerbit
          ? new Date(tanggalTerbit)
          : serverTimestamp(),
        Kategori: kategoriBerita,
        Deskripsi: deskripsiBerita,
        Gambar: urlGambar || gambarBerita,
      });
      toast.success("Berita berhasil disimpan");
      aturUlangFormulir();
    } catch (error) {
      toast.error("Gagal menyimpan berita: " + error.message);
    }
  };

  const aturUlangFormulir = () => {
    setJudulBerita("");
    setTanggalTerbit("");
    setKategoriBerita("");
    setDeskripsiBerita("");
    setGambarBerita(null);
    setFileGambar(null);
  };

  return {
    gambarBerita,
    judulBerita,
    setJudulBerita,
    tanggalTerbit,
    setTanggalTerbit,
    kategoriBerita,
    setKategoriBerita,
    deskripsiBerita,
    setDeskripsiBerita,
    simpanDataBerita,
    tanganiGambarBerita,
  };
}
