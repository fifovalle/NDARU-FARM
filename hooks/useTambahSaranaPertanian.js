import { useState } from "react";
import { toast } from "react-toastify";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/lib/firebaseConfig";

export default function useTambahSaranaPertanian() {
  const [nama, setNama] = useState("");
  const [harga, setHarga] = useState();
  const [jenis, setJenis] = useState("");
  const [stok, setStok] = useState();
  const [deskripsi, setDeskripsi] = useState("");
  const [gambarSaranaPertanian, setGambarSaranaPertanian] = useState(null);
  const [sedangMemuatTambahSarana, setSedangMemuatTambahSarana] =
    useState(false);

  const tanganiGambarSaranaPertanian = (event) => {
    const file = event.target.files[0];
    if (file) {
      const ukuranFile = file.size / (1024 * 1024);
      if (ukuranFile > 2) {
        toast.error("Ukuran gambar tidak boleh lebih dari 2 MB");
        setGambarSaranaPertanian(null);
      } else {
        setGambarSaranaPertanian(file);
      }
    }
  };

  const validasiFormulir = () => {
    if (!nama) {
      toast.error("Masukkan nama sarana pertanian");
      return false;
    }
    if (!harga || harga <= 0) {
      toast.error("Masukkan harga yang valid");
      return false;
    }
    if (!jenis) {
      toast.error("Pilih jenis sarana pertanian");
      return false;
    }
    if (!stok || stok <= 0) {
      toast.error("Masukkan jumlah stok yang valid");
      return false;
    }
    if (!deskripsi) {
      toast.error("Masukkan deskripsi sarana pertanian");
      return false;
    }
    if (!gambarSaranaPertanian) {
      toast.error("Unggah gambar sarana pertanian");
      return false;
    }
    return true;
  };

  const tambahSaranaPertanian = async () => {
    setSedangMemuatTambahSarana(true);

    if (!validasiFormulir()) {
      setSedangMemuatTambahSarana(false);
      return;
    }

    try {
      const gambarUnik = `${Date.now()}_${gambarSaranaPertanian.name}`;
      const storageRef = ref(storage, `Gambar_Sarana_Pertanian/${gambarUnik}`);

      await uploadBytes(storageRef, gambarSaranaPertanian);

      const urlGambar = await getDownloadURL(storageRef);

      const saranaPertanianRef = collection(db, "sarana_pertanian");
      await addDoc(saranaPertanianRef, {
        Nama: nama,
        Harga: harga,
        Jenis: jenis,
        Stok: stok,
        Deskripsi: deskripsi,
        Gambar: urlGambar,
        Tanggal_Dibuat: serverTimestamp(),
      });

      toast.success("Sarana pertanian berhasil ditambahkan!");

      setNama("");
      setHarga(0);
      setJenis("");
      setStok(0);
      setDeskripsi("");
      setGambarSaranaPertanian(null);
    } catch (error) {
      toast.error("Gagal menambahkan sarana pertanian: " + error.message);
    } finally {
      setSedangMemuatTambahSarana(false);
    }
  };

  return {
    nama,
    setNama,
    harga,
    setHarga,
    jenis,
    setJenis,
    stok,
    setStok,
    deskripsi,
    setDeskripsi,
    gambarSaranaPertanian,
    tanganiGambarSaranaPertanian,
    sedangMemuatTambahSarana,
    tambahSaranaPertanian,
  };
}
