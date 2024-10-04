import { useState } from "react";
import {
  EllipsisVerticalIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { Card, Typography } from "@material-tailwind/react";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
// KOMPONEN KAMI
import ModalSuntingBerita from "@/components/modalSuntingBerita";
import ModalKonfirmasiHapusBerita from "@/components/modalKonfirmasiHapusBerita";

const konten = [
  {
    nomorUrut: "1",
    nama: "Viral Maling Jambu",
    kategori: "Buah",
    tanggalTerbit: "31 Feb 2024",
  },
];

const TabelBerita = () => {
  const [bukaModalSuntingBerita, setBukaModalSuntingBerita] = useState(false);
  const [bukaModalHapusBerita, setBukaModalHapusBerita] = useState(false);

  return (
    <Card className="mt-10 bg-gradient-to-l from-[#121212] to-[#0a0a0a] px-0 lg:px-10 md:px-10 sm:px-10">
      <table className="w-full min-w-max bg-[#212121] rounded-lg table-auto text-left">
        <thead>
          <tr className="text-center">
            <th className="p-4 pt-10 hidden md:table-cell lg:table-cell xl:table-cell">
              <Typography variant="small" color="white" className="font-bold">
                Nomor
              </Typography>
            </th>
            <th className="p-4 pt-10">
              <Typography variant="small" color="white" className="font-bold">
                Judul
              </Typography>
            </th>
            <th className="p-4 pt-10 hidden xl:table-cell">
              <Typography variant="small" color="white" className="font-bold">
                Kategori
              </Typography>
            </th>
            <th className="p-4 pt-10 hidden xl:table-cell">
              <Typography variant="small" color="white" className="font-bold">
                Tanggal Terbit
              </Typography>
            </th>
            <th className="p-4 pt-10">
              <Typography variant="small" color="white" className="font-bold">
                Aksi
              </Typography>
            </th>
          </tr>
        </thead>
        <tbody>
          {konten.map(({ nomorUrut, nama, kategori, tanggalTerbit }) => {
            return (
              <tr key={nomorUrut} className="text-center">
                <td className="p-4 hidden md:table-cell lg:table-cell xl:table-cell">
                  <Typography
                    variant="small"
                    color="white"
                    className="font-bold"
                  >
                    {nomorUrut}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    color="white"
                    variant="small"
                    className="font-normal"
                  >
                    {nama}
                  </Typography>
                </td>
                <td className="p-4 hidden xl:table-cell">
                  <Typography
                    color="white"
                    variant="small"
                    className="font-normal"
                  >
                    {kategori}
                  </Typography>
                </td>
                <td className="p-4 hidden xl:table-cell">
                  <Typography
                    color="white"
                    variant="small"
                    className="font-normal"
                  >
                    {tanggalTerbit}
                  </Typography>
                </td>
                <td className="p-2">
                  <Menu as="div" className="relative inline-block text-left">
                    <MenuButton>
                      <EllipsisVerticalIcon className="h-5 w-5 text-white" />
                    </MenuButton>
                    <MenuItems className="absolute right-0 mt-2 w-36 origin-top-right bg-[#333333] divide-y divide-gray-600 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        <MenuItem>
                          {({ active }) => (
                            <button
                              onClick={() => setBukaModalSuntingBerita(true)}
                              className={`${
                                active ? "bg-gray-700" : ""
                              } group flex rounded-md items-center w-full px-2 py-2 text-sm text-white`}
                            >
                              <PencilIcon className="h-4 w-4 mr-2" />
                              Sunting
                            </button>
                          )}
                        </MenuItem>
                        <MenuItem>
                          {({ active }) => (
                            <button
                              onClick={() => setBukaModalHapusBerita(true)}
                              className={`${
                                active ? "bg-gray-700" : ""
                              } group flex rounded-md items-center w-full px-2 py-2 text-sm text-white`}
                            >
                              <TrashIcon className="h-4 w-4 mr-2" />
                              Hapus
                            </button>
                          )}
                        </MenuItem>
                      </div>
                    </MenuItems>
                  </Menu>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <ModalSuntingBerita
        terbuka={bukaModalSuntingBerita}
        tanganiTutup={setBukaModalSuntingBerita}
      />

      <ModalKonfirmasiHapusBerita
        terbuka={bukaModalHapusBerita}
        tanganiTutup={setBukaModalHapusBerita}
      />
    </Card>
  );
};

export default TabelBerita;
