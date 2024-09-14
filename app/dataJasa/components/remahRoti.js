import React, { useState } from "react";
import { Typography, Button } from "@material-tailwind/react";
// KOMPONEN KAMI
import ModalTambahJasa from "@/components/modalTambahJasa";

const RemahRoti = () => {
  const [terbukaModalTambahJasa, setTerbukaModalTambahJasa] = useState(false);
  const tanganiTerbukaModalTambahJasa = (status) =>
    setTerbukaModalTambahJasa(status);

  return (
    <section className="flex flex-col md:flex-row items-start justify-between mt-10 px-4">
      <div className="mb-6 w-full md:w-96 flex items-center gap-4">
        <Typography
          variant="h4"
          className="text-white font-bold text-md sm:text-3xl md:text-2xl"
        >
          Data Jasa
        </Typography>
        <Button
          onClick={() => tanganiTerbukaModalTambahJasa(true)}
          className="text-gray-300 font-semibold rounded-lg"
        >
          Tambah Jasa
        </Button>
      </div>

      <ModalTambahJasa
        terbuka={terbukaModalTambahJasa}
        tanganiTutup={tanganiTerbukaModalTambahJasa}
      />
    </section>
  );
};

export default RemahRoti;
