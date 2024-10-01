"use client";
import { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth, provider } from "@/lib/firebaseConfig";
import { toast } from "react-toastify";

export const useMasukDenganGoogle = () => {
  const pengarah = useRouter();
  const [sedangMemuatMasukDenganGoogle, setSedangMemuatMasukDenganGoogle] =
    useState(false);

  const masukDenganGoogle = async () => {
    setSedangMemuatMasukDenganGoogle(true);
    try {
      await signInWithPopup(auth, provider);
      toast.success("Berhasil masuk dengan Google!");
      pengarah.push("/beranda");
    } catch (error) {
      console.error("Gagal login dengan Google:", error);
      toast.error("Gagal login dengan Google: " + error.message);
    } finally {
      setSedangMemuatMasukDenganGoogle(false);
    }
  };

  return { masukDenganGoogle, sedangMemuatMasukDenganGoogle };
};
