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
import useSuntingBerita from "@/hooks/useSuntingBerita";

const ModalSuntingBerita = ({ terbuka, tanganiTutup, beritaTerpilih }) => {
  const {
    judulBerita,
    setJudulBerita,
    tanggalTerbit,
    setTanggalTerbit,
    kategoriBerita,
    setKategoriBerita,
    deskripsiBerita,
    setDeskripsiBerita,
    gambarBerita,
    gambarUrlLama,
    simpanDataBerita,
    tanganiGambarBerita,
  } = useSuntingBerita(beritaTerpilih);

  const tanganiKetikaDisimpan = async () => {
    await simpanDataBerita();
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

      <DialogHeader className="text-white">Sunting Berita</DialogHeader>
      <DialogBody divider>
        <form className="flex flex-col gap-4">
          <Input
            color="white"
            label="Judul Berita"
            className="bg-[#1a1a1a] text-white"
            value={judulBerita}
            onChange={(e) => setJudulBerita(e.target.value)}
          />
          <Input
            color="white"
            label="Tanggal Terbit"
            type="date"
            className="bg-[#1a1a1a] text-white"
            value={tanggalTerbit}
            onChange={(e) => setTanggalTerbit(e.target.value)}
          />
          <Select
            label="Kategori Berita"
            labelProps={{ className: "text-white" }}
            className="text-white"
            value={kategoriBerita}
            onChange={(value) => setKategoriBerita(value)}
          >
            <Option value="Buah">Buah</Option>
            <Option value="Sayuran">Sayuran</Option>
          </Select>
          <Textarea
            color="white"
            label="Deskripsi Berita"
            className="bg-[#1a1a1a] text-white"
            value={deskripsiBerita}
            onChange={(e) => setDeskripsiBerita(e.target.value)}
          />

          <Input
            color="white"
            label="Pilih Gambar Berita"
            type="file"
            className="bg-[#1a1a1a] text-white"
            onChange={tanganiGambarBerita}
          />

          {gambarBerita && (
            <img
              src={gambarBerita}
              alt="Preview Gambar Berita"
              className="mt-4 w-full h-auto"
            />
          )}
          {!gambarBerita && gambarUrlLama && (
            <img
              src={gambarUrlLama}
              alt="Gambar Lama Berita"
              className="mt-4 w-full h-auto"
            />
          )}
        </form>
      </DialogBody>
      <DialogFooter>
        <Button variant="gradient" color="dark" onClick={tanganiKetikaDisimpan}>
          Sunting Berita
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default ModalSuntingBerita;
