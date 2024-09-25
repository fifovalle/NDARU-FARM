import React from "react";
import { Typography } from "@material-tailwind/react";

const RemahRoti = () => {
  return (
    <section className="flex flex-col md:flex-row items-start justify-between mt-10 px-4">
      <div className="mb-6 w-full md:w-96 flex items-center gap-4">
        <Typography
          variant="h4"
          className="text-white font-bold text-md sm:text-3xl md:text-2xl"
        >
          Data Pengguna
        </Typography>
      </div>
    </section>
  );
};

export default RemahRoti;
