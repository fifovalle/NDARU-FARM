import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db } from "@/lib/firebaseConfig";
import { toast } from "react-toastify";

export default function useTambahJasa() {
  const [namaJasa, setNamaJasa] = useState("");
  const [hargaJasa, setHargaJasa] = useState();
  const [jangkaWaktuJasa, setJangkaWaktuJasa] = useState("");
  const [deskripsiJasa, setDeskripsiJasa] = useState("");
  const [gambarJasa, setGambarJasa] = useState(null);
  const [fileGambar, setFileGambar] = useState(null);
  const [sedangMemuatTambahJasa, setSedangMemuatTambahJasa] = useState(false);

  const tanganiGambarJasa = (event) => {
    const file = event.target.files[0];
    if (file) {
      setGambarJasa(URL.createObjectURL(file));
      setFileGambar(file);
    }
  };

  const validasiMasukan = () => {
    if (!namaJasa.trim()) {
      toast.error("Nama jasa tidak boleh kosong");
      return false;
    }
    if (hargaJasa <= 0) {
      toast.error("Harga jasa harus lebih besar dari 0");
      return false;
    }
    if (!jangkaWaktuJasa.trim()) {
      toast.error("Jangka waktu jasa tidak boleh kosong");
      return false;
    }
    if (!deskripsiJasa.trim()) {
      toast.error("Deskripsi jasa tidak boleh kosong");
      return false;
    }
    if (!fileGambar) {
      toast.error("Gambar jasa harus diunggah");
      return false;
    }
    return true;
  };

  const simpanDataJasa = async () => {
    if (!validasiMasukan()) return;
    setSedangMemuatTambahJasa(true);
    try {
      let urlGambar = null;

      if (fileGambar) {
        const storage = getStorage();
        const namaYangUnik = `${Date.now()}-${fileGambar.name}`;
        const storageRef = ref(storage, `Gambar_Jasa/${namaYangUnik}`);
        await uploadBytes(storageRef, fileGambar);
        urlGambar = await getDownloadURL(storageRef);
      }

      await addDoc(collection(db, "jasa"), {
        Nama: namaJasa,
        Harga: Number(hargaJasa),
        Jangka_Waktu: jangkaWaktuJasa,
        Deskripsi: deskripsiJasa,
        Gambar: urlGambar || gambarJasa,
        Tanggal_Pembuatan: new Date(),
      });
      toast.success("Jasa berhasil disimpan");
      aturUlangFormulir();
    } catch (error) {
      toast.error("Gagal menyimpan Jasa: " + error.message);
    } finally {
      setSedangMemuatTambahJasa(false);
    }
  };

  const aturUlangFormulir = () => {
    setNamaJasa("");
    setHargaJasa(0);
    setJangkaWaktuJasa("");
    setDeskripsiJasa("");
    setGambarJasa(null);
    setFileGambar(null);
  };

  return {
    gambarJasa,
    namaJasa,
    setNamaJasa,
    hargaJasa,
    setHargaJasa,
    jangkaWaktuJasa,
    setJangkaWaktuJasa,
    deskripsiJasa,
    setDeskripsiJasa,
    simpanDataJasa,
    tanganiGambarJasa,
    sedangMemuatTambahJasa,
  };
}
