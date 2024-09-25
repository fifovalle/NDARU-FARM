import { useState, useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db } from "@/lib/firebaseConfig";
import { toast } from "react-toastify";

export default function useSuntingBerita(idBerita = null) {
  const [judulBerita, setJudulBerita] = useState("");
  const [tanggalTerbit, setTanggalTerbit] = useState("");
  const [kategoriBerita, setKategoriBerita] = useState("");
  const [deskripsiBerita, setDeskripsiBerita] = useState("");
  const [gambarBerita, setGambarBerita] = useState(null);
  const [fileGambar, setFileGambar] = useState(null);
  const [gambarUrlLama, setGambarUrlLama] = useState(null);

  const ambilDataBerita = async (id) => {
    if (!id) return;

    try {
      const docRef = doc(db, "berita", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setJudulBerita(data.Judul);
        setTanggalTerbit(data.Tanggal_Terbit.toDate());
        setKategoriBerita(data.Kategori);
        setDeskripsiBerita(data.Deskripsi);
        setGambarUrlLama(data.Gambar);
      } else {
        toast.error("Data berita tidak ditemukan.");
      }
    } catch (error) {
      toast.error("Gagal mengambil data berita: " + error.message);
    }
  };

  const tanganiGambarBerita = (event) => {
    const file = event.target.files[0];
    if (file) {
      setGambarBerita(URL.createObjectURL(file));
      setFileGambar(file);
    }
  };

  const simpanDataBerita = async () => {
    try {
      let urlGambar = gambarUrlLama;

      if (fileGambar) {
        const storage = getStorage();
        const namaYangUnik = `${Date.now()}-${fileGambar.name}`;
        const storageRef = ref(storage, `Gambar_Berita/${namaYangUnik}`);
        await uploadBytes(storageRef, fileGambar);
        urlGambar = await getDownloadURL(storageRef);
      }

      const docRef = doc(db, "berita", idBerita);
      await updateDoc(docRef, {
        Judul: judulBerita,
        Tanggal_Terbit: tanggalTerbit
          ? new Date(tanggalTerbit)
          : serverTimestamp(),
        Kategori: kategoriBerita,
        Deskripsi: deskripsiBerita,
        Gambar: urlGambar,
      });

      toast.success("Berita berhasil diperbarui");
      aturUlangFormulir();
    } catch (error) {
      toast.error("Gagal memperbarui berita: " + error.message);
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

  useEffect(() => {
    if (idBerita) {
      ambilDataBerita(idBerita);
    }
  }, [idBerita]);

  return {
    judulBerita,
    setJudulBerita,
    tanggalTerbit,
    setTanggalTerbit,
    kategoriBerita,
    setKategoriBerita,
    deskripsiBerita,
    setDeskripsiBerita,
    gambarBerita,
    gambarUrlLama,
    simpanDataBerita,
    tanganiGambarBerita,
  };
}
