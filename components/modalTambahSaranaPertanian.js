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
import useTambahSaranaPertanian from "@/hooks/useTambahSaranaPertanian";
// KOMPONEN KAMI
import Memuat from "@/components/memuat";

const ModalTambahSaranaPertanian = ({ terbuka, tanganiTutup }) => {
  const {
    nama,
    setNama,
    harga,
    setHarga,
    jenis,
    setJenis,
    stok,
    setStok,
    deskripsi,
    setDeskripsi,
    gambarSaranaPertanian,
    tanganiGambarSaranaPertanian,
    sedangMemuatTambahSarana,
    tambahSaranaPertanian,
  } = useTambahSaranaPertanian();

  return (
    <Dialog
      open={terbuka}
      handler={tanganiTutup}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
      size="lg"
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

      <DialogHeader className="text-white">
        Tambah Sarana Pertanian Baru
      </DialogHeader>
      <DialogBody divider>
        <form className="flex flex-col gap-4">
          {gambarSaranaPertanian ? (
            <div className="flex justify-center mb-4">
              <img
                src={URL.createObjectURL(gambarSaranaPertanian)}
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
            onChange={tanganiGambarSaranaPertanian}
            style={{ display: "none" }}
          />

          <label
            htmlFor="unggah-gambar"
            className="flex items-center justify-center bg-[#1a1a1a] text-white p-3 rounded-lg cursor-pointer"
          >
            <span className="mr-3">Pilih Gambar Sarana Pertanian</span>
          </label>

          <Input
            color="white"
            label="Nama Sarana Pertanian"
            className="bg-[#1a1a1a] text-white"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
          />

          <div className="flex flex-col md:flex-row gap-2">
            <Input
              color="white"
              label="Harga Sarana Pertanian"
              type="number"
              className="bg-[#1a1a1a] text-white flex-1"
              value={harga}
              onChange={(e) => setHarga(Number(e.target.value))}
            />

            <Select
              label="Pilih Jenis Sarana Pertanian"
              labelProps={{ className: "text-white" }}
              className="text-white flex-1"
              value={jenis}
              onChange={(e) => setJenis(e)}
            >
              <Option value="benih">Benih</Option>
              <Option value="obat-obatan">Obat-obatan</Option>
              <Option value="pupuk">Pupuk</Option>
            </Select>

            <Input
              color="white"
              label="Stok Sarana Pertanian"
              type="number"
              className="bg-[#1a1a1a] text-white flex-1"
              value={stok}
              onChange={(e) => setStok(Number(e.target.value))}
            />
          </div>

          <Textarea
            color="white"
            label="Deskripsi Sarana Pertanian"
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
            await tambahSaranaPertanian();
            tanganiTutup(false);
          }}
          disabled={sedangMemuatTambahSarana}
        >
          {sedangMemuatTambahSarana ? <Memuat /> : "Tambah Sarana Pertanian"}
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default ModalTambahSaranaPertanian;
