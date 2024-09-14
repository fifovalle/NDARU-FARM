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
import { useState } from "react";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const GrafikSaranaPertanian = () => {
  const [rentangWaktu, setRentangWaktu] = useState("1 tahun");
  const [dataGrafik, setDataGrafik] = useState([
    20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130,
  ]);

  const tanganiRentangWaktu = (filter) => {
    setRentangWaktu(filter);
    switch (filter) {
      case "1 tahun":
        setDataGrafik([20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130]);
        break;
      case "1 bulan":
        setDataGrafik([10, 20, 30, 40]);
        break;
      case "1 minggu":
        setDataGrafik([5, 10, 15, 20, 25, 21, 34]);
        break;
      default:
        break;
    }
  };

  const konfigurasiGrafik = () => {
    const kategori =
      rentangWaktu === "1 minggu"
        ? ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"]
        : rentangWaktu === "1 bulan"
        ? ["Minggu 1", "Minggu 2", "Minggu 3", "Minggu 4"]
        : [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "Mei",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Okt",
            "Nov",
            "Des",
          ];

    return {
      type: "line",
      height: 240,
      series: [
        {
          name: "Sarana Pertanian",
          data: dataGrafik,
        },
      ],
      options: {
        chart: {
          toolbar: {
            show: false,
          },
        },
        title: {
          show: false,
        },
        dataLabels: {
          enabled: false,
        },
        colors: ["#fff"],
        stroke: {
          lineCap: "round",
          curve: "smooth",
        },
        markers: {
          size: 0,
        },
        xaxis: {
          axisTicks: {
            show: false,
          },
          axisBorder: {
            show: false,
          },
          labels: {
            style: {
              colors: "#fff",
              fontSize: "12px",
              fontFamily: "inherit",
              fontWeight: 400,
            },
          },
          categories: kategori,
        },
        yaxis: {
          labels: {
            style: {
              colors: "#fff",
              fontSize: "12px",
              fontFamily: "inherit",
              fontWeight: 400,
            },
          },
        },
        grid: {
          show: true,
          borderColor: "#dddddd",
          strokeDashArray: 5,
          xaxis: {
            lines: {
              show: true,
            },
          },
          padding: {
            top: 5,
            right: 20,
          },
        },
        fill: {
          opacity: 0.8,
        },
        tooltip: {
          theme: "dark",
        },
      },
    };
  };

  return (
    <Card className="bg-gradient-to-l from-[#121212] to-[#0a0a0a] mt-10 sm:px-10">
      <div className="bg-[#212121] rounded-lg">
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="flex justify-between rounded-none md:flex-row md:items-center bg-[#212121]"
        >
          <div className="w-max rounded-lg p-5 text-white flex gap-4 items-center">
            <Square3Stack3DIcon className="h-6 w-6 hidden sm:block" />
            <Typography color="white" className="text-md font-bold sm:text-xl">
              Hitung Sarana Pertanian
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
          <Chart {...konfigurasiGrafik()} />
        </CardBody>
      </div>
    </Card>
  );
};

export default GrafikSaranaPertanian;
