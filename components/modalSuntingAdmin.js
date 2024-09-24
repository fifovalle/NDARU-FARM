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

// HOOKS KAMI
import useSuntingAdmin from "@/hooks/useSuntingAdmin";

const ModalSuntingAdmin = ({ terbuka, tanganiTutup, adminTerpilih }) => {
  const [lihatKataSandi, setLihatKataSandi] = useState(false);
  const [lihatKonfirmasiKataSandi, setLihatKonfirmasiKataSandi] =
    useState(false);

  const {
    namaDepan,
    setNamaDepan,
    namaBelakang,
    setNamaBelakang,
    namaPengguna,
    setNamaPengguna,
    email,
    setEmail,
    kataSandi,
    setKataSandi,
    konfirmasiKataSandi,
    setKonfirmasiKataSandi,
    nomorPonsel,
    setNomorPonsel,
    jenisKelamin,
    setJenisKelamin,
    simpanDataAdmin,
  } = useSuntingAdmin(adminTerpilih);

  const toggleLihatKataSandi = () => setLihatKataSandi(!lihatKataSandi);
  const toggleLihatKonfirmasiKataSandi = () =>
    setLihatKonfirmasiKataSandi(!lihatKonfirmasiKataSandi);

  const tanganiKetikaDisimpan = async () => {
    await simpanDataAdmin();
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

      <DialogHeader className="text-white">Tambah Admin Baru</DialogHeader>
      <DialogBody divider>
        <form className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row gap-5">
            <Input
              color="white"
              label="Nama Depan Admin"
              className="bg-[#1a1a1a] text-white"
              value={namaDepan}
              onChange={(e) => setNamaDepan(e.target.value)}
            />
            <Input
              color="white"
              label="Nama Belakang Admin"
              className="bg-[#1a1a1a] text-white"
              value={namaBelakang}
              onChange={(e) => setNamaBelakang(e.target.value)}
            />
          </div>
          <Input
            color="white"
            label="Nama Pengguna Admin"
            className="bg-[#1a1a1a] text-white"
            value={namaPengguna}
            onChange={(e) => setNamaPengguna(e.target.value)}
          />
          <Input
            color="white"
            label="Email Admin"
            type="email"
            className="bg-[#1a1a1a] text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="relative">
              <Input
                color="white"
                label="Kata Sandi Admin"
                type={lihatKataSandi ? "text" : "password"}
                className="bg-[#1a1a1a] text-white"
                value={kataSandi}
                onChange={(e) => setKataSandi(e.target.value)}
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
                value={konfirmasiKataSandi}
                onChange={(e) => setKonfirmasiKataSandi(e.target.value)}
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
                value={nomorPonsel}
                onChange={(e) => setNomorPonsel(e.target.value)}
              />
            </div>
            <Select
              label="Pilih Jenis Kelamin Admin"
              labelProps={{ className: "text-white" }}
              className="text-white"
              value={jenisKelamin}
              onChange={(value) => setJenisKelamin(value)}
            >
              <Option value="Pria">Pria</Option>
              <Option value="Wanita">Wanita</Option>
            </Select>
          </div>
        </form>
      </DialogBody>
      <DialogFooter>
        <Button variant="gradient" color="dark" onClick={tanganiKetikaDisimpan}>
          Sunting Admin
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default ModalSuntingAdmin;
