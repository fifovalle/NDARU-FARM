import { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import { toast } from "react-toastify";

const useCekAkunTerdaftar = (pengarah) => {
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (pengguna) => {
      if (pengguna) {
        const cekStatusAdmin = async () => {
          const adminRef = doc(db, "admin", pengguna.uid);
          const adminDoc = await getDoc(adminRef);

          if (!adminDoc.exists()) {
            toast.error(
              "Anda harus mendaftar terlebih dahulu untuk mengakses halaman tersebut."
            );
            pengarah.push("/");
          }
        };

        cekStatusAdmin();
      } else {
        toast.error(
          "Anda harus mendaftar terlebih dahulu untuk mengakses halaman tersebut."
        );
        pengarah.push("/");
      }
    });

    return () => unsubscribe();
  }, [pengarah, auth]);
};

export default useCekAkunTerdaftar;
