import { useState } from "react";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const useKeluar = () => {
  const auth = getAuth();
  const pengarah = useRouter();
  const [sedangMemuatKeluar, setSedangMemuatKeluar] = useState(false);

  const keluar = async () => {
    setSedangMemuatKeluar(true);
    try {
      await auth.signOut();
      pengarah.push("/");
    } catch (error) {
      console.error("Gagal logout:", error);
      toast.error("Gagal keluar dari sesi.");
    } finally {
      setSedangMemuatKeluar(false);
    }
  };

  return {
    keluar,
    sedangMemuatKeluar,
  };
};

export default useKeluar;
