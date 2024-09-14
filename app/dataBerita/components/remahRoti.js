import React, { useState } from "react";
import { Typography, Button } from "@material-tailwind/react";
// KOMPONEN KAMI
import ModalTambahBerita from "@/components/modalTambahBerita";

const RemahRoti = () => {
  const [terbukaModalTambahBerita, setTerbukaModalTambahBerita] =
    useState(false);
  const tanganiTerbukaModalTambahBerita = (status) =>
    setTerbukaModalTambahBerita(status);

  return (
    <section className="flex flex-col md:flex-row items-start justify-between mt-10 px-4">
      <div className="mb-6 w-full md:w-96 flex items-center gap-4">
        <Typography
          variant="h4"
          className="text-white font-bold text-md sm:text-3xl md:text-2xl"
        >
          Data Berita
        </Typography>
        <Button
          onClick={() => tanganiTerbukaModalTambahBerita(true)}
          className="text-gray-300 font-semibold rounded-lg"
        >
          Tambah Berita
        </Button>
      </div>

      <ModalTambahBerita
        terbuka={terbukaModalTambahBerita}
        tanganiTutup={tanganiTerbukaModalTambahBerita}
      />
    </section>
  );
};

export default RemahRoti;
