import { useState } from "react";
import {
  EllipsisVerticalIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { Card, Typography } from "@material-tailwind/react";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";

// PENGAIT KAMI
import useTampilkanAdmin from "@/hooks/useTampilkanAdmin";
import useHapusAdmin from "@/hooks/useHapusAdmin";

// KOMPONEN KAMI
import ModalSuntingAdmin from "@/components/modalSuntingAdmin";

// KONSTANTA KAMI
import { formatNomorPonsel } from "@/constant/formatNomorTelepon";
import { formatTanggal } from "@/constant/formatTanggal";
import ModalHapusAdmin from "@/components/modalHapusAdmin";

const TabelAdmin = () => {
  const [bukaModalSuntingAdmin, setBukaModalSuntingAdmin] = useState(false);
  const [adminDipilih, setAdminDipilih] = useState(null);
  const [bukaModalHapusAdmin, setBukaModalHapusAdmin] = useState(false);
  const { tampilkanDataAdmin, sedangMemuatTampilkanDataAdmin } =
    useTampilkanAdmin();
  const { hapusDataAdmin } = useHapusAdmin();

  const tanganiHapusAdmin = () => {
    if (adminDipilih) {
      hapusDataAdmin(adminDipilih);
      setBukaModalHapusAdmin(false);
    }
  };

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
          {sedangMemuatTampilkanDataAdmin ? (
            <tr>
              <td colSpan="6" className="text-center p-4">
                <Typography color="white" variant="small">
                  Memuat data...
                </Typography>
              </td>
            </tr>
          ) : (
            tampilkanDataAdmin.map((admin, index) => (
              <tr key={admin.id} className="text-center">
                <td className="p-4 hidden md:table-cell lg:table-cell xl:table-cell">
                  <Typography
                    variant="small"
                    color="white"
                    className="font-bold"
                  >
                    {index + 1}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    color="white"
                    variant="small"
                    className="font-normal"
                  >
                    {admin.Nama_Pengguna}
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
                    {formatTanggal(admin.Tanggal_Pembuatan)}
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
                                setAdminDipilih(admin.id);
                                setBukaModalSuntingAdmin(true);
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
                                setAdminDipilih(admin.id);
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
            ))
          )}
        </tbody>
      </table>

      <ModalSuntingAdmin
        terbuka={bukaModalSuntingAdmin}
        tanganiTutup={setBukaModalSuntingAdmin}
        adminTerpilih={adminDipilih}
      />

      <ModalHapusAdmin
        terbuka={bukaModalHapusAdmin}
        tanganiTutup={setBukaModalHapusAdmin}
        hapusAdmin={tanganiHapusAdmin}
      />
    </Card>
  );
};

export default TabelAdmin;
