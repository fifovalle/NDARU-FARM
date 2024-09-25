import React from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
} from "@material-tailwind/react";

export default function ModalKonfirmasiHapusJasa({
  apakahTerbuka,
  ketikaDitutup,
  ketikaDikonfirmasi,
  sedangMemuatKonfirmasiJasa,
}) {
  return (
    <Dialog
      size="xs"
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
      open={apakahTerbuka}
      handler={ketikaDitutup}
      className="bg-[#1F1F1F] rounded-lg shadow-lg max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-4 p-4"
    >
      <DialogHeader className="text-lg font-semibold text-white">
        Konfirmasi Hapus
      </DialogHeader>
      <DialogBody className="text-gray-300">
        <p>Apakah Anda yakin ingin menghapus jasa ini?</p>
      </DialogBody>
      <DialogFooter>
        <Button
          variant="text"
          color="blue"
          onClick={ketikaDitutup}
          className="hover:bg-blue-600 hover:text-white transition-colors duration-300"
        >
          Batal
        </Button>
        <Button
          variant="text"
          color="red"
          onClick={ketikaDikonfirmasi}
          className={`ml-2 hover:bg-red-600 hover:text-white transition-colors duration-300 ${
            sedangMemuatKonfirmasiJasa ? "cursor-not-allowed opacity-50" : ""
          }`}
        >
          {sedangMemuatKonfirmasiJasa ? (
            <div className="w-4 h-4 border-4 border-t-0 border-white rounded-full animate-spin" />
          ) : (
            "Hapus"
          )}
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
