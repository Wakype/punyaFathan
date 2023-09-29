import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { createProduk } from "../Api/kantin";

import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
  IconButton,
  HStack,
  Flex,
  Spacer,
  useToast,
  InputGroup,
  InputLeftElement,
  Input,
  Checkbox,
  Image,
  Select,
} from "@chakra-ui/react";

export default function CreateBarang({afterCreate}) {
  const [namaBarang, setNamaBarang] = useState("");
  const [kodeBarang, setKodeBarang] = useState("");
  const [stok, setStok] = useState("");
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isCreatePop, setCreatePop] = React.useState(false);
  // const [gambarBarang, setGambarBarang] = useState("");
  const navigate = useNavigate();

  const [gambarBarang, setGambarBarang] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Memindahkan inisialisasi FormData ke sini
    const formData = new FormData();
    formData.append("namaBarang", namaBarang);
    formData.append("kodeBarang", kodeBarang);
    formData.append("stok", stok);
    formData.append("file", gambarBarang);

    try {
      await createProduk(formData);
      if (afterCreate) afterCreate();  // Tutup modal setelah sukses
    } catch (error) {
      // ... kode error handling ...
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setGambarBarang(file); // Ubah ini ke file, bukan e.target.value
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <h2 className="text-2xl font-semibold text-black mb-6">Tambah Barang</h2>
      <form onSubmit={handleSubmit}>
        <div className="container mx-auto mt-10 flex">
          {/* ... other parts of your form ... */}

          <div className="mb-4 w-64 h-64">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Gambar Barang:
            </label>
            <Input  
              // value={gambarBarang}
              type="file"
              // accept="image/*" // Ini memastikan hanya file gambar yang dapat dipilih
              onChange={handleImageChange}
              className="shadow appearance-none border rounded w-full  h-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
            />
            {/* <img src={payload.iamgePriview} alt={payload.iamgePriview} /> */}
          </div>
         <div className="ml-5">
         <div className="mb-4">
          <label className=" text-gray-900 text-sm font-bold mb-2">
            Nama Barang:
          </label>
          <input
            type="text"
            value={namaBarang}
            onChange={(e) => setNamaBarang(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline bg-white"
          />
        </div>
        <div className="mb-4">
          <label className=" text-gray-900 text-sm font-bold mb-2">
            Kode Barang:
          </label>
          <input
            type="text"
            value={kodeBarang}
            onChange={(e) => setKodeBarang(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline bg-white"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-900 text-sm font-bold mb-2">
            Stok:
          </label>
          <input
            type="number"
            value={stok}
            onChange={(e) => setStok(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline bg-white"
          />
        </div>
         </div>
          {/* ... other parts of your form ... */}
        </div>
       
        
        

        <div className="flex items-center justify-end space-x-4">
       
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Tambahkan
          </button>
        </div>
      </form>
    </div>
  );
}
