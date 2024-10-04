import { useState } from "react";
import { toast } from "react-toastify";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/lib/firebaseConfig";

export default function useTambahJasa() {
  const [gambarJasa, setGambarJasa] = useState(null);
  const [nama, setNama] = useState("");
  const [harga, setHarga] = useState();
  const [jangkaWaktu, setJangkaWaktu] = useState();
  const [deskripsi, setDeskripsi] = useState("");
  const [sedangMemuatTambahJasa, setSedangMemuatTambahJasa] = useState(false);

  const tanganiGambarJasa = (event) => {
    const file = event.target.files[0];
    if (file) {
      const ukuranFile = file.size / (1024 * 1024);
      if (ukuranFile > 2) {
        toast.error("Ukuran gambar tidak boleh lebih dari 2 MB");
        setGambarJasa(null);
      } else {
        setGambarJasa(file);
      }
    }
  };

  const validasiFormulir = () => {
    if (!nama) {
      toast.error("Masukkan nama jasa");
      return false;
    }
    if (!harga || harga <= 0) {
      toast.error("Masukkan harga yang valid");
      return false;
    }
    if (!jangkaWaktu) {
      toast.error("Masukkan jangka waktu jasa");
      return false;
    }
    if (!deskripsi) {
      toast.error("Masukkan deskripsi jasa");
      return false;
    }
    if (!gambarJasa) {
      toast.error("Unggah gambar jasa");
      return false;
    }
    return true;
  };

  const tambahJasa = async () => {
    setSedangMemuatTambahJasa(true);

    if (!validasiFormulir()) {
      setSedangMemuatTambahJasa(false);
      return;
    }

    try {
      const gambarUnik = `${Date.now()}_${gambarJasa.name}`;
      const storageRef = ref(storage, `Gambar_Jasa/${gambarUnik}`);

      await uploadBytes(storageRef, gambarJasa);

      const urlGambar = await getDownloadURL(storageRef);

      const jasaRef = collection(db, "jasa");
      await addDoc(jasaRef, {
        Nama: nama,
        Harga: harga,
        Jangka_Waktu: jangkaWaktu,
        Deskripsi: deskripsi,
        Gambar: urlGambar,
        Tanggal_Dibuat: serverTimestamp(),
      });

      toast.success("Jasa berhasil ditambahkan!");
      setNama("");
      setHarga(0);
      setJangkaWaktu("");
      setDeskripsi("");
      setGambarJasa(null);
    } catch (error) {
      toast.error("Gagal menambahkan jasa: " + error.message);
    } finally {
      setSedangMemuatTambahJasa(false);
    }
  };

  return {
    nama,
    setNama,
    harga,
    setHarga,
    jangkaWaktu,
    setJangkaWaktu,
    deskripsi,
    setDeskripsi,
    gambarJasa,
    tanganiGambarJasa,
    sedangMemuatTambahJasa,
    tambahJasa,
  };
}
