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
  const [email, setEmail] = useState("");

  const masukDenganGoogle = async () => {
    setSedangMemuatMasukDenganGoogle(true);
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("Login berhasil:", result);
      setEmail(result.user.email);
      toast.success("Berhasil masuk dengan Google!");
      pengarah.push("/identitas");
    } catch (error) {
      console.error("Gagal login dengan Google:", error);
      toast.error("Gagal login dengan Google: " + error.message);
    } finally {
      setSedangMemuatMasukDenganGoogle(false);
    }
  };

  return { masukDenganGoogle, sedangMemuatMasukDenganGoogle, email };
};
