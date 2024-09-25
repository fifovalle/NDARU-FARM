import React from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  IconButton,
  Button,
  Input,
  Select,
  Option,
  Textarea,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

// HOOKS KAMI
import useSuntingSayuran from "@/hooks/useSuntingSayuran";

const ModalSuntingSayuran = ({ terbuka, tanganiTutup, sayuranTerpilih }) => {
  const {
    namaSayuran,
    setNamaSayuran,
    gambarSayuran,
    tanganiGambarSayuran,
    hargaSayuran,
    setHargaSayuran,
    pilihBeratSayuran,
    setPilihBeratSayuran,
    stokSayuran,
    setStokSayuran,
    deskripsiSayuran,
    setDeskripsiSayuran,
    simpanDataSayuran,
  } = useSuntingSayuran(sayuranTerpilih);

  const tanganiKetikaDisimpan = async () => {
    await simpanDataSayuran();
    tanganiTutup();
  };

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

      <DialogHeader className="text-white">Sunting Sayuran</DialogHeader>
      <DialogBody divider>
        <form className="flex flex-col gap-4">
          <Input
            color="white"
            label="Nama Sayuran"
            className="bg-[#1a1a1a] text-white"
            value={namaSayuran}
            onChange={(e) => setJudul(e.target.value)}
          />
          <Input
            color="white"
            label="Harga Sayuran"
            type="date"
            className="bg-[#1a1a1a] text-white"
            value={hargaSayuran}
            onChange={(e) => setTanggalTerbit(e.target.value)}
          />
          <Select
            label="Pilih Berat Sayuran"
            labelProps={{ className: "text-white" }}
            className="text-white"
            value={pilihBeratSayuran}
            onChange={(value) => setKategori(value)}
          >
            <Option value="1">1 Kg</Option>
            <Option value="2">2 Kg</Option>
            <Option value="3">3 Kg</Option>
            <Option value="4">4 Kg</Option>
            <Option value="5">5 Kg</Option>
          </Select>

          <Input
            color="white"
            label="Stok Sayuran"
            type="date"
            className="bg-[#1a1a1a] text-white"
            value={stokSayuran}
            onChange={(e) => setTanggalTerbit(e.target.value)}
          />

          <Textarea
            color="white"
            label="Deskripsi Berita"
            className="bg-[#1a1a1a] text-white"
            value={deskripsiSayuran}
            onChange={(e) => setDeskripsi(e.target.value)}
          />
          <Input
            color="white"
            label="URL Gambar Sayuran"
            className="bg-[#1a1a1a] text-white"
            value={gambarSayuran}
            onChange={(e) => setGambar(e.target.value)}
          />
        </form>
      </DialogBody>
      <DialogFooter>
        <Button variant="gradient" color="dark" onClick={tanganiKetikaDisimpan}>
          Sunting Sayuran
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default ModalSuntingSayuran;
