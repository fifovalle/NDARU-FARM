"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function LupaSandi() {
  const vektor2 = require("@/assets/image/vektor2.png");
  const pengarah = useRouter();

  const [email, setEmail] = useState(false);

  return (
    <section className="flex justify-center items-center min-h-screen bg-[#0A0A0A] px-4 font-poppins">
      <div className="w-full sm:w-11/12 lg:w-3/4 bg-[#121212] text-white rounded-lg shadow-2xl overflow-hidden transition transform hover:scale-105 hover:shadow-2xl duration-500">
        <div className="grid lg:grid-cols-2">
          <div className="p-6 sm:p-10 flex flex-col justify-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 sm:mb-10 text-green-400 animate-bounce">
              Ndaru Farm
            </h1>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-300 mb-2 sm:mb-4">
              Lupa Kata Sandi?
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 font-medium mb-6 sm:mb-10">
              Masukkan alamat email Anda untuk mendapatkan tautan reset kata
              sandi.
            </p>
            <form className="space-y-4">
              <div className="relative">
                <input
                  onFocus={() => setEmail(true)}
                  type="email"
                  className={`border border-gray-500 bg-transparent text-white rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300 ${
                    email ? "pt-6" : "pt-3"
                  }`}
                  required
                />
                <label
                  className={`absolute left-3 transition-all text-gray-400 pointer-events-none ${
                    email ? "top-1 text-xs text-green-400" : "top-3 text-base"
                  }`}
                >
                  Masukkan Alamat Email
                </label>
              </div>

              <button
                onClick={() => pengarah.push("/aturUlangKataSandi")}
                className="bg-green-900 text-white rounded-lg p-3 w-full font-semibold transition duration-300 hover:bg-green-500 hover:shadow-2xl"
              >
                Kirim Tautan Reset
              </button>
            </form>
            <p
              onClick={() => pengarah.push("/")}
              className="text-xs sm:text-sm text-gray-500 mt-4 text-center hover:text-green-400 transition duration-300 cursor-pointer"
            >
              Kembali ke halaman masuk
            </p>
          </div>

          <div className="relative hidden lg:block bg-gradient-to-br from-black via-green-900 to-green-400">
            <div className="absolute inset-0 bg-black bg-opacity-30 z-10"></div>
            <Image
              src={vektor2}
              alt="vektor2"
              className="object-cover h-full w-full"
              priority={true}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
