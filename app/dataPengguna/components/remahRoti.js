import React, { useState } from "react";
import { Typography, Button } from "@material-tailwind/react";
// KOMPONEN KAMI
import ModalTambahPengguna from "@/components/modalTambahPengguna";

const RemahRoti = () => {
  const [terbukaModalTambahPengguna, setTerbukaModalTambahPengguna] =
    useState(false);
  const tanganiTerbukaModalTambahPengguna = (status) =>
    setTerbukaModalTambahPengguna(status);

  return (
    <section className="flex flex-col md:flex-row items-start justify-between gap-4 mt-10 px-4">
      <div className="mb-6 w-full md:w-96 flex items-center gap-4">
        <Typography
          variant="h4"
          className="text-white font-bold text-md sm:text-3xl md:text-2xl"
        >
          Data Pengguna
        </Typography>
        <Button
          onClick={() => tanganiTerbukaModalTambahPengguna(true)}
          className="text-gray-300 font-semibold rounded-lg"
        >
          Tambah Pengguna
        </Button>
      </div>

      <ModalTambahPengguna
        terbuka={terbukaModalTambahPengguna}
        tanganiTutup={tanganiTerbukaModalTambahPengguna}
      />
    </section>
  );
};

export default RemahRoti;
