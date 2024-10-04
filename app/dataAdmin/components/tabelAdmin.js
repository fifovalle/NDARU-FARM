import { useState } from "react";
import { EllipsisVerticalIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Card, Typography } from "@material-tailwind/react";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
// PENGAIT KAMI
import useTampilkanAdmin from "@/hooks/useTampilkanAdmin";
// KOMPONEN KAMI
import ModalKonfirmasiHapusAdmin from "@/components/modalKonfirmasiHapusAdmin";
import MemuatRangkaTampilkanTabel from "@/components/memuatRangkatTabel";
// UTILITI KAMI
import { formatTanggal } from "@/utils/formatTanggal";

const TabelAdmin = () => {
  const [bukaModalHapusAdmin, setBukaModalHapusAdmin] = useState(false);
  const [adminYangTerpilih, setAdminYangTerpilih] = useState(null);

  const { tampilkanDataAdmin, sedangMemuatTampilkanDataAdmin } =
    useTampilkanAdmin();

  return (
    <Card className="mt-10 bg-gradient-to-l from-[#121212] to-[#0a0a0a] px-0 lg:px-10 md:px-10 sm:px-10">
      {sedangMemuatTampilkanDataAdmin ? (
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
            {tampilkanDataAdmin.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center p-4">
                  <Typography color="red" variant="small" className="font-bold">
                    Tidak ada data admin tersedia!
                  </Typography>
                </td>
              </tr>
            ) : (
              tampilkanDataAdmin.map((admin, nomorUrut) => {
                const {
                  id,
                  Nama_Depan,
                  Nama_Belakang,
                  Email,
                  Nomor_Ponsel,
                  Tanggal_Dibuat,
                } = admin;

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
                        {Nama_Depan} {Nama_Belakang}
                      </Typography>
                    </td>
                    <td className="p-4 hidden xl:table-cell">
                      <Typography
                        color="white"
                        variant="small"
                        className="font-normal"
                      >
                        {Email}
                      </Typography>
                    </td>
                    <td className="p-4 hidden xl:table-cell">
                      <Typography
                        color="white"
                        variant="small"
                        className="font-normal"
                      >
                        {Nomor_Ponsel}
                      </Typography>
                    </td>
                    <td className="p-4 hidden lg:table-cell xl:table-cell">
                      <Typography
                        color="white"
                        variant="small"
                        className="font-normal"
                      >
                        {formatTanggal(Tanggal_Dibuat)}
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
                                    setAdminYangTerpilih(id);
                                    setBukaModalHapusAdmin(true);
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

      <ModalKonfirmasiHapusAdmin
        terbuka={bukaModalHapusAdmin}
        tanganiTutup={setBukaModalHapusAdmin}
        adminYangTerpilih={adminYangTerpilih}
      />
    </Card>
  );
};

export default TabelAdmin;
