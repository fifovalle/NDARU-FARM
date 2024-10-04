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
import useTambahJasa from "@/hooks/useTambahJasa";
// KOMPONEN KAMI
import Memuat from "@/components/memuat";

const ModalTambahJasa = ({ terbuka, tanganiTutup }) => {
  const {
    nama,
    setNama,
    harga,
    setHarga,
    jangkaWaktu,
    setJangkaWaktu,
    deskripsi,
    setDeskripsi,
    gambarJasa,
    tanganiGambarJasa,
    tambahJasa,
    sedangMemuatTambahJasa,
  } = useTambahJasa();

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

      <DialogHeader className="text-white">Tambah Jasa Baru</DialogHeader>
      <DialogBody divider>
        <form className="flex flex-col gap-4">
          {gambarJasa ? (
            <div className="flex justify-center mb-4">
              <img
                src={URL.createObjectURL(gambarJasa)}
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
            onChange={tanganiGambarJasa}
            style={{ display: "none" }}
          />

          <label
            htmlFor="unggah-gambar"
            className="flex items-center justify-center bg-[#1a1a1a] text-white p-3 rounded-lg cursor-pointer"
          >
            <span className="mr-3">Pilih Gambar Jasa</span>
          </label>

          <Input
            color="white"
            label="Nama Jasa"
            className="bg-[#1a1a1a] text-white"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
          />

          <div className="flex flex-col md:flex-row gap-2">
            <Input
              color="white"
              label="Harga Jasa"
              type="number"
              className="bg-[#1a1a1a] text-white flex-1"
              value={harga}
              onChange={(e) => setHarga(Number(e.target.value))}
            />

            <Select
              label="Pilih Jangka Waktu Jasa"
              labelProps={{ className: "text-white" }}
              className="text-white flex-1"
              value={jangkaWaktu}
              onChange={(value) => setJangkaWaktu(value)}
            >
              <Option value="1">1 Bulan</Option>
              <Option value="2">2 Bulan</Option>
              <Option value="3">3 Bulan</Option>
              <Option value="4">4 Bulan</Option>
              <Option value="5">5 Bulan</Option>
            </Select>
          </div>

          <Textarea
            color="white"
            label="Deskripsi Jasa"
            className="bg-[#1a1a1a] text-white"
            value={deskripsi}
            onChange={(e) => setDeskripsi(e.target.value)}
          />
        </form>
      </DialogBody>
      <DialogFooter>
        <Button
          variant="gradient"
          color="dark"
          onClick={async () => {
            await tambahJasa();
            tanganiTutup(false);
          }}
          disabled={sedangMemuatTambahJasa}
        >
          {sedangMemuatTambahJasa ? <Memuat /> : "Tambah Jasa"}
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default ModalTambahJasa;
