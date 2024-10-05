import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { db, storage } from "@/lib/firebaseConfig";

export default function useSuntingSayuran(idSayuran) {
  const [gambarSayuran, setGambarSayuran] = useState(null);
  const [nama, setNama] = useState("");
  const [harga, setHarga] = useState();
  const [berat, setBerat] = useState();
  const [stok, setStok] = useState();
  const [deskripsi, setDeskripsi] = useState("");
  const [sedangMemuatSuntingSayuran, setSedangMemuatSuntingSayuran] =
    useState(false);

  const ambilDataSayuran = async () => {
    try {
      const sayuranRef = doc(db, "sayuran", idSayuran);
      const docSnap = await getDoc(sayuranRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setNama(data.Nama);
        setHarga(data.Harga);
        setBerat(data.Berat);
        setStok(data.Stok);
        setDeskripsi(data.Deskripsi);

        if (data.Gambar) {
          setGambarSayuran(data.Gambar);
        }
      } else {
        toast.error("Data sayuran tidak ditemukan!");
      }
    } catch (error) {}
  };

  const tanganiGambarSayuran = (event) => {
    const file = event.target.files[0];
    if (file) {
      const ukuranFile = file.size / (1024 * 1024);
      if (ukuranFile > 2) {
        toast.error("Ukuran gambar tidak boleh lebih dari 2 MB");
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
    if (!stok || stok <= 0) {
      toast.error("Masukkan stok yang valid");
      return false;
    }
    if (!deskripsi) {
      toast.error("Masukkan deskripsi sayuran");
      return false;
    }
    return true;
  };

  const suntingSayuran = async () => {
    setSedangMemuatSuntingSayuran(true);

    if (!validasiFormulir()) {
      setSedangMemuatSuntingSayuran(false);
      return;
    }

    try {
      const sayuranRef = doc(db, "sayuran", idSayuran);
      const docSnap = await getDoc(sayuranRef);
      let urlGambar;
      let gambarLama;

      if (docSnap.exists()) {
        const data = docSnap.data();
        gambarLama = data.Gambar;

        if (gambarSayuran instanceof File) {
          if (gambarLama) {
            const gambarRef = ref(storage, gambarLama);
            await deleteObject(gambarRef);
          }

          const gambarUnik = `${Date.now()}_${gambarSayuran.name}`;
          const storageRef = ref(storage, `Gambar_Sayuran/${gambarUnik}`);
          await uploadBytes(storageRef, gambarSayuran);
          urlGambar = await getDownloadURL(storageRef);
        } else {
          urlGambar = gambarLama;
        }

        await updateDoc(sayuranRef, {
          Nama: nama,
          Harga: harga,
          Berat: berat,
          Stok: stok,
          Deskripsi: deskripsi,
          ...(urlGambar && { Gambar: urlGambar }),
        });

        toast.success("Sayuran berhasil disunting!");
      } else {
        toast.error("Data sayuran tidak ditemukan saat menyunting!");
      }
    } catch (error) {
      toast.error("Gagal menyunting sayuran: " + error.message);
    } finally {
      setSedangMemuatSuntingSayuran(false);
    }
  };

  useEffect(() => {
    ambilDataSayuran();
  }, [idSayuran]);

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
    sedangMemuatSuntingSayuran,
    suntingSayuran,
  };
}
