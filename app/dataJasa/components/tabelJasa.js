import { useState } from "react";
import {
  EllipsisVerticalIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { Card, Typography } from "@material-tailwind/react";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
// PENGAIT KAMI
import useTampilkanJasa from "@/hooks/useTampilkanJasa";
// KOMPONEN KAMI
import ModalSuntingJasa from "@/components/modalSuntingJasa";
import ModalKonfirmasiHapusJasa from "@/components/modalKonfirmasiHapusJasa";
import MemuatRangkaTampilkanTabel from "@/components/memuatRangkatTabel";
// UTILITI KAMI
import { formatRupiah } from "@/utils/formatRupiah";

const TabelJasa = () => {
  const [bukaModalSuntingJasa, setBukaModalSuntingJasa] = useState(false);
  const [bukaModalHapusJasa, setBukaModalHapusJasa] = useState(false);
  const [jasaTerpilihId, setJasaTerpilihId] = useState(null);

  const { tampilkanDataJasa, sedangMemuatTampilkanDataJasa } =
    useTampilkanJasa();

  return (
    <Card className="mt-10 bg-gradient-to-l from-[#121212] to-[#0a0a0a] px-0 lg:px-10 md:px-10 sm:px-10">
      {sedangMemuatTampilkanDataJasa ? (
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
                  Jangka Waktu
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
            {tampilkanDataJasa.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center p-4">
                  <Typography color="red" variant="small" className="font-bold">
                    Tidak ada data jasa tersedia!
                  </Typography>
                </td>
              </tr>
            ) : (
              tampilkanDataJasa.map((jasa, nomorUrut) => {
                const { id, Nama, Harga, Jangka_Waktu } = jasa;

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
                        {Jangka_Waktu} Bulan
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
                                    setJasaTerpilihId(id);
                                    setBukaModalSuntingJasa(true);
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
                                    setJasaTerpilihId(id);
                                    setBukaModalHapusJasa(true);
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

      <ModalSuntingJasa
        terbuka={bukaModalSuntingJasa}
        tanganiTutup={setBukaModalSuntingJasa}
        jasaYangTerpilih={jasaTerpilihId}
      />

      <ModalKonfirmasiHapusJasa
        terbuka={bukaModalHapusJasa}
        tanganiTutup={setBukaModalHapusJasa}
        jasaYangTerpilih={jasaTerpilihId}
      />
    </Card>
  );
};

export default TabelJasa;
