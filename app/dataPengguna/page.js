"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
// KOMPONEN KAMI
import Sidebar from "@/components/sidebar";
import Navbar from "@/components/navbar";
import RemahRoti from "@/app/dataPengguna/components/remahRoti";
import DaftarMenu from "@/app/dataPengguna/components/daftarMenu";
import TabelPengguna from "@/app/dataPengguna/components/tabelPengguna";
import GrafikPengguna from "@/app/dataPengguna/components/grafikPengguna";
import FooterSemua from "@/components/footer";
// PENGAIT KAMI
import { useSidebar } from "@/hooks/useSidebar";
import useCekAkunTerdaftar from "@/hooks/useCekAkunTerdaftar";

export default function DataAdmin() {
  const pengarah = useRouter();
  const gambar = require("@/assets/image/1.jpg");
  const { sidebarTerbuka, toggleSidebar, refSidebar } = useSidebar();
  const [daftarMenuAktif, setDaftarMenuAktif] = useState("pengguna");
  useCekAkunTerdaftar(pengarah);

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
        {daftarMenuAktif === "pengguna" ? (
          <TabelPengguna />
        ) : (
          <GrafikPengguna />
        )}
        <FooterSemua />
      </main>
    </section>
  );
}
