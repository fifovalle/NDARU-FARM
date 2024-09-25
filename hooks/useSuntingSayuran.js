import { useState, useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import { toast } from "react-toastify";

export default function useSuntingSayuran(idSayuran = null) {
  const [namaSayuran, setNamaSayuran] = useState("");
  const [hargaSayuran, setHargaSayuran] = useState("");
  const [pilihBeratSayuran, setPilihBeratSayuran] = useState("");
  const [stokSayuran, setStokSayuran] = useState("");
  const [deskripsiSayuran, setDeskripsiSayuran] = useState("");
  const [gambarSayuran, setGambarSayuran] = useState(null);
  const [fileGambar, setFileGambar] = useState(null);

  const ambilDataSayuran = async (id) => {
    if (!id) return;

    try {
      const docRef = doc(db, "sayuran", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setNamaSayuran(data.Nama);
        setHargaSayuran(data.Harga);
        setPilihBeratSayuran(data.Berat);
        setStokSayuran(data.Stok);
        setDeskripsiSayuran(data.Deskripsi);
        setGambarSayuran(data.Gambar);
      } else {
        toast.error("Data sayuran tidak ditemukan.");
      }
    } catch (error) {
      toast.error("Gagal mengambil data sayuran: " + error.message);
    }
  };

  const simpanDataSayuran = async () => {
    if (!namaSayuran) {
      toast.error("Nama wajib diisi.");
      return;
    }

    if (!hargaSayuran) {
      toast.error("Harga Sayuran wajib diisi.");
      return;
    }

    if (!pilihBeratSayuran) {
      toast.error("Berat Sayuran wajib diisi.");
      return;
    }

    if (!stokSayuran) {
      toast.error("Stok Sayuran wajib diisi.");
      return;
    }

    if (!deskripsiSayuran) {
      toast.error("Deskripsi Sayuran wajib diisi.");
      return;
    }

    if (!gambarSayuran) {
      toast.error("Gambar Sayuran wajib diisi.");
      return;
    }

    try {
      if (idSayuran) {
        const docRef = doc(db, "sayuran", idSayuran);
        await updateDoc(docRef, {
          Nama: namaSayuran,
          Harga: hargaSayuran,
          Berat: pilihBeratSayuran,
          Stok: stokSayuran,
          Deskripsi: deskripsiSayuran,
          Gambar: urlGambar || gambarSayuran,
        });
        toast.success("Data berita berhasil diperbarui");
      }
    } catch (error) {
      toast.error("Gagal menyimpan data berita: " + error.message);
    }
  };

  useEffect(() => {
    if (idSayuran) {
      ambilDataSayuran(idSayuran);
    }
  }, [idSayuran]);

  return {
    namaSayuran,
    setNamaSayuran,
    gambarSayuran,
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
