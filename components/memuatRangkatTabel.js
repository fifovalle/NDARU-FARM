import React from "react";
import { Typography } from "@material-tailwind/react";

const MemuatRangkaTampilkanTabel = () => {
  return (
    <table className="w-full min-w-max bg-[#212121] rounded-lg table-auto text-left animate-pulse">
      <thead>
        <tr className="text-center">
          <th className="p-4 pt-10 hidden md:table-cell lg:table-cell xl:table-cell">
            <Typography
              as="div"
              variant="h1"
              className="mb-4 h-3 w-32 mx-auto rounded-full bg-gray-300"
            >
              &nbsp;
            </Typography>
          </th>
          <th className="p-4 pt-10">
            <Typography
              as="div"
              variant="h1"
              className="mb-4 h-3 w-32 mx-auto rounded-full bg-gray-300"
            >
              &nbsp;
            </Typography>
          </th>
          <th className="p-4 pt-10 hidden xl:table-cell">
            <Typography
              as="div"
              variant="h1"
              className="mb-4 h-3 w-32 mx-auto rounded-full bg-gray-300"
            >
              &nbsp;
            </Typography>
          </th>
          <th className="p-4 pt-10 hidden xl:table-cell">
            <Typography
              as="div"
              variant="h1"
              className="mb-4 h-3 w-32 mx-auto rounded-full bg-gray-300"
            >
              &nbsp;
            </Typography>
          </th>
          <th className="p-4 pt-10 hidden lg:table-cell xl:table-cell">
            <Typography
              as="div"
              variant="h1"
              className="mb-4 h-3 w-32 mx-auto rounded-full bg-gray-300"
            >
              &nbsp;
            </Typography>
          </th>
          <th className="p-4 pt-10">
            <Typography
              as="div"
              variant="h1"
              className="mb-4 h-3 w-32 mx-auto rounded-full bg-gray-300"
            >
              &nbsp;
            </Typography>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr className="text-center">
          <td className="p-4 pt-2 hidden md:table-cell lg:table-cell xl:table-cell">
            <Typography
              as="div"
              variant="h1"
              className="mb-4 h-3 w-24 mx-auto rounded-full bg-gray-300"
            >
              &nbsp;
            </Typography>
          </td>
          <td className="p-4 pt-2">
            <Typography
              as="div"
              variant="h1"
              className="mb-4 h-3 w-24 mx-auto rounded-full bg-gray-300"
            >
              &nbsp;
            </Typography>
          </td>
          <td className="p-4 pt-2 hidden xl:table-cell">
            <Typography
              as="div"
              variant="h1"
              className="mb-4 h-3 w-24 mx-auto rounded-full bg-gray-300"
            >
              &nbsp;
            </Typography>
          </td>
          <td className="p-4 pt-2 hidden xl:table-cell">
            <Typography
              as="div"
              variant="h1"
              className="mb-4 h-3 w-24 mx-auto rounded-full bg-gray-300"
            >
              &nbsp;
            </Typography>
          </td>
          <td className="p-4 pt-2 hidden lg:table-cell xl:table-cell">
            <Typography
              as="div"
              variant="h1"
              className="mb-4 h-3 w-24 mx-auto rounded-full bg-gray-300"
            >
              &nbsp;
            </Typography>
          </td>
          <td className="p-4 pt-2">
            <Typography
              as="div"
              variant="h1"
              className="mb-4 h-3 w-24 mx-auto rounded-full bg-gray-300"
            >
              &nbsp;
            </Typography>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default MemuatRangkaTampilkanTabel;
