import React, { useState } from "react";
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
} from "@material-tailwind/react";
import { XMarkIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

const ModalKelolaProfil = ({ terbuka, tanganiTutup }) => {
  const [gambarProfil, setGambarProfil] = useState(null);
  const [lihatKataSandi, setLihatKataSandi] = useState(false);
  const [lihatKonfirmasiKataSandi, setLihatKonfirmasiKataSandi] =
    useState(false);
  const toggleLihatKataSandi = () => setLihatKataSandi(!lihatKataSandi);
  const toggleLihatKonfirmasiKataSandi = () =>
    setLihatKonfirmasiKataSandi(!lihatKonfirmasiKataSandi);

  const tanganiGambarProfil = (event) => {
    const file = event.target.files[0];
    if (file) {
      setGambarProfil(URL.createObjectURL(file));
    }
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

      <DialogHeader className="text-white">Kelola Profil Anda</DialogHeader>
      <DialogBody divider>
        <form className="flex flex-col gap-4">
          {gambarProfil ? (
            <div className="flex justify-center mb-4">
              <img
                src={gambarProfil}
                alt="Pratinjau Gambar"
                className="w-52 h-52 object-cover rounded-lg border border-gray-300"
              />
            </div>
          ) : (
            <div className="flex justify-center mb-4">
              <div className="w-52 h-52 bg-gray-700 rounded-lg flex items-center justify-center text-white">
                Pratinjau Gambar
              </div>
            </div>
          )}

          <input
            type="file"
            accept="image/*"
            id="unggah-gambar"
            onChange={tanganiGambarProfil}
            style={{ display: "none" }}
          />

          <label
            htmlFor="unggah-gambar"
            className="flex items-center justify-center bg-[#1a1a1a] text-white p-3 rounded-lg cursor-pointer"
          >
            <span className="mr-3">Pilih Gambar Sayuran</span>
          </label>

          <div className="flex flex-col md:flex-row gap-5">
            <Input
              color="white"
              label="Nama Depan Admin"
              className="bg-[#1a1a1a] text-white"
            />
            <Input
              color="white"
              label="Nama Belakang Admin"
              className="bg-[#1a1a1a] text-white"
            />
          </div>
          <Input
            color="white"
            label="Nama Pengguna Admin"
            className="bg-[#1a1a1a] text-white"
          />
          <Input
            color="white"
            label="Email Admin"
            type="email"
            className="bg-[#1a1a1a] text-white"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="relative">
              <Input
                color="white"
                label="Kata Sandi Admin"
                type={lihatKataSandi ? "text" : "password"}
                className="bg-[#1a1a1a] text-white"
              />
              <div
                className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer"
                onClick={toggleLihatKataSandi}
              >
                {lihatKataSandi ? (
                  <EyeSlashIcon className="h-5 w-5 text-white" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-white" />
                )}
              </div>
            </div>
            <div className="relative">
              <Input
                color="white"
                label="Konfirmasi Kata Sandi Admin"
                type={lihatKonfirmasiKataSandi ? "text" : "password"}
                className="bg-[#1a1a1a] text-white"
              />
              <div
                className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer"
                onClick={toggleLihatKonfirmasiKataSandi}
              >
                {lihatKonfirmasiKataSandi ? (
                  <EyeSlashIcon className="h-5 w-5 text-white" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-white" />
                )}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="relative flex items-center">
              <span className="absolute left-4 text-white">+62</span>
              <Input
                type="tel"
                placeholder="Nomor Ponsel Admin"
                className="pl-12 text-white placeholder:text-white focus:ring-1 focus-within:ring-white"
              />
            </div>
            <Select
              label="Pilih Jenis Kelamin Admin"
              labelProps={{ className: "text-white" }}
              className="text-white"
            >
              <Option value="Pria">Pria</Option>
              <Option value="Wanita">Wanita</Option>
            </Select>
          </div>
        </form>
      </DialogBody>
      <DialogFooter>
        <Button
          variant="gradient"
          color="dark"
          onClick={() => tanganiTutup(false)}
        >
          Simpan Perubahan
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default ModalKelolaProfil;
