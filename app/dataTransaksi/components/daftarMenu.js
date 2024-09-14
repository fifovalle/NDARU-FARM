import React, { useState } from "react";
import { Typography } from "@material-tailwind/react";

const DaftarMenu = ({ setDaftarMenuAktif }) => {
  const [menuAktif, setMenuAktif] = useState("transaksi");

  const tanganiMenuSaatDiKlik = (menu) => {
    setMenuAktif(menu);
    setDaftarMenuAktif(menu);
  };

  return (
    <section className="flex items-center gap-5 mx-4 border-b-2 pb-1">
      <div className="relative">
        <Typography
          variant="h6"
          className={`text-gray-500 font-bold cursor-pointer transition-all duration-300 ${
            menuAktif === "transaksi" ? "text-gray-100" : ""
          }`}
          onClick={() => tanganiMenuSaatDiKlik("transaksi")}
        >
          Transaksi
        </Typography>
        {menuAktif === "transaksi" && (
          <div className="absolute left-0 right-0 h-1 bg-gray-100 transition-all duration-300" />
        )}
      </div>

      <div className="relative">
        <Typography
          variant="h6"
          className={`text-gray-500 font-bold cursor-pointer transition-all duration-300 ${
            menuAktif === "analitik" ? "text-gray-100" : ""
          }`}
          onClick={() => tanganiMenuSaatDiKlik("analitik")}
        >
          Analitik
        </Typography>
        {menuAktif === "analitik" && (
          <div className="absolute left-0 right-0 h-1 bg-gray-100 transition-all duration-300" />
        )}
      </div>
    </section>
  );
};

export default DaftarMenu;
