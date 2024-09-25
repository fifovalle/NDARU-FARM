export const konfigurasiGrafikSayuran = (rentangWaktu, dataGrafik) => {
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
        name: "Sayuran",
        data: dataGrafik,
      },
    ],
    options: {
      chart: {
        toolbar: { show: false },
      },
      title: { show: false },
      dataLabels: { enabled: false },
      colors: ["#fff"],
      stroke: { lineCap: "round", curve: "smooth" },
      markers: { size: 0 },
      xaxis: {
        axisTicks: { show: false },
        axisBorder: { show: false },
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
        xaxis: { lines: { show: true } },
        padding: { top: 5, right: 20 },
      },
      fill: { opacity: 0.8 },
      tooltip: { theme: "dark" },
    },
  };
};
