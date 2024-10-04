import { useState } from "react";
import { toast } from "react-toastify";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/lib/firebaseConfig";

export default function useTambahSayuran() {
  const [gambarSayuran, setGambarSayuran] = useState(null);
  const [nama, setNama] = useState("");
  const [harga, setHarga] = useState(0);
  const [berat, setBerat] = useState("");
  const [stok, setStok] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [sedangMemuatTambahSayuran, setSedangMemuatTambahSayuran] =
    useState(false);

  const tanganiGambarSayuran = (event) => {
    const file = event.target.files[0];
    if (file) {
      const ukuranFile = file.size / (1024 * 1024);
      if (ukuranFile > 2) {
        toast.error("Ukuran gambar tidak boleh lebih dari 2 MB");
        setGambarSayuran(null);
      } else {
        setGambarSayuran(file);
      }
    }
  };

  const validasiFormulir = () => {
    if (!nama) {
      toast.error("Masukkan nama sayuran");
      return false;
    }
    if (!harga || harga <= 0) {
      toast.error("Masukkan harga yang valid");
      return false;
    }
    if (!berat) {
      toast.error("Masukkan berat sayuran");
      return false;
    }
    if (!stok) {
      toast.error("Masukkan stok sayuran");
      return false;
    }
    if (!deskripsi) {
      toast.error("Masukkan deskripsi sayuran");
      return false;
    }
    if (!gambarSayuran) {
      toast.error("Unggah gambar sayuran");
      return false;
    }
    return true;
  };

  const tambahSayuran = async () => {
    setSedangMemuatTambahSayuran(true);

    if (!validasiFormulir()) {
      setSedangMemuatTambahSayuran(false);
      return;
    }

    try {
      const gambarUnik = `${Date.now()}_${gambarSayuran.name}`;
      const storageRef = ref(storage, `Gambar_Sayuran/${gambarUnik}`);

      await uploadBytes(storageRef, gambarSayuran);

      const urlGambar = await getDownloadURL(storageRef);

      const sayuranRef = collection(db, "sayuran");
      await addDoc(sayuranRef, {
        Nama: nama,
        Harga: harga,
        Berat: berat,
        Stok: stok,
        Deskripsi: deskripsi,
        Gambar: urlGambar,
        Tanggal_Dibuat: serverTimestamp(),
      });

      toast.success("Sayuran berhasil ditambahkan!");
      setNama("");
      setHarga(0);
      setBerat("");
      setStok("");
      setDeskripsi("");
      setGambarSayuran(null);
    } catch (error) {
      toast.error("Gagal menambahkan sayuran: " + error.message);
    } finally {
      setSedangMemuatTambahSayuran(false);
    }
  };

  return {
    nama,
    setNama,
    harga,
    setHarga,
    berat,
    setBerat,
    stok,
    setStok,
    deskripsi,
    setDeskripsi,
    gambarSayuran,
    tanganiGambarSayuran,
    sedangMemuatTambahSayuran,
    tambahSayuran,
  };
}
