import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";
import { Square3Stack3DIcon } from "@heroicons/react/24/outline";
// PENGAIT KAMI
import useTampilkanAdmin from "@/hooks/useTampilkanAdmin";
// UTILITI KAMI
import { hitungDataGrafik } from "@/utils/hitungDataGrafik";
import { konfigurasiGrafikAdmin } from "@/utils/konfigurasiGrafikAdmin";
// KOMPONEN KAMI
import MemuatRangkaGrafik from "@/components/memuatRangkaGrafik";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const GrafikAdmin = () => {
  const [rentangWaktu, setRentangWaktu] = useState("1 minggu");
  const [dataGrafik, setDataGrafik] = useState([]);
  const {
    tampilkanDataAdmin,
    hitungAdminBerdasarkanTanggal,
    sedangMemuatTampilkanDataAdmin,
  } = useTampilkanAdmin();

  useEffect(() => {
    if (tampilkanDataAdmin.length > 0) {
      const hasilGrafik = hitungDataGrafik(
        rentangWaktu,
        hitungAdminBerdasarkanTanggal
      );
      setDataGrafik(hasilGrafik);
    }
  }, [rentangWaktu, tampilkanDataAdmin]);

  const tanganiRentangWaktu = (filter) => {
    setRentangWaktu(filter);
  };

  return (
    <Card className="bg-gradient-to-l from-[#121212] to-[#0a0a0a] mt-10 sm:px-10">
      {sedangMemuatTampilkanDataAdmin ? (
        <MemuatRangkaGrafik />
      ) : (
        <div className="bg-[#212121] rounded-lg">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="flex justify-between rounded-none md:flex-row md:items-center bg-[#212121]"
          >
            <div className="w-max rounded-lg p-5 text-white flex gap-4 items-center">
              <Square3Stack3DIcon className="h-6 w-6 hidden sm:block" />
              <Typography
                color="white"
                className="text-md font-bold sm:text-xl"
              >
                Hitung Admin
              </Typography>
            </div>
            <div className="flex items-center p-4">
              <Menu>
                <MenuHandler>
                  <Button className="text-white bg-[#424242] rounded-lg">
                    {rentangWaktu}
                  </Button>
                </MenuHandler>
                <MenuList>
                  <MenuItem onClick={() => tanganiRentangWaktu("1 tahun")}>
                    1 Tahun
                  </MenuItem>
                  <MenuItem onClick={() => tanganiRentangWaktu("1 bulan")}>
                    1 Bulan
                  </MenuItem>
                  <MenuItem onClick={() => tanganiRentangWaktu("1 minggu")}>
                    1 Minggu
                  </MenuItem>
                </MenuList>
              </Menu>
            </div>
          </CardHeader>
          <CardBody className="px-2 pb-0">
            {dataGrafik.length > 0 ? (
              <Chart {...konfigurasiGrafikAdmin(rentangWaktu, dataGrafik)} />
            ) : (
              <Typography color="red" className="text-center font-bold mb-5">
                Data tidak tersedia!
              </Typography>
            )}
          </CardBody>
        </div>
      )}
    </Card>
  );
};

export default GrafikAdmin;
