import React from "react";
import { Link } from "react-router-dom";
const products = [
  { id: 1, name: "Nasi Goreng", price: "Rp. 20.000", image: "background.png" },
  { id: 2, name: "Mie Ayam", price: "Rp. 15.000", image: "background.png" },
  { id: 1, name: "Nasi padang", price: "Rp. 20.000", image: "background.png" },
  {
    id: 2,
    name: "Tacret enak bangat",
    price: "Rp. 15.000",
    image: "background.png",
  },
  { id: 1, name: "Nasi uduk ", price: "Rp. 20.000", image: "background.png" },
  {
    id: 2,
    name: "telor mie (DARMIE)",
    price: "Rp. 15.000",
    image: "background.png",
  },
];
export default function Dashboard() {
  return (
    <div className="dashboard flex h-auto w-screen bg-gray-200">
      <div className="bg-blue-900 text-white w-64 space-y-6 py-7 px-2">
        <h2 className="text-2xl font-extrabold mb-6">My Kantin</h2>
        <nav>
          <Link to="/dashboard" className="block py-2.5 px-4 hover:bg-blue-600">
            Home
          </Link>
          <Link
            to="/dashboard/User"
            className="block py-2.5 px-4 hover:bg-blue-600"
          >
            User
          </Link>
          <Link
            to="/dashboard/Produk"
            className="block py-2.5 px-4 hover:bg-blue-600"
          >
            Produk
          </Link>
          <Link
            to="/dashboard/Blog"
            className="block py-2.5 px-4 hover:bg-blue-600"
          >
            Blog
          </Link>
        </nav>
      </div>

      <div className="flex-1 p-5 w-screen ">
        <div className="flex space-x-4  mb-6 justify-end">
          <input className="p-2 border rounded-md" placeholder="Search" />

          <button className="bg-blue-500 text-white p-2 rounded-md">
            Profile
          </button>
          <button className="bg-blue-500 text-white p-2 rounded-md">
            Notifikasi
          </button>
          <button className="bg-blue-500 text-white p-2 rounded-md">
            Keranjang
          </button>
        </div>
        <h1 className="text-2xl font-bold m-5">HI, WELCOME BACK</h1>
        <div className="grid grid-cols-3 gap-4 p-5 space-x-0">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-blue-500 p-4 rounded shadow-md w-80 h-80"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover mb-4 rounded"
              />
              <h3 className="font-bold text-lg ">{product.name}</h3>
              <p>{product.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
