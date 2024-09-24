import React, { useState } from "react";
import {
  EllipsisVerticalIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { Card, Typography } from "@material-tailwind/react";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
// HOOKS KAMI
import useTampilkanAdmin from "@/hooks/useTampilkanAdmin";
import useHapusAdmin from "@/hooks/useHapusAdmin";
// KOMPONEN KAMI
import MemuatRangkaTampilkanTabelAdmin from "@/app/dataAdmin/components/memuatRangkaTampilkanTabelAdmin";
import ModalKonfirmasiHapusAdmin from "@/components/modalKonfirmasiHapusAdmin";
import ModalSuntingAdmin from "@/components/modalSuntingAdmin";
// KONSTANTA KAMI
import { formatNomorPonsel } from "@/constant/formatNomorTelpon";

const TabelAdmin = () => {
  const { tampilkanDataAdmin, sedangMemuatTampilkanDataAdmin } =
    useTampilkanAdmin();
  const { hapusDataAdmin, sedangMemuatHapusDataAdmin } = useHapusAdmin();

  const [apakahModalTerbuka, setApakahModalTerbuka] = useState(false);
  const [adminYangDihapus, setAdminYangDihapus] = useState(null);
  const [apakahModalSuntingTerbuka, setApakahModalSuntingTerbuka] =
    useState(false);
  const [adminTerpilih, setAdminTerpilih] = useState(null);

  const tanganiKetikaDiHapus = (adminId) => {
    setAdminYangDihapus(adminId);
    setApakahModalTerbuka(true);
  };

  const tanganiKetikaDiKonfirmasi = async () => {
    if (adminYangDihapus) {
      await hapusDataAdmin(adminYangDihapus);
      setApakahModalTerbuka(false);
      setAdminYangDihapus(null);
    }
  };

  const tanganiKetikaDiSunting = (admin) => {
    setAdminTerpilih(admin);
    setApakahModalSuntingTerbuka(true);
  };

  return (
    <Card className="mt-10 bg-gradient-to-l from-[#121212] to-[#0a0a0a] px-0 lg:px-10 md:px-10 sm:px-10">
      {sedangMemuatTampilkanDataAdmin ? (
        <MemuatRangkaTampilkanTabelAdmin />
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
                  Email
                </Typography>
              </th>
              <th className="p-4 pt-10 hidden xl:table-cell">
                <Typography variant="small" color="white" className="font-bold">
                  Nomor Ponsel
                </Typography>
              </th>
              <th className="p-4 pt-10 hidden lg:table-cell xl:table-cell">
                <Typography variant="small" color="white" className="font-bold">
                  Pembuatan Akun
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
            {tampilkanDataAdmin.length > 0 ? (
              tampilkanDataAdmin.map((admin, indeks) => (
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
                      {admin.Nama_Depan}
                    </Typography>
                  </td>
                  <td className="p-4 hidden xl:table-cell">
                    <Typography
                      color="white"
                      variant="small"
                      className="font-normal"
                    >
                      {admin.Email}
                    </Typography>
                  </td>
                  <td className="p-4 hidden xl:table-cell">
                    <Typography
                      color="white"
                      variant="small"
                      className="font-normal"
                    >
                      {formatNomorPonsel(admin.Nomor_Ponsel)}
                    </Typography>
                  </td>
                  <td className="p-4 hidden lg:table-cell xl:table-cell">
                    <Typography
                      color="white"
                      variant="small"
                      className="font-normal"
                    >
                      {admin.Tanggal_Pembuatan?.toDate().toLocaleDateString(
                        "id-ID",
                        {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        }
                      )}
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
                                onClick={() => tanganiKetikaDiSunting(admin.id)}
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
                                onClick={() => tanganiKetikaDiHapus(admin.id)}
                                className={`${
                                  active ? "bg-gray-700" : ""
                                } group flex rounded-md items-center w-full px-2 py-2 text-sm text-white`}
                                disabled={sedangMemuatHapusDataAdmin}
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

      <ModalKonfirmasiHapusAdmin
        apakahTerbuka={apakahModalTerbuka}
        ketikaDitutup={() => setApakahModalTerbuka(false)}
        ketikaDikonfirmasi={tanganiKetikaDiKonfirmasi}
      />

      <ModalSuntingAdmin
        terbuka={apakahModalSuntingTerbuka}
        tanganiTutup={() => setApakahModalSuntingTerbuka(false)}
        adminTerpilih={adminTerpilih}
      />
    </Card>
  );
};

export default TabelAdmin;
