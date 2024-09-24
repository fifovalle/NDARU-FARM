import React from "react";
import { CardHeader, Typography } from "@material-tailwind/react";

const MemuatRangkaTampilkanGrafikAdmin = () => {
  return (
    <div className="bg-[#212121] rounded-lg animate-pulse">
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="flex justify-between rounded-none md:flex-row md:items-center bg-[#212121]"
      >
        <div className="w-max rounded-lg p-5 text-white flex gap-4 items-center">
          <div className="w-7 h-7 rounded-lg bg-gray-300" />
          <Typography
            as="div"
            variant="h1"
            className=" h-3 w-20 mx-auto rounded-full bg-gray-300"
          >
            &nbsp;
          </Typography>
        </div>
        <div className="flex items-center p-4">
          <Typography
            as="div"
            variant="h1"
            className=" h-10 w-20 mx-auto rounded bg-gray-300"
          >
            &nbsp;
          </Typography>
        </div>
      </CardHeader>
      <div className="w-[95%] mx-auto bg-gray-700 rounded mb-5 mt-7 h-44" />
    </div>
  );
};

export default MemuatRangkaTampilkanGrafikAdmin;
