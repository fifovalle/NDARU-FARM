import React from "react";
import { Typography } from "@material-tailwind/react";
// UTILITI KAMI
import { getVersi } from "@/utils/getVersi";

const Footer = () => {
  const tahunSekarang = new Date().getFullYear();
  const versi = getVersi();

  return (
    <footer className="w-full bg-gradient-to-l from-[#121212] to-[#0a0a0a] p-4 md:p-8">
      <hr className="my-4 md:my-8 border-blue-gray-50" />
      <Typography
        color="blue-gray"
        className="text-center font-normal text-white"
      >
        &copy; {tahunSekarang} Bhineka Dev | {versi}
      </Typography>
    </footer>
  );
};

export default Footer;
