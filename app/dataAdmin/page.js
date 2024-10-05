"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// KOMPONEN KAMI
import Sidebar from "@/components/sidebar";
import Navbar from "@/components/navbar";
import RemahRoti from "@/app/dataAdmin/components/remahRoti";
import DaftarMenu from "@/app/dataAdmin/components/daftarMenu";
import TabelAdmin from "@/app/dataAdmin/components/tabelAdmin";
import GrafikAdmin from "@/app/dataAdmin/components/grafikAdmin";
import FooterSemua from "@/components/footer";
// PENGAIT KAMI
import { useSidebar } from "@/hooks/useSidebar";
import useCekAkunTerdaftar from "@/hooks/useCekAkunTerdaftar";

export default function DataAdmin() {
  const pengarah = useRouter();
  const gambar = require("@/assets/image/1.jpg");
  const { sidebarTerbuka, toggleSidebar, refSidebar } = useSidebar();
  const [daftarMenuAktif, setDaftarMenuAktif] = useState("admin");
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
        {daftarMenuAktif === "admin" ? <TabelAdmin /> : <GrafikAdmin />}
        <FooterSemua />
      </main>
    </section>
  );
}
