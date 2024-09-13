import React, { useState } from "react";
import { Typography, Button } from "@material-tailwind/react";
// KOMPONEN KAMI
import ModalTambahAdmin from "@/components/modalTambahAdmin";

const RemahRoti = () => {
  const [terbukaModalTambahAdmin, setTerbukaModalTambahAdmin] = useState(false);
  const tanganiTerbukaModalTambahAdmin = (status) =>
    setTerbukaModalTambahAdmin(status);

  return (
    <section className="flex flex-col md:flex-row items-start justify-between gap-4 mt-10 px-4">
      <div className="mb-6 w-full md:w-96 flex items-center gap-4">
        <Typography
          variant="h4"
          className="text-white font-bold text-2xl sm:text-3xl md:text-4xl"
        >
          Data Admin
        </Typography>
        <Button
          onClick={() => tanganiTerbukaModalTambahAdmin(true)}
          className="text-gray-300 font-semibold rounded-lg"
        >
          Tambah Admin
        </Button>
      </div>

      <ModalTambahAdmin
        terbuka={terbukaModalTambahAdmin}
        tanganiTutup={tanganiTerbukaModalTambahAdmin}
      />
    </section>
  );
};

export default RemahRoti;
