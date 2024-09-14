import React, { useState } from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import { HomeIcon, UserGroupIcon } from "@heroicons/react/24/solid";
import { FaDatabase } from "react-icons/fa";
import { useRouter, usePathname } from "next/navigation";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

const Sidebar = ({ className }) => {
  const [mengecil, setMengecil] = useState(false);
  const pengarah = useRouter();
  const namaLokasi = usePathname();

  const apakahAktif = (lokasi) => namaLokasi === lokasi;

  return (
    <aside
      className={`${className} ${
        mengecil ? "w-20" : "w-64"
      } bg-[#0a0a0a] text-white h-screen fixed md:relative z-50 md:z-0 transition-all duration-300`}
    >
      <div className="flex justify-between items-center px-4 pt-4">
        {!mengecil && (
          <Typography variant="h4" className="text-white font-bold">
            NDARU FARM
          </Typography>
        )}
        <button
          onClick={() => setMengecil(!mengecil)}
          className="text-white hover:bg-[#1a1a1a] p-1 rounded"
        >
          {mengecil ? (
            <ChevronRightIcon className="h-5 w-5" />
          ) : (
            <ChevronLeftIcon className="h-5 w-5" />
          )}
        </button>
      </div>
      <div className="border border-[#1a1a1a] my-2" />
      <List>
        <ListItem
          onClick={() => pengarah.push("/beranda")}
          className={`${
            apakahAktif("/beranda") ? "bg-[#212121]" : "bg-[#0a0a0a]"
          } hover:bg-[#1a1a1a] transition-colors duration-300 h-10 ${
            mengecil ? "w-12 justify-start" : "w-full"
          } flex items-center`}
        >
          <ListItemPrefix>
            <HomeIcon className="h-5 w-5 text-white font-semibold" />
          </ListItemPrefix>
          {!mengecil && (
            <Typography className="text-white font-semibold">
              Beranda
            </Typography>
          )}
        </ListItem>
      </List>
      <div className="border border-[#1a1a1a] my-2" />
      <List>
        <ListItem
          onClick={() => pengarah.push("/dataAdmin")}
          className={`${
            apakahAktif("/dataAdmin") ? "bg-[#212121]" : "bg-[#0a0a0a]"
          } hover:bg-[#1a1a1a] transition-colors duration-300 h-10 ${
            mengecil ? "w-12 justify-start" : "w-full"
          } flex items-center`}
        >
          <ListItemPrefix>
            <UserGroupIcon className="h-5 w-5 text-white font-semibold" />
          </ListItemPrefix>
          {!mengecil && (
            <Typography className="text-white font-semibold">Admin</Typography>
          )}
        </ListItem>

        <ListItem
          onClick={() => pengarah.push("/dataPengguna")}
          className={`${
            apakahAktif("/dataPengguna") ? "bg-[#212121]" : "bg-[#0a0a0a]"
          } hover:bg-[#1a1a1a] transition-colors duration-300 h-10 ${
            mengecil ? "w-12 justify-start" : "w-full"
          } flex items-center`}
        >
          <ListItemPrefix>
            <UserGroupIcon className="h-5 w-5 text-white font-semibold" />
          </ListItemPrefix>
          {!mengecil && (
            <Typography className="text-white font-semibold">
              Pengguna
            </Typography>
          )}
        </ListItem>

        <ListItem
          onClick={() => pengarah.push("/dataSayuran")}
          className={`${
            apakahAktif("/dataSayuran") ? "bg-[#212121]" : "bg-[#0a0a0a]"
          } hover:bg-[#1a1a1a] transition-colors duration-300 h-10 ${
            mengecil ? "w-12 justify-start" : "w-full"
          } flex items-center`}
        >
          <ListItemPrefix>
            <FaDatabase className="h-5 w-5 text-white font-semibold" />
          </ListItemPrefix>
          {!mengecil && (
            <Typography className="text-white font-semibold">
              Sayuran
            </Typography>
          )}
        </ListItem>

        <ListItem
          onClick={() => pengarah.push("/dataJasa")}
          className={`${
            apakahAktif("/dataJasa") ? "bg-[#212121]" : "bg-[#0a0a0a]"
          } hover:bg-[#1a1a1a] transition-colors duration-300 h-10 ${
            mengecil ? "w-12 justify-start" : "w-full"
          } flex items-center`}
        >
          <ListItemPrefix>
            <FaDatabase className="h-5 w-5 text-white font-semibold" />
          </ListItemPrefix>
          {!mengecil && (
            <Typography className="text-white font-semibold">Jasa</Typography>
          )}
        </ListItem>

        <ListItem
          onClick={() => pengarah.push("/dataBerita")}
          className={`${
            apakahAktif("/dataBerita") ? "bg-[#212121]" : "bg-[#0a0a0a]"
          } hover:bg-[#1a1a1a] transition-colors duration-300 h-10 ${
            mengecil ? "w-12 justify-start" : "w-full"
          } flex items-center`}
        >
          <ListItemPrefix>
            <FaDatabase className="h-5 w-5 text-white font-semibold" />
          </ListItemPrefix>
          {!mengecil && (
            <Typography className="text-white font-semibold">Berita</Typography>
          )}
        </ListItem>

        <ListItem
          onClick={() => pengarah.push("/dataSaranaPertanian")}
          className={`${
            apakahAktif("/dataSaranaPertanian")
              ? "bg-[#212121]"
              : "bg-[#0a0a0a]"
          } hover:bg-[#1a1a1a] transition-colors duration-300 h-10 ${
            mengecil ? "w-12 justify-start" : "w-full"
          } flex items-center`}
        >
          <ListItemPrefix>
            <FaDatabase className="h-5 w-5 text-white font-semibold" />
          </ListItemPrefix>
          {!mengecil && (
            <Typography className="text-white font-semibold">
              Sarana Pertanian
            </Typography>
          )}
        </ListItem>
      </List>
    </aside>
  );
};

export default Sidebar;
