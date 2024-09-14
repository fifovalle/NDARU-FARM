import React from "react";
import { Typography, Button } from "@material-tailwind/react";
// KOMPONEN KAMI

const RemahRoti = () => {
  return (
    <section className="flex flex-col md:flex-row items-start justify-between mt-10 px-4">
      <div className="mb-6 w-full md:w-96 flex items-center gap-4">
        <Typography
          variant="h4"
          className="text-white font-bold text-md sm:text-3xl md:text-2xl"
        >
          Data Transaksi
        </Typography>
        <Button className="text-gray-300 font-semibold rounded-lg">
          Unduh Transaksi
        </Button>
      </div>
    </section>
  );
};

export default RemahRoti;
