import { useState } from "react";
import {
  EllipsisVerticalIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { Card, Typography } from "@material-tailwind/react";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";

// HOOKS KAMI
import useTampilkanJasa from "@/hooks/useTampilkanJasa";
import useHapusJasa from "@/hooks/useHapusJasa";
// KOMPONEN KAMI
import MemuatRangkaTampilkanTabelJasa from "@/app/dataJasa/components/memuatRangkaTampilkanTabelJasa";
import ModalSuntingJasa from "@/components/modalSuntingJasa";
import ModalKonfirmasiHapusJasa from "@/components/modalKonfirmasiHapusJasa";
// KONSTANTA KAMI
import { formatRupiah } from "@/constant/formatRupiah";

const TabelJasa = () => {
  const { tampilkanDataJasa, sedangMemuatTampilkanDataJasa } =
    useTampilkanJasa();
  const { hapusDataJasa, sedangMemuatHapusDataJasa } = useHapusJasa();
  const [gambarJasaYangDiHapus, setGambarJasaYangDiHapus] = useState(null);

  const [apakahModalSuntingTerbuka, setApakahModalSuntingTerbuka] =
    useState(false);
  const [apakahModalHapusTerbuka, setApakahModalHapusTerbuka] = useState(false);
  const [jasaYangDihapus, setJasaYangDihapus] = useState(null);
  const [jasaTerpilih, setJasaTerpilih] = useState(null);

  const tanganiKetikaDiSunting = (jasa) => {
    setJasaTerpilih(jasa);
    setApakahModalSuntingTerbuka(true);
  };

  const tanganiKetikaDiHapus = (idJasa, urlGambar) => {
    setJasaYangDihapus(idJasa);
    setGambarJasaYangDiHapus(urlGambar);
    setApakahModalHapusTerbuka(true);
  };

  const tanganiKetikaDiKonfirmasiHapus = async () => {
    if (jasaYangDihapus && gambarJasaYangDiHapus) {
      await hapusDataJasa(jasaYangDihapus, gambarJasaYangDiHapus);
      setApakahModalHapusTerbuka(false);
      setJasaYangDihapus(null);
    }
  };

  return (
    <Card className="mt-10 bg-gradient-to-l from-[#121212] to-[#0a0a0a] px-0 lg:px-10 md:px-10 sm:px-10">
      {sedangMemuatTampilkanDataJasa ? (
        <MemuatRangkaTampilkanTabelJasa />
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
            {tampilkanDataJasa.length > 0 ? (
              tampilkanDataJasa.map((jasa, indeks) => (
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
                      {jasa.Nama}
                    </Typography>
                  </td>
                  <td className="p-4 hidden xl:table-cell">
                    <Typography
                      color="white"
                      variant="small"
                      className="font-normal"
                    >
                      {formatRupiah(jasa.Harga)}
                    </Typography>
                  </td>
                  <td className="p-4 hidden xl:table-cell">
                    <Typography
                      color="white"
                      variant="small"
                      className="font-normal"
                    >
                      {jasa.Jangka_Waktu} Bulan
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
                                onClick={() => {
                                  tanganiKetikaDiSunting(jasa.id);
                                  console.log(jasa.id);
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
                                onClick={() =>
                                  tanganiKetikaDiHapus(jasa.id, jasa.Gambar)
                                }
                                className={`${
                                  active ? "bg-gray-700" : ""
                                } group flex rounded-md items-center w-full px-2 py-2 text-sm text-white`}
                                disabled={sedangMemuatTampilkanDataJasa}
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
                    className="font-extrabold text-red-700"
                  >
                    Tidak ada data!
                  </Typography>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
      <ModalKonfirmasiHapusJasa
        apakahTerbuka={apakahModalHapusTerbuka}
        ketikaDitutup={() => setApakahModalHapusTerbuka(false)}
        ketikaDikonfirmasi={tanganiKetikaDiKonfirmasiHapus}
        sedangMemuatKonfirmasiJasa={sedangMemuatHapusDataJasa}
      />

      <ModalSuntingJasa
        terbuka={apakahModalSuntingTerbuka}
        tanganiTutup={() => setApakahModalSuntingTerbuka(false)}
        jasaTerpilih={jasaTerpilih}
      />
    </Card>
  );
};

export default TabelJasa;
