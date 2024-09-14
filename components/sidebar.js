import React from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import { HomeIcon, UserGroupIcon } from "@heroicons/react/24/solid";
import { FaDatabase } from "react-icons/fa";
import { useRouter, usePathname } from "next/navigation";

const Sidebar = ({ className }) => {
  const pengarah = useRouter();
  const namaLokasi = usePathname();

  const apakahAktif = (lokasi) => namaLokasi === lokasi;

  return (
    <aside
      className={`${className} w-64 bg-[#0a0a0a] text-white h-screen fixed md:relative z-50 md:z-0`}
    >
      <Typography variant="h4" className="mb-4 pt-7 px-4 text-white font-bold">
        NDARU FARM
      </Typography>
      <div className="border border-[#1a1a1a] mb-2" />
      <List>
        <ListItem
          onClick={() => pengarah.push("/beranda")}
          className={`${
            apakahAktif("/beranda") ? "bg-[#121212]" : "bg-[#0a0a0a]"
          } hover:bg-[#1a1a1a] transition-colors duration-300 h-10`}
        >
          <ListItemPrefix>
            <HomeIcon className="h-5 w-5 text-white font-semibold" />
          </ListItemPrefix>
          <Typography className="text-white font-semibold">Beranda</Typography>
        </ListItem>
      </List>
      <div className="border border-[#1a1a1a] my-2" />
      <List>
        <ListItem
          onClick={() => pengarah.push("/dataAdmin")}
          className={`${
            apakahAktif("/dataAdmin") ? "bg-[#121212]" : "bg-[#0a0a0a]"
          } hover:bg-[#1a1a1a] transition-colors duration-300 h-10`}
        >
          <ListItemPrefix>
            <UserGroupIcon className="h-5 w-5 text-white font-semibold" />
          </ListItemPrefix>
          <Typography className="text-white font-semibold">Admin</Typography>
        </ListItem>

        <ListItem
          onClick={() => pengarah.push("/dataPengguna")}
          className={`${
            apakahAktif("/dataPengguna") ? "bg-[#121212]" : "bg-[#0a0a0a]"
          } hover:bg-[#1a1a1a] transition-colors duration-300 h-10`}
        >
          <ListItemPrefix>
            <UserGroupIcon className="h-5 w-5 text-white font-semibold" />
          </ListItemPrefix>
          <Typography className="text-white font-semibold">Pengguna</Typography>
        </ListItem>

        <ListItem
          onClick={() => pengarah.push("/sayuran")}
          className={`${
            apakahAktif("/sayuran") ? "bg-[#121212]" : "bg-[#0a0a0a]"
          } hover:bg-[#1a1a1a] transition-colors duration-300 h-10`}
        >
          <ListItemPrefix>
            <FaDatabase className="h-5 w-5 text-white font-semibold" />
          </ListItemPrefix>
          <Typography className="text-white font-semibold">Sayuran</Typography>
        </ListItem>

        <ListItem
          onClick={() => pengarah.push("/jasa")}
          className={`${
            apakahAktif("/jasa") ? "bg-[#121212]" : "bg-[#0a0a0a]"
          } hover:bg-[#1a1a1a] transition-colors duration-300 h-10`}
        >
          <ListItemPrefix>
            <FaDatabase className="h-5 w-5 text-white font-semibold" />
          </ListItemPrefix>
          <Typography className="text-white font-semibold">Jasa</Typography>
        </ListItem>

        <ListItem
          onClick={() => pengarah.push("/berita")}
          className={`${
            apakahAktif("/berita") ? "bg-[#121212]" : "bg-[#0a0a0a]"
          } hover:bg-[#1a1a1a] transition-colors duration-300 h-10`}
        >
          <ListItemPrefix>
            <FaDatabase className="h-5 w-5 text-white font-semibold" />
          </ListItemPrefix>
          <Typography className="text-white font-semibold">Berita</Typography>
        </ListItem>

        <ListItem
          onClick={() => pengarah.push("/produksiPertanian")}
          className={`${
            apakahAktif("/produksiPertanian") ? "bg-[#121212]" : "bg-[#0a0a0a]"
          } hover:bg-[#1a1a1a] transition-colors duration-300 h-10`}
        >
          <ListItemPrefix>
            <FaDatabase className="h-5 w-5 text-white font-semibold" />
          </ListItemPrefix>
          <Typography className="text-white font-semibold">
            Produksi Pertanian
          </Typography>
        </ListItem>
      </List>
    </aside>
  );
};

export default Sidebar;
