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
import useSuntingSayuran from "@/hooks/useSuntingSayuran";
import Memuat from "@/components/memuat";

const ModalSuntingSayuran = ({
  terbuka,
  tanganiTutup,
  sayuranYangTerpilih,
}) => {
  const {
    nama,
    setNama,
    harga,
    setHarga,
    berat,
    setBerat,
    stok,
    setStok,
    deskripsi,
    setDeskripsi,
    gambarSayuran,
    tanganiGambarSayuran,
    sedangMemuatSuntingSayuran,
    suntingSayuran,
  } = useSuntingSayuran(sayuranYangTerpilih);

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

      <DialogHeader className="text-white">Sunting Sayuran</DialogHeader>
      <DialogBody divider>
        <form className="flex flex-col gap-4">
          {gambarSayuran ? (
            <div className="flex justify-center mb-4">
              <img
                src={gambarSayuran}
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
            onChange={tanganiGambarSayuran}
            style={{ display: "none" }}
          />

          <label
            htmlFor="unggah-gambar"
            className="flex items-center justify-center bg-[#1a1a1a] text-white p-3 rounded-lg cursor-pointer"
          >
            <span className="mr-3">Pilih Gambar Sayuran</span>
          </label>

          <Input
            color="white"
            label="Nama Sayuran"
            className="bg-[#1a1a1a] text-white"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
          />

          <div className="flex flex-col md:flex-row gap-2">
            <Input
              color="white"
              label="Harga Sayuran"
              type="number"
              className="bg-[#1a1a1a] text-white flex-1"
              value={harga}
              onChange={(e) => setHarga(e.target.value)}
            />

            <Select
              label="Pilih Berat Sayuran"
              labelProps={{ className: "text-white" }}
              className="text-white flex-1"
              value={berat}
              onChange={(value) => setBerat(value)}
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
              type="number"
              className="bg-[#1a1a1a] text-white flex-1"
              value={stok}
              onChange={(e) => setStok(e.target.value)}
            />
          </div>

          <Textarea
            color="white"
            label="Deskripsi Sayuran"
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
            await suntingSayuran();
            tanganiTutup(false);
          }}
          disabled={sedangMemuatSuntingSayuran}
        >
          {sedangMemuatSuntingSayuran ? <Memuat /> : "Sunting Sayuran"}
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default ModalSuntingSayuran;
