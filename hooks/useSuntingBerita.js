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

export default function useSuntingBerita(idBerita) {
  const [gambarBerita, setGambarBerita] = useState(null);
  const [judul, setJudul] = useState("");
  const [tanggalTerbit, setTanggalTerbit] = useState("");
  const [kategori, setKategori] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [sedangMemuatSuntingBerita, setSedangMemuatSuntingBerita] =
    useState(false);

  const ambilDataBerita = async () => {
    try {
      const beritaRef = doc(db, "berita", idBerita);
      const docSnap = await getDoc(beritaRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setJudul(data.Judul);
        setTanggalTerbit(data.Tanggal_Terbit);
        setKategori(data.Kategori);
        setDeskripsi(data.Deskripsi);

        if (data.Gambar) {
          setGambarBerita(data.Gambar);
        }
      } else {
        toast.error("Data berita tidak ditemukan!");
      }
    } catch (error) {}
  };

  const tanganiGambarBerita = (event) => {
    const file = event.target.files[0];
    if (file) {
      const ukuranFile = file.size / (1024 * 1024);
      if (ukuranFile > 2) {
        toast.error("Ukuran gambar tidak boleh lebih dari 2 MB");
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
      toast.error("Masukkan tanggal terbit");
      return false;
    }
    if (!kategori) {
      toast.error("Masukkan kategori berita");
      return false;
    }
    if (!deskripsi) {
      toast.error("Masukkan deskripsi berita");
      return false;
    }
    return true;
  };

  const suntingBerita = async () => {
    setSedangMemuatSuntingBerita(true);

    if (!validasiFormulir()) {
      setSedangMemuatSuntingBerita(false);
      return;
    }

    try {
      const beritaRef = doc(db, "berita", idBerita);
      const docSnap = await getDoc(beritaRef);
      let urlGambar;
      let gambarLama;

      if (docSnap.exists()) {
        const data = docSnap.data();
        gambarLama = data.Gambar;

        if (gambarBerita instanceof File) {
          if (gambarLama) {
            const gambarRef = ref(storage, gambarLama);
            await deleteObject(gambarRef);
          }

          const gambarUnik = `${Date.now()}_${gambarBerita.name}`;
          const storageRef = ref(storage, `Gambar_Berita/${gambarUnik}`);
          await uploadBytes(storageRef, gambarBerita);
          urlGambar = await getDownloadURL(storageRef);
        } else {
          urlGambar = gambarLama;
        }

        await updateDoc(beritaRef, {
          Judul: judul,
          Tanggal_Terbit: tanggalTerbit,
          Kategori: kategori,
          Deskripsi: deskripsi,
          ...(urlGambar && { Gambar: urlGambar }),
        });

        toast.success("Berita berhasil disunting!");
      } else {
        toast.error("Data berita tidak ditemukan saat menyunting!");
      }
    } catch (error) {
      toast.error("Gagal menyunting berita: " + error.message);
    } finally {
      setSedangMemuatSuntingBerita(false);
    }
  };

  useEffect(() => {
    ambilDataBerita();
  }, [idBerita]);

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
    sedangMemuatSuntingBerita,
    suntingBerita,
  };
}
