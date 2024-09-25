import React, { useState } from "react";
import {
  EllipsisVerticalIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { Card, Typography } from "@material-tailwind/react";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";

// HOOKS KAMI
import useTampilkanSayuran from "@/hooks/useTampilkanSayuran";
// KOMPONEN KAMI
import MemuatRangkaTampilkanTabelSayuran from "@/app/dataSayuran/components/memuatRangkaTampilkanTabelSayuran";
import ModalSuntingSayuran from "@/components/modalSuntingSayuran";

const TabelSayuran = () => {
  const { tampilkanDataSayuran, sedangMemuatTampilkanDataSayuran } =
    useTampilkanSayuran();
  const [sayuranTerpilih, setSayuranTerpilih] = useState(null);
  const [apakahModalSuntingTerbuka, setApakahModalSuntingTerbuka] =
    useState(false);

  const tanganiKetikaDiSunting = (sayuran) => {
    setSayuranTerpilih(sayuran);
    setApakahModalSuntingTerbuka(true);
  };

  return (
    <Card className="mt-10 bg-gradient-to-l from-[#121212] to-[#0a0a0a] px-0 lg:px-10 md:px-10 sm:px-10">
      {sedangMemuatTampilkanDataSayuran ? (
        <MemuatRangkaTampilkanTabelSayuran />
      ) : (
        <table
          table
          className="w-full min-w-max bg-[#212121] rounded-lg table-auto text-left"
        >
          <thead>
            <tr className="text-center">
              <th className="p-4 pt-10 hidden md:table-cell lg:table-cell xl:table-cell">
                <Typography variant="small" color="white" className="font-bold">
                  Nomor
                </Typography>
              </th>
              <th className="p-4 pt-10">
                <Typography variant="small" color="white" className="font-bold">
                  Nama
                </Typography>
              </th>
              <th className="p-4 pt-10 hidden xl:table-cell">
                <Typography variant="small" color="white" className="font-bold">
                  Harga
                </Typography>
              </th>
              <th className="p-4 pt-10 hidden xl:table-cell">
                <Typography variant="small" color="white" className="font-bold">
                  Berat
                </Typography>
              </th>
              <th className="p-4 pt-10 hidden lg:table-cell xl:table-cell">
                <Typography variant="small" color="white" className="font-bold">
                  Stok
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
            {tampilkanDataSayuran.length > 0 ? (
              tampilkanDataSayuran.map((sayuran, indeks) => (
                <tr key={indeks} className="text-center">
                  <td className="p-4 hidden md:table-cell lg:table-cell xl:table-cell">
                    <Typography
                      variant="small"
                      color="white"
                      className="font-bold"
                    >
                      {indeks + 1}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      color="white"
                      variant="small"
                      className="font-normal"
                    >
                      {sayuran.Nama}
                    </Typography>
                  </td>
                  <td className="p-4 hidden xl:table-cell">
                    <Typography
                      color="white"
                      variant="small"
                      className="font-normal"
                    >
                      {sayuran.Harga}
                    </Typography>
                  </td>
                  <td className="p-4 hidden xl:table-cell">
                    <Typography
                      color="white"
                      variant="small"
                      className="font-normal"
                    >
                      {sayuran.Berat}
                    </Typography>
                  </td>
                  <td className="p-4 hidden xl:table-cell">
                    <Typography
                      color="white"
                      variant="small"
                      className="font-normal"
                    >
                      {sayuran.Stok}
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
                                onClick={() =>
                                  tanganiKetikaDiSunting(sayuran.id)
                                }
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
                                onClick={() =>
                                  tanganiKetikaDiHapus(
                                    sayuran.id,
                                    sayuran.Gambar
                                  )
                                }
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
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-4 text-center">
                  <Typography
                    color="white"
                    variant="small"
                    className="font-bold text-red-700"
                  >
                    Tidak ada data berita!
                  </Typography>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
      <ModalSuntingSayuran
        terbuka={apakahModalSuntingTerbuka}
        tanganiTutup={() => setApakahModalSuntingTerbuka(false)}
        sayuranTerpilih={sayuranTerpilih}
      />
    </Card>
  );
};

export default TabelSayuran;
