import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db } from "@/lib/firebaseConfig";
import { toast } from "react-toastify";

export default function useTambahSayuran() {
  const [namaSayuran, setNamaSayuran] = useState("");
  const [hargaSayuran, setHargaSayuran] = useState("");
  const [pilihBeratSayuran, setPilihBeratSayuran] = useState("");
  const [stokSayuran, setStokSayuran] = useState("");
  const [deskripsiSayuran, setDeskripsiSayuran] = useState("");
  const [gambarSayuran, setGambarSayuran] = useState(null);
  const [fileGambar, setFileGambar] = useState(null);

  const tanganiGambarSayuran = (event) => {
    const file = event.target.files[0];
    if (file) {
      setGambarSayuran(URL.createObjectURL(file));
      setFileGambar(file);
    }
  };

  const simpanDataSayuran = async () => {
    try {
      let urlGambar = null;

      if (fileGambar) {
        const storage = getStorage();
        const namaYangUnik = `${Date.now()}-${fileGambar.name}`;
        const storageRef = ref(storage, `Gambar_Sayuran/${namaYangUnik}`);
        await uploadBytes(storageRef, fileGambar);
        urlGambar = await getDownloadURL(storageRef);
      }

      await addDoc(collection(db, "sayuran"), {
        Nama: namaSayuran,
        Harga: hargaSayuran,
        Berat: pilihBeratSayuran,
        Stok: stokSayuran,
        Deskripsi: deskripsiSayuran,
        Gambar: urlGambar || gambarSayuran,
      });
      toast.success("Berita berhasil disimpan");
      aturUlangFormulir();
    } catch (error) {
      toast.error("Gagal menyimpan sayuran: " + error.message);
    }
  };

  const aturUlangFormulir = () => {
    setNamaSayuran("");
    setHargaSayuran("");
    setPilihBeratSayuran("");
    setStokSayuran("");
    setDeskripsiSayuran("");
    setGambarSayuran(null);
    setFileGambar(null);
  };

  return {
    namaSayuran,
    setNamaSayuran,
    gambarSayuran,
    tanganiGambarSayuran,
    hargaSayuran,
    setHargaSayuran,
    pilihBeratSayuran,
    setPilihBeratSayuran,
    stokSayuran,
    setStokSayuran,
    deskripsiSayuran,
    setDeskripsiSayuran,
    simpanDataSayuran,
  };
}
