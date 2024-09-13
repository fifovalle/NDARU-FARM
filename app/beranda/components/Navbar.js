import React from "react";
import Image from "next/image";
import {
  Navbar,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import {
  FolderPlusIcon,
  UserIcon,
  CogIcon,
  UserPlusIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";
import { FaSignOutAlt } from "react-icons/fa";

const NavbarBeranda = ({ gambar }) => {
  return (
    <Navbar className="bg-gradient-to-l from-[#121212] to-[#0a0a0a] shadow-none border-none rounded text-white flex items-center justify-between">
      <Typography className="text-white font-bold">Peran Admin</Typography>
      <div className="flex justify-between items-center gap-4">
        <Menu>
          <MenuHandler>
            <Button
              variant="outlined"
              size="sm"
              className="text-white h-10 font-bold bg-none flex items-center justify-center gap-2"
            >
              <FolderPlusIcon className="h-5 w-5 text-white font-semibold" />
              Tambah Data
            </Button>
          </MenuHandler>
          <MenuList className="bg-[#121212] border-none shadow-sm">
            <MenuItem className="text-white flex items-center gap-2">
              <UserPlusIcon className="h-5 w-5" />
              Tambah Admin
            </MenuItem>
            <MenuItem className="text-white flex items-center gap-2">
              <UserPlusIcon className="h-5 w-5" />
              Tambah Pengguna
            </MenuItem>
            <MenuItem className="text-white flex items-center gap-2">
              <PlusIcon className="h-5 w-5" />
              Tambah Sayuran
            </MenuItem>
            <MenuItem className="text-white flex items-center gap-2">
              <PlusIcon className="h-5 w-5" />
              Tambah Jasa
            </MenuItem>
            <MenuItem className="text-white flex items-center gap-2">
              <PlusIcon className="h-5 w-5" />
              Tambah Berita
            </MenuItem>
            <MenuItem className="text-white flex items-center gap-2">
              <PlusIcon className="h-5 w-5" />
              Tambah Produksi Pertanian
            </MenuItem>
          </MenuList>
        </Menu>
        <Menu>
          <MenuHandler>
            <Image
              src={gambar}
              className="w-10 h-10 cursor-pointer rounded-lg"
            />
          </MenuHandler>
          <MenuList className="bg-gradient-to-r from-[#121212] to-[#1c1c1c] border-none shadow-sm rounded-lg p-4">
            <MenuItem className="text-white flex items-center gap-2 hover:bg-gray-700 transition duration-300 rounded-lg p-2">
              <UserIcon className="h-5 w-5" />
              Profil
            </MenuItem>
            <MenuItem className="text-white flex items-center gap-2 hover:bg-gray-700 transition duration-300 rounded-lg p-2">
              <CogIcon className="h-5 w-5" />
              Pengaturan
            </MenuItem>
            <div className="border-t border-gray-600 my-2" />
            <MenuItem className="text-white flex items-center gap-2 hover:bg-gray-700 transition duration-300 rounded-lg p-2">
              <FaSignOutAlt className="h-5 w-5 text-[#e53170]" />
              Keluar
            </MenuItem>
          </MenuList>
        </Menu>
      </div>
    </Navbar>
  );
};

export default NavbarBeranda;
