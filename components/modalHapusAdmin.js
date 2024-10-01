import React from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
} from "@material-tailwind/react";
import { ShieldExclamationIcon } from "@heroicons/react/24/outline";

// PENGAIT KAMI
import useHapusAdmin from "@/hooks/useHapusAdmin";

const ModalHapusAdmin = ({ terbuka, tanganiTutup, hapusAdmin }) => {
  const { sedangMemuatHapusDataAdmin } = useHapusAdmin();

  return (
    <Dialog
      open={terbuka}
      handler={tanganiTutup}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
      size="md"
      className="bg-[#1E1E1E] max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg rounded-lg shadow-xl"
    >
      <DialogHeader className="text-white flex items-center gap-2">
        <ShieldExclamationIcon className="w-6 h-6 text-red-500" /> Hapus Admin
      </DialogHeader>
      <DialogBody
        divider
        className="text-white flex flex-col items-center gap-4"
      >
        <p className="text-center">
          Apakah kamu yakin ingin menghapus admin ini? Tindakan ini tidak dapat
          diurungkan.
        </p>
      </DialogBody>
      <DialogFooter className="flex justify-center gap-4">
        <Button
          variant="outlined"
          color="gray"
          className="text-gray-400 border-gray-600"
          onClick={() => tanganiTutup()}
        >
          Tidak
        </Button>
        <Button
          variant="gradient"
          color="red"
          className="bg-red-600 text-white"
          onClick={hapusAdmin}
          disabled={sedangMemuatHapusDataAdmin}
        >
          {sedangMemuatHapusDataAdmin ? "Menghapus..." : "Iya"}
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default ModalHapusAdmin;
