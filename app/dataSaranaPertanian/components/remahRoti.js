import React, { useState } from "react";
import { Typography, Button } from "@material-tailwind/react";
// KOMPONEN KAMI
import ModalTambahSaranaPertanian from "@/components/modalTambahSaranaPertanian";

const RemahRoti = () => {
  const [
    terbukaModalTambahSaranaPertanian,
    setTerbukaModalTambahSaranaPertanian,
  ] = useState(false);
  const tanganiTerbukaModalTambahSaranaPertanian = (status) =>
    setTerbukaModalTambahSaranaPertanian(status);

  return (
    <section className="flex flex-col md:flex-row items-start justify-between mt-10 px-4">
      <div className="mb-6 w-full md:w-96 flex items-center gap-4">
        <Typography
          variant="h4"
          className="text-white font-bold text-md sm:text-3xl md:text-2xl"
        >
          Data Sarana
        </Typography>
        <Button
          onClick={() => tanganiTerbukaModalTambahSaranaPertanian(true)}
          className="text-gray-300 font-semibold rounded-lg"
        >
          Tambah Sarana
        </Button>
      </div>

      <ModalTambahSaranaPertanian
        terbuka={terbukaModalTambahSaranaPertanian}
        tanganiTutup={tanganiTerbukaModalTambahSaranaPertanian}
      />
    </section>
  );
};

export default RemahRoti;
