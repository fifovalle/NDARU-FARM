"use client";
import React from "react";
// KOMPONEN KAMI
import Sidebar from "@/components/sidebar";
import Navbar from "@/components/navbar";
import RemahRoti from "@/app/dataAdmin/components/remahRoti";
import DaftarMenu from "@/app/dataAdmin/components/daftarMenu";
import FooterSemua from "@/components/footer";
// HOOKS KAMI
import { useSidebar } from "@/hooks/useSidebar";

export default function DataAdmin() {
  const gambar = require("@/assets/image/1.jpg");
  const { sidebarTerbuka, toggleSidebar, refSidebar } = useSidebar();

  return (
    <section className="flex flex-col md:flex-row min-h-screen bg-[#0a0a0a] font-poppins">
      {sidebarTerbuka && (
        <div ref={refSidebar} className="md:hidden absolute z-50">
          <Sidebar />
        </div>
      )}
      <Sidebar className="hidden md:block" />

      <main className="flex-1 p-2 bg-gradient-to-l from-[#121212] to-[#0a0a0a] m-2 md:m-5 rounded-xl">
        <Navbar gambar={gambar} toggleSidebar={toggleSidebar} />
        <RemahRoti />
        <DaftarMenu />
        <FooterSemua />
      </main>
    </section>
  );
}
