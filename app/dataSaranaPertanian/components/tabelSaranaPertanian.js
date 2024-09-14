import {
  EllipsisVerticalIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { Card, Typography } from "@material-tailwind/react";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";

const konten = [
  {
    nomorUrut: "1",
    nama: "Sup Pupuk",
    harga: "Rp 10.000",
    jenis: "Pupuk",
    stok: "1",
  },
];

const TabelSaranaPertanian = () => {
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
          {konten.map(({ nomorUrut, nama, harga, jenis, stok }) => {
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
                    {harga}
                  </Typography>
                </td>
                <td className="p-4 hidden xl:table-cell">
                  <Typography
                    color="white"
                    variant="small"
                    className="font-normal"
                  >
                    {jenis}
                  </Typography>
                </td>
                <td className="p-4 hidden lg:table-cell xl:table-cell">
                  <Typography
                    color="white"
                    variant="small"
                    className="font-normal"
                  >
                    {stok}
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
                      </div>
                    </MenuItems>
                  </Menu>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
  );
};

export default TabelSaranaPertanian;
