import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Navbar,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  IconButton,
} from "@material-tailwind/react";
import {
  Bars3Icon,
  FolderPlusIcon,
  UserIcon,
  CogIcon,
  UserPlusIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";
// PENGAIT KAMI
import useKeluar from "@/hooks/useKeluar";
// KOMPONEN KAMI
import Memuat from "@/components/memuat";
import ModalTambahAdmin from "@/components/modalTambahAdmin";
import ModalTambahSayuran from "@/components/modalTambahSayuran";
import ModalTambahJasa from "@/components/modalTambahJasa";
import ModalTambahBerita from "@/components/modalTambahBerita";
import ModalTambahSaranaPertanian from "./modalTambahSaranaPertanian";

const Napbar = ({ gambar, toggleSidebar }) => {
  const pengarah = useRouter();
  const [terbukaModalTambahAdmin, setTerbukaModalTambahAdmin] = useState(false);
  const [terbukaModalTambahSayuran, setTerbukaModalTambahSayuran] =
    useState(false);
  const [terbukaModalTambahJasa, setTerbukaModalTambahJasa] = useState(false);
  const [terbukaModalTambahBerita, setTerbukaModalTambahBerita] =
    useState(false);
  const { keluar, sedangMemuatKeluar } = useKeluar();
  const [
    terbukaModalTambahSaranaPertanian,
    setTerbukaModalTambahSaranaPertanian,
  ] = useState(false);
  const tanganiTerbukaModalTambahAdmin = (status) =>
    setTerbukaModalTambahAdmin(status);
  const tanganiTerbukaModalSayuran = (status) =>
    setTerbukaModalTambahSayuran(status);
  const tanganiTerbukaModalTambahJasa = (status) =>
    setTerbukaModalTambahJasa(status);
  const tanganiTerbukaModalTambahBerita = (status) =>
    setTerbukaModalTambahBerita(status);
  const tanganiTerbukaModalTambahSaranaPertanian = (status) =>
    setTerbukaModalTambahSaranaPertanian(status);

  return (
    <>
      <Navbar className="bg-gradient-to-l from-[#121212] to-[#0a0a0a] shadow-none border-none rounded mx-auto text-white flex items-center justify-between px-4 py-2">
        <div className="flex items-center gap-2">
          <IconButton
            variant="text"
            className="text-white md:hidden"
            onClick={toggleSidebar}
          >
            <Bars3Icon className="h-6 w-6" />
          </IconButton>
          <Typography className="text-white font-bold text-sm sm:text-lg md:text-xl">
            Pengelola
          </Typography>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <Menu>
            <MenuHandler>
              <Button
                variant="outlined"
                size="sm"
                className="text-white h-10 font-bold bg-none flex items-center justify-center gap-2"
              >
                <FolderPlusIcon className="h-5 w-5 text-white font-semibold" />
                <span className="hidden sm:inline">Tambah Data</span>
              </Button>
            </MenuHandler>
            <MenuList className="bg-[#121212] border-none shadow-sm">
              <MenuItem
                onClick={() => tanganiTerbukaModalTambahAdmin(true)}
                className="text-white flex items-center gap-2"
              >
                <UserPlusIcon className="h-5 w-5" />
                Tambah Admin
              </MenuItem>

              <MenuItem
                onClick={() => tanganiTerbukaModalSayuran(true)}
                className="text-white flex items-center gap-2"
              >
                <PlusIcon className="h-5 w-5" />
                Tambah Sayuran
              </MenuItem>

              <MenuItem
                onClick={() => tanganiTerbukaModalTambahJasa(true)}
                className="text-white flex items-center gap-2"
              >
                <PlusIcon className="h-5 w-5" />
                Tambah Jasa
              </MenuItem>

              <MenuItem
                onClick={() => tanganiTerbukaModalTambahBerita(true)}
                className="text-white flex items-center gap-2"
              >
                <PlusIcon className="h-5 w-5" />
                Tambah Berita
              </MenuItem>

              <MenuItem
                onClick={() => tanganiTerbukaModalTambahSaranaPertanian(true)}
                className="text-white flex items-center gap-2"
              >
                <PlusIcon className="h-5 w-5" />
                Tambah Sarana Pertanian
              </MenuItem>
            </MenuList>
          </Menu>

          <Menu>
            <MenuHandler>
              <Image
                src={gambar}
                className="w-8 h-8 md:w-10 md:h-10 cursor-pointer rounded-lg"
                alt="profil"
              />
            </MenuHandler>

            <MenuList className="bg-gradient-to-r from-[#121212] to-[#1c1c1c] border-none shadow-sm rounded-lg p-4">
              <MenuItem
                onClick={() => pengarah.push("/profil")}
                className="text-white flex items-center gap-2 hover:bg-gray-700 transition duration-300 rounded-lg p-2"
              >
                <UserIcon className="h-5 w-5" />
                Profil
              </MenuItem>

              <MenuItem className="text-white flex items-center gap-2 hover:bg-gray-700 transition duration-300 rounded-lg p-2">
                <CogIcon className="h-5 w-5" />
                Pengaturan
              </MenuItem>

              <div className="border-t border-gray-600 my-2" />
              <MenuItem
                onClick={async () => {
                  await keluar();
                }}
                className="text-white flex items-center gap-2 hover:bg-gray-700 transition duration-300 rounded-lg p-2"
              >
                {sedangMemuatKeluar ? <Memuat /> : "Keluar"}
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Navbar>

      <ModalTambahAdmin
        terbuka={terbukaModalTambahAdmin}
        tanganiTutup={tanganiTerbukaModalTambahAdmin}
      />

      <ModalTambahSayuran
        terbuka={terbukaModalTambahSayuran}
        tanganiTutup={tanganiTerbukaModalSayuran}
      />

      <ModalTambahJasa
        terbuka={terbukaModalTambahJasa}
        tanganiTutup={tanganiTerbukaModalTambahJasa}
      />

      <ModalTambahBerita
        terbuka={terbukaModalTambahBerita}
        tanganiTutup={tanganiTerbukaModalTambahBerita}
      />

      <ModalTambahSaranaPertanian
        terbuka={terbukaModalTambahSaranaPertanian}
        tanganiTutup={tanganiTerbukaModalTambahSaranaPertanian}
      />
    </>
  );
};

export default Napbar;
