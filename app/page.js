"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// PENGAIT KAMI
import { useMasukDenganGoogle } from "@/hooks/useMasukDenganGoogle";
// KOMPONEN KAMI
import Memuat from "@/components/memuat";
export default function Index() {
  const vektor1 = require("@/assets/image/vektor1.png");
  const pengarah = useRouter();

  const [namaPengguna, setNamaPengguna] = useState(false);
  const [kataSandi, setKataSandi] = useState(false);
  const [lihatKataSandi, setLihatKataSandi] = useState(false);
  const { masukDenganGoogle, sedangMemuatMasukDenganGoogle } =
    useMasukDenganGoogle();

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
              Selamat Datang
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 font-medium mb-6 sm:mb-10">
              Lanjutkan dengan Google, Facebook, atau masukkan identitas Anda.
            </p>
            <div className="grid grid-cols-2 gap-2 sm:gap-4 mb-6 sm:mb-8">
              <button
                onClick={() => masukDenganGoogle()}
                disabled={sedangMemuatMasukDenganGoogle}
                className={`border border-green-400 flex items-center justify-center rounded-lg p-2 sm:p-3 font-semibold transition duration-300 hover:bg-green-800 hover:text-white shadow-lg ${
                  sedangMemuatMasukDenganGoogle
                    ? "opacity-50 cursor-not-allowed"
                    : "opacity-100 cursor-pointer"
                }`}
              >
                <FcGoogle className="mr-2 text-xl" />
                {sedangMemuatMasukDenganGoogle ? <Memuat /> : "Google"}
              </button>
              <button className="border border-green-400 flex items-center justify-center rounded-lg p-2 sm:p-3 font-semibold transition duration-300 hover:bg-green-800 hover:text-white shadow-lg">
                <FaFacebook className="mr-2 text-xl" />
                Facebook
              </button>
            </div>
            <form className="space-y-4">
              <div className="relative">
                <input
                  onFocus={() => setNamaPengguna(true)}
                  onBlur={(e) => setNamaPengguna(e.target.value !== "")}
                  className={`border border-gray-500 bg-transparent text-white rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300 ${
                    namaPengguna ? "pt-6" : "pt-3"
                  }`}
                />
                <label
                  className={`absolute left-3 transition-all text-gray-400 pointer-events-none ${
                    namaPengguna
                      ? "top-1 text-xs text-green-400"
                      : "top-3 text-base"
                  }`}
                >
                  Masukan Nama Pengguna
                </label>
              </div>

              <div className="relative">
                <input
                  onFocus={() => setKataSandi(true)}
                  onBlur={(e) => setKataSandi(e.target.value !== "")}
                  type={lihatKataSandi ? "text" : "password"}
                  className={`border border-gray-500 bg-transparent text-white rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300 ${
                    kataSandi ? "pt-6" : "pt-3"
                  }`}
                />
                <label
                  className={`absolute left-3 transition-all text-gray-400 pointer-events-none ${
                    kataSandi
                      ? "top-1 text-xs text-green-400"
                      : "top-3 text-base"
                  }`}
                >
                  Masukan Kata Sandi
                </label>
                <button
                  type="button"
                  className="absolute right-3 top-4 text-gray-400"
                  onClick={() => setLihatKataSandi(!lihatKataSandi)}
                >
                  {lihatKataSandi ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              <button
                type="submit"
                className="bg-green-900 text-white rounded-lg p-3 w-full font-semibold transition duration-300 hover:bg-green-500 hover:shadow-2xl"
              >
                Masuk
              </button>
            </form>
            <p
              onClick={() => pengarah.push("/lupaSandi")}
              className="text-xs sm:text-sm text-gray-500 mt-4 text-center hover:text-green-400 transition duration-300 cursor-pointer"
            >
              Lupa kata sandi?
            </p>
          </div>

          <div className="relative hidden lg:block bg-gradient-to-br from-black via-green-900 to-green-400">
            <div className="absolute inset-0 bg-black bg-opacity-30 z-10"></div>
            <Image
              src={vektor1}
              alt="vektor1"
              className="object-cover h-full w-full"
              priority={true}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
