import React from "react";
import { Link } from "react-router-dom";

import {
  AiFillHome,
  AiOutlineUser,
  AiFillGolden,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { HiHome } from "react-icons/hi";
import { CgProfile } from "react-icons/cg";
import { IoIosNotificationsOutline } from "react-icons/io";
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
    <div className="dashboard flex  bg-[#F9FAFB] w-screen h-screen">
      <div className="bg-white text-white shadow-md space-y-6 py-7 px-2">
        <h2 className="text-2xl font-extrabold text-center mb-6 text-black">
          My Kantin
        </h2>
        <nav className="space-y-5">
          <div className="flex space-x-2 hover:bg-[#1450A3] w-[200px] h-[30px] p-1">
            <HiHome className="w-[25px] h-[25px] text-black hover:text-white" />
            <Link to="/dashboard" className="text-black ">
              Home
            </Link>
          </div>
          <div className="flex space-x-2 hover:bg-[#1450A3] w-[200px] h-[30px] p-1">
            <AiOutlineUser className="w-[25px] h-[25px] text-black hover:text-white" />
            <Link to="/dashboard/User" className="text-black ">
              User
            </Link>
          </div>
          <div className="flex space-x-2 hover:bg-[#1450A3] w-[200px] h-[30px] p-1">
            <AiFillGolden className="w-[25px] h-[25px] text-black hover:text-white" />
            <Link to="/dashboard/produk" className="text-black ">
              Produk
            </Link>
          </div>

          <Link
            to="/dashboard/Blog"
            className="block py-2.5 px-4 hover:bg-blue-600 text-black"
          >
            Blog
          </Link>
        </nav>
      </div>

      <div className="">
        <div className="w-[1080px] h-[60px] bg-white shadow-md">
          <div className="flex mt-3 justify-between ">
            <input
              className="p-2 border rounded-md w-[500px] shadow-md ml-2"
              placeholder="Search"
            />

            <div className="space-x-3 mr-2">
              <button className="bg-blue-500 text-white p-2 rounded-md">
                <CgProfile className="w-[30px] h-[20px] from-neutral-300" />
              </button>
              <button className="bg-blue-500 text-white p-2 rounded-md">
                <IoIosNotificationsOutline className="w-[30px] h-[20px] from-neutral-300" />
              </button>
              <button className="bg-blue-500 text-white p-2 rounded-md">
                <AiOutlineShoppingCart className="w-[30px] h-[20px] from-neutral-300" />
              </button>
            </div>
          </div>
        </div>
        <h1 className="text-2xl font-bold m-5">HI, WELCOME BACK</h1>

        <div className="grid grid-cols-4 gap-3 p-5 space-x-0">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white p-4 rounded shadow-md w-[200px] h-[220px] rounded-md"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-[170px] h-[100px] object-cover mb-4 rounded border"
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
