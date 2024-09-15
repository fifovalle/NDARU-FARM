import React from "react";
import Image from "next/image";
import { Typography, Button } from "@material-tailwind/react";
import { UserGroupIcon } from "@heroicons/react/24/solid";
import { FaBox } from "react-icons/fa";

const Sidebar = ({ className }) => {
  const gambarAdmin = require("@/assets/image/1.jpg");

  return (
    <aside
      className={`${className} 
      w-64 bg-[#0a0a0a] text-white h-screen fixed md:relative z-50 md:z-0 transition-all duration-300`}
    >
      <section className="flex flex-col mt-10 mx-2">
        <div className="bg-[#1a1a1a] rounded-lg shadow-lg overflow-hidden">
          <div className="flex items-center gap-4 p-4">
            <Image
              src={gambarAdmin}
              alt="Foto Admin"
              className="w-12 h-12 rounded-full border-2 border-[#fffs]"
            />
            <Typography variant="h5" color="white" className="font-semibold">
              Nama Admin
            </Typography>
          </div>
          <div className="border-t border-gray-600" />
          <div className="flex flex-col gap-4 p-4">
            <div className="flex items-center gap-2">
              <UserGroupIcon className="w-6 h-6 text-[#fffs]" />
              <div className="flex flex-col">
                <Typography color="white" className="font-bold text-lg">
                  12
                </Typography>
                <Typography color="white" className="font-semibold text-sm">
                  Pengguna Dikelola
                </Typography>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <FaBox className="w-6 h-6 text-[#fffs]" />
              <div className="flex flex-col">
                <Typography color="white" className="font-bold text-lg">
                  12
                </Typography>
                <Typography color="white" className="font-semibold text-sm">
                  Produk Dikelola
                </Typography>
              </div>
            </div>
          </div>
          <Button className="flex items-center gap-2 p-2 px-4 my-5 mx-auto">
            <Typography color="white" className="font-bold text-sm">
              Kelola Profil
            </Typography>
          </Button>
        </div>

        <div className="my-4 bg-[#1a1a1a] rounded-lg shadow-lg p-4">
          <Typography
            color="white"
            className="font-bold text-xl mb-4 text-center"
          >
            Pendapatan
          </Typography>
          <div className="relative w-full bg-gray-700 rounded-full h-6 overflow-hidden">
            <div
              className="bg-green-500 h-full rounded-full transition-all duration-500"
              style={{ width: "70%" }}
            />
            <span className="absolute top-0 left-0 h-full flex items-center justify-center text-xs text-white font-semibold">
              70%
            </span>
          </div>
          <div className="flex justify-between mt-2 text-white text-sm">
            <span className="font-medium">Kerugian</span>
            <span className="font-medium">Keuntungan</span>
          </div>
          <div className="flex justify-between mt-2 text-white text-xs">
            <span className="font-light">0%</span>
            <span className="font-light">100%</span>
          </div>
          <div className="flex justify-between mt-1 text-gray-400 text-xs">
            <span className="font-medium">Data ditarik pada:</span>
            <span className="font-medium">September 2024</span>
          </div>
        </div>
      </section>
    </aside>
  );
};

export default Sidebar;
