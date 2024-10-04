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

export default function useSuntingJasa(idJasa) {
  const [gambarJasa, setGambarJasa] = useState(null);
  const [nama, setNama] = useState("");
  const [harga, setHarga] = useState();
  const [jangkaWaktu, setJangkaWaktu] = useState();
  const [deskripsi, setDeskripsi] = useState("");
  const [sedangMemuatSuntingJasa, setSedangMemuatSuntingJasa] = useState(false);

  const ambilDataJasa = async () => {
    try {
      const jasaRef = doc(db, "jasa", idJasa);
      const docSnap = await getDoc(jasaRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setNama(data.Nama);
        setHarga(data.Harga);
        setJangkaWaktu(data.Jangka_Waktu);
        setDeskripsi(data.Deskripsi);

        if (data.Gambar) {
          setGambarJasa(data.Gambar);
        }
      } else {
        toast.error("Data jasa tidak ditemukan!");
      }
    } catch (error) {}
  };

  const tanganiGambarJasa = (event) => {
    const file = event.target.files[0];
    if (file) {
      const ukuranFile = file.size / (1024 * 1024);
      if (ukuranFile > 2) {
        toast.error("Ukuran gambar tidak boleh lebih dari 2 MB");
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
    return true;
  };

  const suntingJasa = async () => {
    setSedangMemuatSuntingJasa(true);

    if (!validasiFormulir()) {
      setSedangMemuatSuntingJasa(false);
      return;
    }

    try {
      const jasaRef = doc(db, "jasa", idJasa);
      const docSnap = await getDoc(jasaRef);
      let urlGambar;
      let gambarLama;

      if (docSnap.exists()) {
        const data = docSnap.data();
        gambarLama = data.Gambar;

        if (gambarJasa instanceof File) {
          if (gambarLama) {
            const gambarRef = ref(storage, gambarLama);
            await deleteObject(gambarRef);
          }

          const gambarUnik = `${Date.now()}_${gambarJasa.name}`;
          const storageRef = ref(storage, `Gambar_Jasa/${gambarUnik}`);
          await uploadBytes(storageRef, gambarJasa);
          urlGambar = await getDownloadURL(storageRef);
        } else {
          urlGambar = gambarLama;
        }

        await updateDoc(jasaRef, {
          Nama: nama,
          Harga: harga,
          Jangka_Waktu: jangkaWaktu,
          Deskripsi: deskripsi,
          ...(urlGambar && { Gambar: urlGambar }),
        });

        toast.success("Jasa berhasil disunting!");
      } else {
        toast.error("Data jasa tidak ditemukan saat menyunting!");
      }
    } catch (error) {
      toast.error("Gagal menyunting jasa: " + error.message);
    } finally {
      setSedangMemuatSuntingJasa(false);
    }
  };

  useEffect(() => {
    ambilDataJasa();
  }, [idJasa]);

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
    sedangMemuatSuntingJasa,
    suntingJasa,
  };
}
