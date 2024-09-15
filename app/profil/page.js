"use client";
import React from "react";
// KOMPONEN KAMI
import Navbar from "@/components/navbar";
import Konten1 from "@/app/beranda/components/konten1";
import FooterSemua from "@/components/footer";
import Sidebar from "@/app/profil/components/sidebar";

export default function page() {
  const gambar = require("@/assets/image/1.jpg");

  return (
    <section className="flex flex-col md:flex-row min-h-screen bg-[#0a0a0a] font-poppins">
      <Sidebar />
      <main className="flex-1 p-2 bg-gradient-to-l from-[#121212] to-[#0a0a0a] m-2 md:m-5 rounded-xl">
        <Navbar gambar={gambar} />
        <Konten1 />
        <FooterSemua />
      </main>
    </section>
  );
}
