import { PhoneIcon, SearchIcon } from "@chakra-ui/icons";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import React from "react";
import {
  FaCube,
  FaMoneyBills,
  FaUpRightFromSquare,
  FaUserGroup,
} from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  function randomColorWithBlack() {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);

    const luminance = (0.299 * red + 0.587 * green + 0.114 * blue) / 255;

    const minLuminance = 0.5;
    const multiplier = minLuminance / luminance;

    const newRed = Math.min(Math.floor(red * multiplier), 255);
    const newGreen = Math.min(Math.floor(green * multiplier), 255);
    const newBlue = Math.min(Math.floor(blue * multiplier), 255);

    const hexColor = `#${newRed.toString(16).padStart(2, "0")}${newGreen
      .toString(16)
      .padStart(2, "0")}${newBlue.toString(16).padStart(2, "0")}`;

    return hexColor;
  }

  const dash = [
    {
      title: "Total Barang",
      isi: "150",
      icon: <FaCube color="#000000" />,
    },
    {
      title: "Laba Rugi",
      isi: "150",
      icon: <FaMoneyBills color="#000000" />,
    },
    {
      title: "User",
      isi: "150",
      icon: <FaUserGroup color="#000000" />,
    },
  ];
  const shortcut = [
    {
      title: "User",
      isi: "150",
      to: "user",
    },
    {
      title: "Produk",
      isi: "150",
      to: "produk",
    },
    {
      title: "Laporan",
      isi: "150",
      to: "laporan",
    },
    {
      title: "Profile",
      isi: "150",
      to: "profile",
    },
  ];
  return (
    <div className="w-full grid grid-cols-8 gap-x-5">
      <section className="col-span-6">
        <div className="mb-10">
          
        </div>

        <div className="w-full mb-10">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-[10px] h-[10px] bg-black rounded-full"></div>
            <h1 className="uppercase font-bold text-[20px]">Dashboard</h1>
          </div>
          <div className="grid grid-cols-3 gap-x-5">
            {dash.map((item, i) => {
              return (
                <div
                  key={i}
                  className="flex items-center p-3 rounded-lg space-x-3 bg-secondary"
                >
                  <div className="p-3 rounded-full bg-white">{item.icon}</div>
                  <div>
                    <p className="text-[#000000]">{item.title}</p>
                    <p className="text-white text-[20px]">{item.isi}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="w-full mb-10">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-[10px] h-[10px] bg-black rounded-full"></div>
            <h1 className="uppercase font-bold text-[20px]">Shortcut</h1>
          </div>
          <div className="grid grid-cols-4 gap-x-5">
            {shortcut.map((_, i) => {
              const randomColor = randomColorWithBlack();
              return (
                <div
                  onClick={() => {
                    navigate(`/admin/${_.to}`, {});
                  }}
                  key={i}
                  style={{ backgroundColor: randomColor }}
                  className="hover:shadow-2xl hover:scale-105 cursor-pointer flex flex-col items-start justify-center w-full p-7 rounded-lg transition-all ease-in-out"
                >
                  <div className={`bg-white p-3 rounded-lg mb-2`}>
                    <FaUpRightFromSquare />
                  </div>
                  <p className="text-white text-[20px]">Halaman {_.title}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="w-full">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-[10px] h-[10px] bg-black rounded-full"></div>
            <h1 className="uppercase font-bold text-[20px]">Title</h1>
          </div>
          <div className="w-full h-[300px] bg-secondary rounded-lg"></div>
        </div>
      </section>

      <section className="w-full h-full rounded-lg bg-secondary col-span-2"></section>
    </div>
  );
};

export default Dashboard;
