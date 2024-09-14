import React from "react";
import { Typography } from "@material-tailwind/react";
import { FaBoxOpen } from "react-icons/fa";

const Konten1 = () => {
  return (
    <section className="flex flex-col md:flex-row items-start justify-between mt-10 px-4 overflow-x-hidden">
      <div className="mb-6 w-96">
        <Typography
          variant="h3"
          className="text-white font-bold text-3xl md:text-3xl lg:text-4xl"
        >
          Rp 200.000
        </Typography>
        <Typography
          variant="h6"
          className="text-gray-300 font-semibold text-lg md:text-sm lg:text-lg"
        >
          Total Pendapatan Hari Ini
        </Typography>
      </div>
      <div className="grid grid-cols-1 lg:col-2 xl:grid-cols-3 xl:gap-4 w-full">
        <div className="bg-[#1a1a1a] rounded-lg p-4 shadow-lg transition-transform transform hover:scale-105 mb-2 flex-shrink-0">
          <div className="flex items-center mb-2">
            <FaBoxOpen className="text-4xl text-green-400 mr-2" />
            <Typography
              variant="h6"
              className="text-gray-300 font-semibold text-sm md:text-base lg:text-lg"
            >
              Sayuran
            </Typography>
          </div>
          <Typography
            variant="h3"
            className="text-white font-bold text-xl md:text-2xl lg:text-3xl"
          >
            Rp 50.000
          </Typography>
        </div>

        <div className="bg-[#1a1a1a] rounded-lg p-4 shadow-lg transition-transform transform hover:scale-105 mb-2 flex-shrink-0">
          <div className="flex items-center mb-2">
            <FaBoxOpen className="text-4xl text-blue-400 mr-2" />
            <Typography
              variant="h6"
              className="text-gray-300 font-semibold text-sm md:text-base lg:text-lg"
            >
              Jasa
            </Typography>
          </div>
          <Typography
            variant="h3"
            className="text-white font-bold text-xl md:text-2xl lg:text-3xl"
          >
            Rp 50.000
          </Typography>
        </div>

        <div className="bg-[#1a1a1a] rounded-lg p-4 shadow-lg transition-transform transform hover:scale-105 mb-2 flex-shrink-0">
          <div className="flex items-center mb-2">
            <FaBoxOpen className="text-4xl text-yellow-400 mr-2" />
            <Typography
              variant="h6"
              className="text-gray-300 font-semibold text-sm md:text-base lg:text-lg"
            >
              Produksi Pertanian
            </Typography>
          </div>
          <Typography
            variant="h3"
            className="text-white font-bold text-xl md:text-2xl lg:text-3xl"
          >
            Rp 50.000
          </Typography>
        </div>
      </div>
    </section>
  );
};

export default Konten1;
