import {
  EllipsisVerticalIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { Card, Typography } from "@material-tailwind/react";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { FaDownload } from "react-icons/fa";

const kepala = [
  "Nomor",
  "Nama",
  "Jenis Kelamin",
  "Nomor Ponsel",
  "Pembuatan Akun",
  "Aksi",
];

const isi = [
  {
    nomorUrut: "1",
    nama: "Nama Pengguna Admin",
    jenisKelamin: "Pria",
    nomorPonsel: "+62 812 3456 7890",
    pembuatanAkun: "31 Feb 2024",
  },
];

const TabelAdmin = () => {
  return (
    <Card className="w-[1000px] mx-auto mt-10 bg-[#212121] rounded-lg">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr className="text-center">
            {kepala.map((head) => (
              <th key={head} className="p-4 pt-10">
                <Typography variant="small" color="white" className="font-bold">
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {isi.map(
            ({ nomorUrut, nama, jenisKelamin, nomorPonsel, pembuatanAkun }) => {
              return (
                <tr key={nomorUrut} className="text-center">
                  <td className="p-4">
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
                  <td className="p-4">
                    <Typography
                      color="white"
                      variant="small"
                      className="font-normal"
                    >
                      {jenisKelamin}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      color="white"
                      variant="small"
                      className="font-normal"
                    >
                      {nomorPonsel}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      color="white"
                      variant="small"
                      className="font-normal"
                    >
                      {pembuatanAkun}
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
                                className={`${
                                  active ? "bg-gray-700" : ""
                                } group flex rounded-md items-center w-full px-2 py-2 text-sm text-white`}
                              >
                                <TrashIcon className="h-4 w-4 mr-2" />
                                Hapus
                              </button>
                            )}
                          </MenuItem>
                          <MenuItem>
                            {({ active }) => (
                              <button
                                className={`${
                                  active ? "bg-gray-700" : ""
                                } group flex rounded-md items-center w-full px-2 py-2 text-sm text-white`}
                              >
                                <FaDownload className="h-4 w-4 mr-2" />
                                Unduh
                              </button>
                            )}
                          </MenuItem>
                        </div>
                      </MenuItems>
                    </Menu>
                  </td>
                </tr>
              );
            }
          )}
        </tbody>
      </table>
    </Card>
  );
};

export default TabelAdmin;
