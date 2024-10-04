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
// PENGAIT KAMI
import useHapusSaranaPertanian from "@/hooks/useHapusSaranaPertanian";
// KOMPONEN KAMI
import Memuat from "@/components/memuat";

const ModalKonfirmasiHapusSaranaPertanian = ({
  terbuka,
  tanganiTutup,
  saranaPertanianYangTerpilih,
}) => {
  const { sedangMemuatHapusSaranaPertanian, hapusSaranaPertanian } =
    useHapusSaranaPertanian(saranaPertanianYangTerpilih);

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

      <DialogHeader className="text-white">
        Konfirmasi Hapus Sarana Pertanian
      </DialogHeader>
      <DialogBody className="text-white">
        <p>
          Apakah Anda yakin ingin menghapus sarana pertanian{" "}
          <strong className="font-bold">{saranaPertanianYangTerpilih}</strong>?
          Tindakan ini tidak dapat dibatalkan.
        </p>
      </DialogBody>

      <DialogFooter className="space-x-4">
        <Button
          variant="gradient"
          color="red"
          onClick={async () => {
            await hapusSaranaPertanian(saranaPertanianYangTerpilih);
            tanganiTutup(false);
          }}
          disabled={sedangMemuatHapusSaranaPertanian}
        >
          {sedangMemuatHapusSaranaPertanian ? <Memuat /> : "Hapus"}
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default ModalKonfirmasiHapusSaranaPertanian;
