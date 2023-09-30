import React, { useState } from "react";
import { updateUser } from "../Api/user";
import Select from "./select";

export default function UpdateUserData({ data, afterUpdate }) {
  const [formData, setFormData] = useState({
    nama: data.nama,
    email: data.email,
    role: data.role,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Untuk update barang, Anda mungkin perlu melakukan request API di sini

    // Dummy function, Anda harus menggantinya dengan fungsi sebenarnya
    await updateUser(data.id, formData);

    if (afterUpdate) afterUpdate();
  };

  return (
    <div className="container mx-auto mt-10">
      <h2 className="text-2xl font-semibold text-black mb-6">Update User</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="container mx-auto mt-10">
          <label className="block text-sm font-medium text-gray-600">
            Username
          </label>
          <input
            type="text"
            name="nama"
            value={formData.nama}
            onChange={handleChange}
            className="w-[100%] h-10 border-2 p-1 text-sm border-gray-400 focus:border-sky-600 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">
            Email
          </label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-[100%] h-10 border-2 p-1 text-sm border-gray-400 focus:border-sky-600 rounded-md"
          />
        </div>

        <div>
          <Select
            name="role"
            id="role"
            onChange={formData.handleChange}
            value={formData.values.role}
          >
            <option value={formData.values.role} className="text-center">
              --Please choose Role--
            </option>
            <option value={formData.values.petugas}>Petugas</option>
            <option value={formData.values.administrator}>Administrator</option>
          </Select>
        </div>

        

        <div className="flex justify-end">
          <button
            type="submit"
            className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-700"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
}
