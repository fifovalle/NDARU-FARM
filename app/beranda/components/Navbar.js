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
      <Typography className="text-white font-bold">NDARU FARM</Typography>
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
          </MenuList>
        </Menu>
        <Menu>
          <MenuHandler>
            <Image
              src={gambar}
              className="w-10 h-10 cursor-pointer rounded-lg"
            />
          </MenuHandler>
          <MenuList className="bg-[#121212] border-none shadow-sm">
            <MenuItem className="text-white flex items-center gap-2">
              <UserIcon className="h-5 w-5" />
              Profil
            </MenuItem>
            <MenuItem className="text-white flex items-center gap-2">
              <CogIcon className="h-5 w-5" />
              Pengaturan
            </MenuItem>
            <div className="border-t border-gray-600 my-2" />
            <MenuItem className="text-white flex items-center gap-2">
              <FaSignOutAlt className="h-5 w-5" />
              Keluar
            </MenuItem>
          </MenuList>
        </Menu>
      </div>
    </Navbar>
  );
};

export default NavbarBeranda;
