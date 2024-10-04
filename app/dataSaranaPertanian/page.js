"use client";
import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// KOMPONEN KAMI
import Sidebar from "@/components/sidebar";
import Navbar from "@/components/navbar";
import RemahRoti from "@/app/dataSaranaPertanian/components/remahRoti";
import DaftarMenu from "@/app/dataSaranaPertanian/components/daftarMenu";
import TabelSaranaPertanian from "@/app/dataSaranaPertanian/components/tabelSaranaPertanian";
import GrafikSaranaPertanian from "@/app/dataSaranaPertanian/components/grafikSaranaPertanian";
import FooterSemua from "@/components/footer";
// HOOKS KAMI
import { useSidebar } from "@/hooks/useSidebar";

export default function DataSaranaPertanian() {
  const gambar = require("@/assets/image/1.jpg");
  const { sidebarTerbuka, toggleSidebar, refSidebar } = useSidebar();
  const [daftarMenuAktif, setDaftarMenuAktif] = useState("saranaPertanian");

  return (
    <section className="flex flex-col md:flex-row min-h-screen bg-[#0a0a0a] font-poppins">
      <ToastContainer />
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
        {daftarMenuAktif === "saranaPertanian" ? (
          <TabelSaranaPertanian />
        ) : (
          <GrafikSaranaPertanian />
        )}
        <FooterSemua />
      </main>
    </section>
  );
}
