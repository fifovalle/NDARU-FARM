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
// PENGAIT KAMI
import useTambahBerita from "@/hooks/useTambahBerita";
// KOMPONEN KAMI
import Memuat from "@/components/memuat";

const ModalTambahBerita = ({ terbuka, tanganiTutup }) => {
  const {
    judul,
    setJudul,
    tanggalTerbit,
    setTanggalTerbit,
    kategori,
    setKategori,
    deskripsi,
    setDeskripsi,
    gambarBerita,
    tanganiGambarBerita,
    sedangMemuatTambahBerita,
    tambahBerita,
  } = useTambahBerita();

  return (
    <Dialog
      open={terbuka}
      handler={tanganiTutup}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
      size="md"
      className="bg-[#121212] max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-4"
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

      <DialogHeader className="text-white">Tambah Berita Baru</DialogHeader>
      <DialogBody divider>
        <form className="flex flex-col gap-4">
          {gambarBerita ? (
            <div className="flex justify-center mb-4">
              <img
                src={URL.createObjectURL(gambarBerita)}
                alt="Pratinjau Gambar"
                className="w-96 h-56 object-cover rounded-lg border border-gray-300"
              />
            </div>
          ) : (
            <div className="flex justify-center mb-4">
              <div className="w-96 h-56 bg-gray-700 rounded-lg flex items-center justify-center text-white">
                Pratinjau Gambar
              </div>
            </div>
          )}

          <input
            type="file"
            accept="image/*"
            id="unggah-gambar"
            onChange={tanganiGambarBerita}
            style={{ display: "none" }}
          />

          <label
            htmlFor="unggah-gambar"
            className="flex items-center justify-center bg-[#1a1a1a] text-white p-3 rounded-lg cursor-pointer"
          >
            <span className="mr-3">Pilih Gambar Berita</span>
          </label>

          <Input
            color="white"
            label="Judul Berita"
            value={judul}
            onChange={(e) => setJudul(e.target.value)}
            className="bg-[#1a1a1a] text-white"
          />

          <div className="flex flex-col md:flex-row gap-2">
            <Input
              color="white"
              label="Tanggal Terbit Berita"
              type="date"
              value={tanggalTerbit}
              onChange={(e) => setTanggalTerbit(e.target.value)}
              className="bg-[#1a1a1a] text-white"
            />

            <Select
              label="Pilih Kategori Berita"
              labelProps={{ className: "text-white" }}
              value={kategori}
              onChange={setKategori}
              className="text-white flex-1"
            >
              <Option value="Buah">Buah</Option>
              <Option value="Sayuran">Sayuran</Option>
            </Select>
          </div>

          <Textarea
            color="white"
            label="Deskripsi Berita"
            value={deskripsi}
            onChange={(e) => setDeskripsi(e.target.value)}
            className="bg-[#1a1a1a] text-white"
          />
        </form>
      </DialogBody>
      <DialogFooter>
        <Button
          variant="gradient"
          color="dark"
          onClick={async () => {
            await tambahBerita();
            tanganiTutup(false);
          }}
          disabled={sedangMemuatTambahBerita}
        >
          {sedangMemuatTambahBerita ? <Memuat /> : "Tambah Berita"}
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default ModalTambahBerita;
