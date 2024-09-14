"use client";
import React, { useState } from "react";
// KOMPONEN KAMI
import Sidebar from "@/components/sidebar";
import Navbar from "@/components/navbar";
import RemahRoti from "@/app/dataSayuran/components/remahRoti";
import DaftarMenu from "@/app/dataSayuran/components/daftarMenu";
import TabelSayuran from "@/app/dataSayuran/components/tabelSayuran";
import GrafikSayuran from "@/app/dataSayuran/components/grafikSayuran";
import FooterSemua from "@/components/footer";
// HOOKS KAMI
import { useSidebar } from "@/hooks/useSidebar";

export default function DataSayuran() {
  const gambar = require("@/assets/image/1.jpg");
  const { sidebarTerbuka, toggleSidebar, refSidebar } = useSidebar();
  const [daftarMenuAktif, setDaftarMenuAktif] = useState("sayuran");

  return (
    <section className="flex flex-col md:flex-row min-h-screen bg-[#0a0a0a] font-poppins">
      {sidebarTerbuka && (
        <div ref={refSidebar} className="md:hidden absolute z-50">
          <Sidebar />
        </div>
      )}
      <Sidebar className="hidden md:block" />

      <main className="flex-1 p-4 bg-gradient-to-l from-[#121212] to-[#0a0a0a] m-2 md:m-5 rounded-xl">
        <Navbar gambar={gambar} toggleSidebar={toggleSidebar} />
        <RemahRoti />
        <DaftarMenu setDaftarMenuAktif={setDaftarMenuAktif} />
        {daftarMenuAktif === "sayuran" ? <TabelSayuran /> : <GrafikSayuran />}
        <FooterSemua />
      </main>
    </section>
  );
}
