
import React, { useState } from 'react';
import { updateProduk} from '../Api/kantin';

export default function UpdateBarang({ data, afterUpdate }) {
  const [formData, setFormData] = useState({
    namaBarang: data.namaBarang,
    stok: data.stok,
    kodeBarang: data.kodeBarang,
    gambarBarang: data.gambarBarang
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Untuk update barang, Anda mungkin perlu melakukan request API di sini

    // Dummy function, Anda harus menggantinya dengan fungsi sebenarnya
    await updateProduk(data.id, formData);

    if (afterUpdate) afterUpdate();
  };

  return (
    <div className='container mx-auto mt-10'>
          <h2 className="text-2xl font-semibold text-black mb-6">Update Barang</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div  className='container mx-auto mt-10'>
          <label className="block text-sm font-medium text-gray-600">Nama Barang</label>
          <input 
            type="text" 
            name="namaBarang" 
            value={formData.namaBarang}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Stok</label>
          <input 
            type="number" 
            name="stok" 
            value={formData.stok}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">kodeBarang</label>
          <input 
            type="number" 
            name="stok" 
            value={formData.kodeBarang}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Gambar Barang</label>
          <input 
            type="text" 
            name="gambarBarang" 
            value={formData.gambarBarang}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>

        <div className="flex justify-end">
          <button type="submit" className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-700">
            Update
          </button>
        </div>
      </form>
    </div>
  );
}