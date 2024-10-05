"use client";
import { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth, provider } from "@/lib/firebaseConfig";
import { getFirestore, doc, getDoc } from "firebase/firestore";
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

      const db = getFirestore();
      const adminRef = doc(db, "admin", result.user.uid);
      const adminDoc = await getDoc(adminRef);

      if (adminDoc.exists()) {
        pengarah.push("/beranda");
      } else {
        pengarah.push("/identitas");
      }

      toast.success("Berhasil masuk dengan Google!");
    } catch (error) {
      console.error("Gagal login dengan Google:", error);
      toast.error("Gagal login dengan Google: " + error.message);
    } finally {
      setSedangMemuatMasukDenganGoogle(false);
    }
  };

  return { masukDenganGoogle, sedangMemuatMasukDenganGoogle, email };
};
