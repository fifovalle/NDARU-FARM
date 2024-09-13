"use client";
import React, { useState } from "react";
import Sidebar from "@/components/sidebar";
import Navbar from "@/components/navbar";
import Konten1 from "@/app/beranda/components/konten1";

export default function Beranda() {
  const gambar = require("@/assets/image/1.jpg");
  const [sidebarTerbuka, setSidebarTerbuka] = useState(false);

  const toggleSidebar = () => setSidebarTerbuka(!sidebarTerbuka);

  return (
    <section className="flex flex-col md:flex-row min-h-screen bg-[#0a0a0a] font-poppins">
      {sidebarTerbuka && <Sidebar className="md:hidden absolute z-50" />}
      <Sidebar className="hidden md:block" />

      <main className="flex-1 p-2 bg-gradient-to-l from-[#121212] to-[#0a0a0a] m-2 md:m-5 rounded-xl">
        <Navbar gambar={gambar} toggleSidebar={toggleSidebar} />
        <Konten1 />
      </main>
    </section>
  );
}
