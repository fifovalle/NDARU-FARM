"use client";
import React from "react";
import Sidebar from "@/app/beranda/components/Sidebar";
import Navbar from "@/app/beranda/components/Navbar";
import { Typography } from "@material-tailwind/react";

export default function Beranda() {
  const gambar = require("@/assets/image/1.jpg");

  return (
    <section className="flex min-h-screen bg-[#0a0a0a] font-poppins">
      <Sidebar />
      <main className="flex-1 p-2 bg-gradient-to-l from-[#121212] to-[#0a0a0a] m-3 rounded-xl">
        <Navbar gambar={gambar} />
        <div className="mt-4 p-14">
          <Typography variant="h4" className="text-white">
            Selamat Datang di Beranda
          </Typography>
        </div>
      </main>
    </section>
  );
}
