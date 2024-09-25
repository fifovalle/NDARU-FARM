import { useState, useEffect } from "react";
import { collection, addDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { db } from "@/lib/firebaseConfig";
import { toast } from "react-toastify";

export default function useSuntingJasa(idJasa = null) {
  const [namaJasa, setNamaJasa] = useState("");
  const [hargaJasa, setHargaJasa] = useState();
  const [jangkaWaktuJasa, setJangkaWaktuJasa] = useState("");
  const [deskripsiJasa, setDeskripsiJasa] = useState("");
  const [gambarJasa, setGambarJasa] = useState(null);
  const [fileGambar, setFileGambar] = useState(null);
  const [gambarLama, setGambarLama] = useState(null);
  const [sedangMemuatSuntingJasa, setSedangMemuatSuntingJasa] = useState(false);

  useEffect(() => {
    const ambilDataJasa = async () => {
      if (idJasa) {
        const docRef = doc(db, "jasa", idJasa);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          console.log("Data Jasa:", data);
          setNamaJasa(data.Nama);
          setHargaJasa(data.Harga);
          setJangkaWaktuJasa(data.Jangka_Waktu);
          setDeskripsiJasa(data.Deskripsi);
          setGambarJasa(data.Gambar);
          setGambarLama(data.Gambar);
        } else {
          toast.error("Jasa tidak ditemukan");
        }
      }
    };
    ambilDataJasa();
  }, [idJasa]);

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
    return true;
  };

  const simpanDataJasa = async () => {
    if (!validasiMasukan()) return;
    setSedangMemuatSuntingJasa(true);
    try {
      let urlGambar = gambarJasa;

      if (fileGambar) {
        const storage = getStorage();
        const namaYangUnik = `${Date.now()}-${fileGambar.name}`;
        const storageRef = ref(storage, `Gambar_Jasa/${namaYangUnik}`);

        if (gambarLama) {
          const gambarLamaRef = ref(storage, gambarLama);
          await deleteObject(gambarLamaRef);
        }

        await uploadBytes(storageRef, fileGambar);
        urlGambar = await getDownloadURL(storageRef);
      }

      if (idJasa) {
        await updateDoc(doc(db, "jasa", idJasa), {
          Nama: namaJasa,
          Harga: Number(hargaJasa),
          Jangka_Waktu: jangkaWaktuJasa,
          Deskripsi: deskripsiJasa,
          Gambar: urlGambar,
          Tanggal_Pembaruan: new Date(),
        });
        toast.success("Jasa berhasil diperbarui");
      } else {
        await addDoc(collection(db, "jasa"), {
          Nama: namaJasa,
          Harga: Number(hargaJasa),
          Jangka_Waktu: jangkaWaktuJasa,
          Deskripsi: deskripsiJasa,
          Gambar: urlGambar,
          Tanggal_Pembuatan: new Date(),
        });
        toast.success("Jasa berhasil disimpan");
      }
    } catch (error) {
      toast.error("Gagal menyimpan Jasa: " + error.message);
    } finally {
      setSedangMemuatSuntingJasa(false);
    }
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
    sedangMemuatSuntingJasa,
  };
}
