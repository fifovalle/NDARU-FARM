import React from "react";
import { Typography } from "@material-tailwind/react";
import { FaBoxOpen } from "react-icons/fa";

const Konten1 = () => {
  return (
    <div className="flex flex-col md:flex-row items-start justify-between gap-4 mt-10 px-4">
      <div className="mb-6 w-96">
        <Typography variant="h3" className="text-white font-bold">
          Rp 200.000
        </Typography>
        <Typography variant="h6" className="text-gray-300 font-semibold">
          Total Pendapatan Hari Ini
        </Typography>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
        <div className="bg-[#1a1a1a] rounded-lg p-4 shadow-lg transition-transform transform hover:scale-105 mb-10">
          <div className="flex items-center mb-2">
            <FaBoxOpen className="text-4xl text-green-400 mr-2" />
            <Typography variant="h6" className="text-gray-300 font-semibold">
              Sayuran
            </Typography>
          </div>
          <Typography variant="h3" className="text-white font-bold">
            Rp 50.000
          </Typography>
        </div>

        <div className="bg-[#1a1a1a] rounded-lg p-4 shadow-lg transition-transform transform hover:scale-105 mb-10">
          <div className="flex items-center mb-2">
            <FaBoxOpen className="text-4xl text-blue-400 mr-2" />
            <Typography variant="h6" className="text-gray-300 font-semibold">
              Jasa
            </Typography>
          </div>
          <Typography variant="h3" className="text-white font-bold">
            Rp 50.000
          </Typography>
        </div>

        <div className="bg-[#1a1a1a] rounded-lg p-4 shadow-lg transition-transform transform hover:scale-105 mb-10">
          <div className="flex items-center mb-2">
            <FaBoxOpen className="text-4xl text-yellow-400 mr-2" />
            <Typography variant="h6" className="text-gray-300 font-semibold">
              Produksi Pertanian
            </Typography>
          </div>
          <Typography variant="h3" className="text-white font-bold">
            Rp 50.000
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default Konten1;
