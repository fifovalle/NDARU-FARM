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

export default function useSuntingSaranaPertanian(idSaranaPertanian) {
  const [nama, setNama] = useState("");
  const [harga, setHarga] = useState();
  const [jenis, setJenis] = useState("");
  const [stok, setStok] = useState();
  const [deskripsi, setDeskripsi] = useState("");
  const [gambarSaranaPertanian, setGambarSaranaPertanian] = useState(null);
  const [sedangMemuatSuntingSarana, setSedangMemuatSuntingSarana] =
    useState(false);

  const ambilDataSaranaPertanian = async () => {
    try {
      const saranaRef = doc(db, "sarana_pertanian", idSaranaPertanian);
      const docSnap = await getDoc(saranaRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setNama(data.Nama);
        setHarga(data.Harga);
        setJenis(data.Jenis);
        setStok(data.Stok);
        setDeskripsi(data.Deskripsi);

        if (data.Gambar) {
          setGambarSaranaPertanian(data.Gambar);
        }
      } else {
        toast.error("Data sarana pertanian tidak ditemukan!");
      }
    } catch (error) {}
  };

  const tanganiGambarSaranaPertanian = (event) => {
    const file = event.target.files[0];
    if (file) {
      const ukuranFile = file.size / (1024 * 1024);
      if (ukuranFile > 2) {
        toast.error("Ukuran gambar tidak boleh lebih dari 2 MB");
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
    return true;
  };

  const suntingSaranaPertanian = async () => {
    setSedangMemuatSuntingSarana(true);

    if (!validasiFormulir()) {
      setSedangMemuatSuntingSarana(false);
      return;
    }

    try {
      const saranaRef = doc(db, "sarana_pertanian", idSaranaPertanian);
      const docSnap = await getDoc(saranaRef);
      let urlGambar;
      let gambarLama;

      if (docSnap.exists()) {
        const data = docSnap.data();
        gambarLama = data.Gambar;

        if (gambarSaranaPertanian instanceof File) {
          if (gambarLama) {
            const gambarRef = ref(storage, gambarLama);
            await deleteObject(gambarRef);
          }

          const gambarUnik = `${Date.now()}_${gambarSaranaPertanian.name}`;
          const storageRef = ref(
            storage,
            `Gambar_Sarana_Pertanian/${gambarUnik}`
          );
          await uploadBytes(storageRef, gambarSaranaPertanian);
          urlGambar = await getDownloadURL(storageRef);
        } else {
          urlGambar = gambarLama;
        }

        await updateDoc(saranaRef, {
          Nama: nama,
          Harga: harga,
          Jenis: jenis,
          Stok: stok,
          Deskripsi: deskripsi,
          ...(urlGambar && { Gambar: urlGambar }),
        });

        toast.success("Sarana pertanian berhasil disunting!");
      } else {
        toast.error("Data sarana pertanian tidak ditemukan saat menyunting!");
      }
    } catch (error) {
      toast.error("Gagal menyunting sarana pertanian: " + error.message);
    } finally {
      setSedangMemuatSuntingSarana(false);
    }
  };

  useEffect(() => {
    ambilDataSaranaPertanian();
  }, [idSaranaPertanian]);

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
    sedangMemuatSuntingSarana,
    suntingSaranaPertanian,
  };
}
