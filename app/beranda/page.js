"use client";
import React from "react";
import { FaBoxOpen } from "react-icons/fa";
import Sidebar from "@/app/beranda/components/Sidebar";
import Navbar from "@/app/beranda/components/Navbar";
import { Typography } from "@material-tailwind/react";

export default function Beranda() {
  const gambar = require("@/assets/image/1.jpg");

  return (
    <section className="flex min-h-screen bg-[#0a0a0a] font-poppins">
      <Sidebar />
      <main className="flex-1 p-2 bg-gradient-to-l from-[#121212] to-[#0a0a0a] m-5 rounded-xl">
        <Navbar gambar={gambar} />

        <div className="flex items-center justify-between">
          <div>
            <Typography variant="h3" className="text-white font-bold">
              Rp 200.000
            </Typography>
            <Typography variant="h6" className="text-gray-300 font-semibold">
              Total Pendapatan Hari Ini
            </Typography>
          </div>
          <div className="mt-4 pt-7 px-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-[950px]">
            <div className="bg-[#1a1a1a] rounded-lg p-4 shadow-lg transition-transform transform hover:scale-105 mb-10">
              <div className="flex items-center mb-2">
                <FaBoxOpen className="text-4xl text-green-400 mr-2" />
                <Typography
                  variant="h6"
                  className="text-gray-300 font-semibold"
                >
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
                <Typography
                  variant="h6"
                  className="text-gray-300 font-semibold"
                >
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
                <Typography
                  variant="h6"
                  className="text-gray-300 font-semibold"
                >
                  Produksi Pertanian
                </Typography>
              </div>
              <Typography variant="h3" className="text-white font-bold">
                Rp 50.000
              </Typography>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
}
