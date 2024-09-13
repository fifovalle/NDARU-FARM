import React from "react";
import { Typography } from "@material-tailwind/react";
// UTILITI KAMI
import { getVersi } from "@/utils/getVersi";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const version = getVersi();

  return (
    <footer className="w-full bg-gradient-to-l from-[#121212] to-[#0a0a0a] p-8">
      <div className="flex flex-row flex-wrap items-center justify-center gap-y-6 gap-x- text-center md:justify-between"></div>
      <hr className="my-8 border-blue-gray-50" />
      <Typography
        color="blue-gray"
        className="text-center font-normal text-white"
      >
        &copy; {currentYear} Bhineka Dev | {version}
      </Typography>
    </footer>
  );
};

export default Footer;
