import React, { useState } from "react";
import { Typography } from "@material-tailwind/react";

const DaftarMenu = () => {
  const [daftarMenuAktif, setDaftarMenuAktif] = useState("admin");

  return (
    <section className="flex items-center gap-5 mx-4 border-b-2 pb-1">
      <div className="relative">
        <Typography
          variant="h6"
          className={`text-gray-500 font-bold cursor-pointer transition-all duration-300 ${
            daftarMenuAktif === "admin" ? "text-gray-100" : ""
          }`}
          onClick={() => setDaftarMenuAktif("admin")}
        >
          Admin
        </Typography>
        {daftarMenuAktif === "admin" && (
          <div className="absolute left-0 right-0 h-1 bg-gray-100 transition-all duration-300" />
        )}
      </div>

      <div className="relative">
        <Typography
          variant="h6"
          className={`text-gray-500 font-bold cursor-pointer transition-all duration-300 ${
            daftarMenuAktif === "analitik" ? "text-gray-100" : ""
          }`}
          onClick={() => setDaftarMenuAktif("analitik")}
        >
          Analitik
        </Typography>
        {daftarMenuAktif === "analitik" && (
          <div className="absolute left-0 right-0 h-1 bg-gray-100 transition-all duration-300" />
        )}
      </div>
    </section>
  );
};

export default DaftarMenu;
