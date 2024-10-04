import React from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

const ModalKonfirmasiHapusAdmin = ({
  terbuka,
  tanganiTutup,
  adminYangTerpilih,
}) => {
  return (
    <Dialog
      open={terbuka}
      handler={tanganiTutup}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
      size="md"
      className="bg-[#121212] max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
    >
      <div className="absolute top-3 right-3">
        <IconButton
          variant="text"
          color="red"
          onClick={() => tanganiTutup(false)}
        >
          <XMarkIcon className="h-6 w-6" />
        </IconButton>
      </div>

      <DialogHeader className="text-white">Konfirmasi Hapus Admin</DialogHeader>
      <DialogBody className="text-white">
        <p>
          Apakah Anda yakin ingin menghapus admin{" "}
          <strong className="font-bold">{adminYangTerpilih}</strong>? Tindakan
          ini tidak dapat dibatalkan.
        </p>
      </DialogBody>

      <DialogFooter className="space-x-4">
        <Button variant="gradient" color="red">
          Hapus
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default ModalKonfirmasiHapusAdmin;
