import React, { useState } from "react";
import { Typography, Button } from "@material-tailwind/react";
// KOMPONEN KAMI
import ModalTambahSayuran from "@/components/modalTambahSayuran";

const RemahRoti = () => {
  const [terbukaModalTambahSayuran, setTerbukaModalTambahSayuran] =
    useState(false);
  const tanganiTerbukaModalTambahSayuran = (status) =>
    setTerbukaModalTambahSayuran(status);

  return (
    <section className="flex flex-col md:flex-row items-start justify-between mt-10 px-4">
      <div className="mb-6 w-full md:w-96 flex items-center gap-4">
        <Typography
          variant="h4"
          className="text-white font-bold text-md sm:text-3xl md:text-2xl"
        >
          Data Sayuran
        </Typography>
        <Button
          onClick={() => tanganiTerbukaModalTambahSayuran(true)}
          className="text-gray-300 font-semibold rounded-lg"
        >
          Tambah Sayuran
        </Button>
      </div>

      <ModalTambahSayuran
        terbuka={terbukaModalTambahSayuran}
        tanganiTutup={tanganiTerbukaModalTambahSayuran}
      />
    </section>
  );
};

export default RemahRoti;
