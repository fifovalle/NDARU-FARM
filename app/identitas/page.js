"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@material-tailwind/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// PENGAIT KAMI
import { useIdentitasAdmin } from "@/hooks/useIdentitasAdmin";
import { useMasukDenganGoogle } from "@/hooks/useMasukDenganGoogle";
// KOMPONEN KAMI
import Memuat from "@/components/memuat";

export default function LupaSandi() {
  const vektor4 = require("@/assets/image/vektor4.png");
  const { email } = useMasukDenganGoogle();
  const {
    namaDepan,
    setNamaDepan,
    namaBelakang,
    setNamaBelakang,
    nomorPonsel,
    setNomorPonsel,
    sedangMemuatTambahAdmin,
    tambahAdmin,
  } = useIdentitasAdmin(email);

  const [fokusNamaDepan, setFokusNamaDepan] = useState(false);
  const [fokusNamaBelakang, setFokusNamaBelakang] = useState(false);
  const [fokusNomorPonsel, setFokusNomorPonsel] = useState(false);

  return (
    <section className="flex justify-center items-center min-h-screen bg-[#0A0A0A] px-4 font-poppins">
      <ToastContainer />
      <div className="w-full sm:w-11/12 lg:w-3/4 bg-[#121212] text-white rounded-lg shadow-2xl overflow-hidden transition transform hover:scale-105 hover:shadow-2xl duration-500">
        <div className="grid lg:grid-cols-2">
          <div className="p-6 sm:p-10 flex flex-col justify-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 sm:mb-10 text-green-400 animate-bounce">
              Ndaru Farm
            </h1>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-300 mb-2 sm:mb-4">
              Silahkan Mengisi Identitas
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 font-medium mb-6 sm:mb-10">
              Masukan Nama Depan dan Nama Belakang Anda
            </p>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="relative">
                <input
                  value={namaDepan}
                  onFocus={() => setFokusNamaDepan(true)}
                  onBlur={(e) => setFokusNamaDepan(e.target.value !== "")}
                  onChange={(e) => setNamaDepan(e.target.value)}
                  type="text"
                  className={`border border-gray-500 bg-transparent text-white rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300 ${
                    fokusNamaDepan || namaDepan ? "pt-6" : "pt-3"
                  }`}
                />
                <label
                  className={`absolute left-3 transition-all text-gray-400 pointer-events-none ${
                    fokusNamaDepan || namaDepan
                      ? "top-1 text-xs text-green-400"
                      : "top-3 text-base"
                  }`}
                >
                  Masukkan Nama Depan Anda
                </label>
              </div>

              <div className="relative">
                <input
                  value={namaBelakang}
                  onFocus={() => setFokusNamaBelakang(true)}
                  onBlur={(e) => setFokusNamaBelakang(e.target.value !== "")}
                  onChange={(e) => setNamaBelakang(e.target.value)}
                  type="text"
                  className={`border border-gray-500 bg-transparent text-white rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300 ${
                    fokusNamaBelakang || namaBelakang ? "pt-6" : "pt-3"
                  }`}
                />
                <label
                  className={`absolute left-3 transition-all text-gray-400 pointer-events-none ${
                    fokusNamaBelakang || namaBelakang
                      ? "top-1 text-xs text-green-400"
                      : "top-3 text-base"
                  }`}
                >
                  Masukkan Nama Belakang Anda
                </label>
              </div>

              <div className="relative flex items-center">
                <span className="absolute left-3 text-white">+62</span>
                <input
                  value={nomorPonsel}
                  onFocus={() => setFokusNomorPonsel(true)}
                  onBlur={(e) => setFokusNomorPonsel(e.target.value !== "")}
                  onChange={(e) => setNomorPonsel(e.target.value)}
                  type="number"
                  className={`border border-gray-500 bg-transparent text-white rounded-lg p-3 pl-12 w-full focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300 ${
                    fokusNomorPonsel || nomorPonsel ? "pt-6" : "pt-3"
                  }`}
                />
                <label
                  className={`absolute left-12 transition-all text-gray-400 pointer-events-none ${
                    fokusNomorPonsel || nomorPonsel
                      ? "top-1 text-xs text-green-400"
                      : "top-3 text-base"
                  }`}
                >
                  Masukkan Nomor Ponsel Anda
                </label>
              </div>

              <Button
                variant="gradient"
                color="green"
                disabled={sedangMemuatTambahAdmin}
                className="text-white rounded-lg p-3 w-full font-semibold transition duration-300 hover:bg-green-500 hover:shadow-2xl"
                onClick={async () => {
                  await tambahAdmin();
                }}
              >
                {sedangMemuatTambahAdmin ? <Memuat /> : "Simpan"}
              </Button>
            </form>
          </div>

          <div className="relative hidden lg:block bg-gradient-to-br from-black via-green-900 to-green-400">
            <div className="absolute inset-0 bg-black bg-opacity-30 z-10"></div>
            <Image
              src={vektor4}
              alt="vektor4"
              className="object-cover h-full w-full"
              priority={true}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
