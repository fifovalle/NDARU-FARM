import { useState, useEffect } from "react";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";

export default function useTampilkanJasa() {
  const [tampilkanDataJasa, setTampilkanDataJasa] = useState([]);
  const [sedangMemuatTampilkanDataJasa, setSedangMemuatTampilkanDataJasa] =
    useState(true);
  const firestore = getFirestore();

  useEffect(() => {
    const ambilJasa = onSnapshot(
      collection(firestore, "jasa"),
      (querySnapshot) => {
        const jasa = [];
        querySnapshot.forEach((documentSnapshot) => {
          jasa.push({
            ...documentSnapshot.data(),
            id: documentSnapshot.id,
          });
        });

        setTampilkanDataJasa(jasa);
        setSedangMemuatTampilkanDataJasa(false);
      }
    );

    return () => ambilJasa();
  }, [firestore]);

  return { tampilkanDataJasa, sedangMemuatTampilkanDataJasa };
}
