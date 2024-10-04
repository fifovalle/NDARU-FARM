import { useState } from "react";
import {
  EllipsisVerticalIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { Card, Typography } from "@material-tailwind/react";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
// KOMPONEN KAMI
import ModalSuntingSaranaPertanian from "@/components/modalSuntingSaranaPertanian";
import ModalKonfirmasiHapusSaranaPertanian from "@/components/modalKonfirmasiHapusSaranaPertanian";
// PENGAIT KAMI
import useTampilkanSaranaPertanian from "@/hooks/useTampilkanSaranaPertanian";
// UTILITI KAMI
import { formatRupiah } from "@/utils/formatRupiah";
import MemuatRangkaTampilkanTabel from "@/components/memuatRangkatTabel";

const TabelSaranaPertanian = () => {
  const [bukaModalSuntingSaranaPertanian, setBukaModalSuntingSaranaPertanian] =
    useState(false);
  const [bukaModalHapusSaranaPertanian, setBukaModalHapusSaranaPertanian] =
    useState(false);
  const [saranaPertanianYangTerpilih, setSaranaPertanianYangTerpilih] =
    useState(null);

  const {
    tampilkanDataSaranaPertanian,
    sedangMemuatTampilkanDataSaranaPertanian,
  } = useTampilkanSaranaPertanian();

  return (
    <Card className="mt-10 bg-gradient-to-l from-[#121212] to-[#0a0a0a] px-0 lg:px-10 md:px-10 sm:px-10">
      {sedangMemuatTampilkanDataSaranaPertanian ? (
        <MemuatRangkaTampilkanTabel />
      ) : (
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
                  Jenis
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
            {tampilkanDataSaranaPertanian.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center p-4">
                  <Typography color="red" variant="small" className="font-bold">
                    Tidak ada data sarana pertanian tersedia!
                  </Typography>
                </td>
              </tr>
            ) : (
              tampilkanDataSaranaPertanian.map((saranaPertanian, nomorUrut) => {
                const { id, Nama, Harga, Jenis, Stok } = saranaPertanian;

                return (
                  <tr key={id} className="text-center">
                    <td className="p-4 hidden md:table-cell lg:table-cell xl:table-cell">
                      <Typography
                        variant="small"
                        color="white"
                        className="font-bold"
                      >
                        {nomorUrut + 1}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        color="white"
                        variant="small"
                        className="font-normal"
                      >
                        {Nama}
                      </Typography>
                    </td>
                    <td className="p-4 hidden xl:table-cell">
                      <Typography
                        color="white"
                        variant="small"
                        className="font-normal"
                      >
                        {formatRupiah(Harga)}
                      </Typography>
                    </td>
                    <td className="p-4 hidden xl:table-cell">
                      <Typography
                        color="white"
                        variant="small"
                        className="font-normal"
                      >
                        {Jenis}
                      </Typography>
                    </td>
                    <td className="p-4 hidden lg:table-cell">
                      <Typography
                        color="white"
                        variant="small"
                        className="font-normal"
                      >
                        {Stok}
                      </Typography>
                    </td>
                    <td className="p-2">
                      <Menu
                        as="div"
                        className="relative inline-block text-left"
                      >
                        <MenuButton>
                          <EllipsisVerticalIcon className="h-5 w-5 text-white" />
                        </MenuButton>
                        <MenuItems className="absolute right-0 mt-2 w-36 origin-top-right bg-[#333333] divide-y divide-gray-600 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <div className="py-1">
                            <MenuItem>
                              {({ active }) => (
                                <button
                                  onClick={() => {
                                    setSaranaPertanianYangTerpilih(id);
                                    setBukaModalSuntingSaranaPertanian(true);
                                  }}
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
                                  onClick={() => {
                                    setSaranaPertanianYangTerpilih(id);
                                    setBukaModalHapusSaranaPertanian(true);
                                  }}
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
              })
            )}
          </tbody>
        </table>
      )}

      <ModalSuntingSaranaPertanian
        terbuka={bukaModalSuntingSaranaPertanian}
        tanganiTutup={setBukaModalSuntingSaranaPertanian}
        saranaPertanianYangTerpilih={saranaPertanianYangTerpilih}
      />

      <ModalKonfirmasiHapusSaranaPertanian
        terbuka={bukaModalHapusSaranaPertanian}
        tanganiTutup={setBukaModalHapusSaranaPertanian}
        saranaPertanianYangTerpilih={saranaPertanianYangTerpilih}
      />
    </Card>
  );
};

export default TabelSaranaPertanian;
