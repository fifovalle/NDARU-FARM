"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// KOMPONEN KAMI
import Sidebar from "@/components/sidebar";
import Navbar from "@/components/navbar";
import RemahRoti from "@/app/dataBerita/components/remahRoti";
import DaftarMenu from "@/app/dataBerita/components/daftarMenu";
import TabelBerita from "@/app/dataBerita/components/tabelBerita";
import GrafikBerita from "@/app/dataBerita/components/grafikBerita";
import FooterSemua from "@/components/footer";
// PENGAIT KAMI
import { useSidebar } from "@/hooks/useSidebar";
import useCekAkunTerdaftar from "@/hooks/useCekAkunTerdaftar";

export default function DataBerita() {
  const pengarah = useRouter();
  const gambar = require("@/assets/image/1.jpg");
  const { sidebarTerbuka, toggleSidebar, refSidebar } = useSidebar();
  const [daftarMenuAktif, setDaftarMenuAktif] = useState("berita");
  useCekAkunTerdaftar(pengarah);

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
        {daftarMenuAktif === "berita" ? <TabelBerita /> : <GrafikBerita />}
        <FooterSemua />
      </main>
    </section>
  );
}
