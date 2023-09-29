import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import {
  AiFillHome,
  AiOutlineUser,
  AiFillGolden,
  AiOutlineShoppingCart,
  AiFillDatabase,
} from "react-icons/ai";
import { BiLogOutCircle } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { getAllProduk } from "../../Api/kantin";

export default function Dashboard() {
  const [listBarang, setListBarang] = React.useState([]);

  const fetchBarang = async () => {
    try {
      const response = await getAllProduk();
      console.log("res", response);
      setListBarang(response.data.data);
      console.log(listBarang);
    } catch (error) {
      console.error("Terjadi kesalahan saat mengambil data barang:", error);
    }
  };
  const handleLogout = () => {
    // Menghapus token dari localStorage
    localStorage.removeItem("token");

    // Redirect atau melakukan hal lain sesuai kebutuhan
    alert("Anda telah logout");
  };
  const [isProfileMenuOpen, setProfileMenuOpen] = React.useState(false);
  useEffect(() => {
    fetchBarang();
  }, []);
  return (
    <html className="{ 'theme-dark': dark }" x-data="data()" lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Login - Windmill Dashboard</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <script
          src="https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.x.x/dist/alpine.min.js"
          defer
        ></script>
        <script src="js/init-alpine.js"></script>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.3/Chart.min.css"
        />
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.3/Chart.min.js"
          defer
        ></script>
        <script src="js/charts-lines.js" defer></script>
        <script src="js/charts-pie.js" defer></script>
      </head>
      <body>
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
          <aside className="z-20 hidden w-64 overflow-y-auto bg-gray-50 dark:bg-gray-900 md:block flex-shrink-0">
            <div className="py-4 text-gray-500 dark:text-gray-400">
              <a
                className="ml-6 text-lg font-bold text-white items-center text-[30px]"
                href="#"
              >
                Mykanten
              </a>
              <ul className="mt-6">
                <li className="relative px-6 py-3">
                  <a
                    className="inline-flex items-center w-full text-sm font-semibold text-black transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 dark:text-gray-500"
                    href="/dashboard"
                  >
                    <svg
                      className="w-5 h-5"
                      aria-hidden="true"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                    </svg>
                    <span className="ml-4">Dashboard</span>
                  </a>
                </li>
              </ul>
              <ul>
                <li className="relative px-6 py-3">
                  <a
                    className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                    href="/dashboard/User"
                  >
                    <FaUserCircle className="w-5 h-5" />
                    <span className="ml-4">User</span>
                  </a>
                </li>
                <li className="relative px-6 py-3">
                  <a
                    className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                    href="/dashboard/Produk"
                  >
                    <AiFillGolden className="w-[25px] h-[25px] text-white " />

                    <span className="ml-4">Produk</span>
                  </a>
                </li>

                <li className="relative">
                  <button
                    onClick={() => setProfileMenuOpen(!isProfileMenuOpen)}
                  >
                    <div cls>
                      <div className="w-10 h-10 bg-gray-400 rounded-full mt-56 ml-5"></div>
                    </div>
                  </button>

                  {isProfileMenuOpen && (
                    <ul
                      className="absolute right-0 w-56 p-2 mt-1 space-y-2 text-gray-600 bg-white border border-gray-100 rounded-md shadow-md dark:border-gray-700 dark:text-gray-300 dark:bg-gray-700 mr-2"
                      aria-label="submenu"
                    >
                      {/* Menu items... */}
                      <li className="flex">
                        <a
                          className="inline-flex items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                          href="#"
                        >
                          {/* SVG for Profile */}
                          {/* ... */}
                          <span>Profile</span>
                        </a>
                      </li>
                      {/* ... other menu items */}
                      <li className="flex ">
                        <a
                          className="inline-flex items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                          href="#"
                          onClick={handleLogout}
                        >
                          <Link
                            to="/login"
                            className="text-black flex text-white"
                            // onClick={handleLogout}
                          >
                            <BiLogOutCircle className="w-5 h-5 mr-2" />
                            Logout
                          </Link>
                        </a>
                      </li>
                      {/* <div className="w-10 h-10 ">fathan</div> */}
                    </ul>
                  )}
                  <template x-if="isNotificationsMenuOpen">
                    <ul className="absolute right-0 w-56 p-2 mt-2 space-y-2 text-gray-600 bg-white border border-gray-100 rounded-md shadow-md dark:text-gray-300 dark:border-gray-700 dark:bg-gray-700">
                      <li className="flex">
                        <a
                          className="inline-flex items-center justify-between w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                          href="#"
                        >
                          <span>Messages</span>
                          <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-600 bg-red-100 rounded-full dark:text-red-100 dark:bg-red-600">
                            13
                          </span>
                        </a>
                      </li>
                      <li className="flex">
                        <a
                          className="inline-flex items-center justify-between w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                          href="#"
                        ></a>
                      </li>
                      <li className="flex">
                        <a
                          className="inline-flex items-center justify-between w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                          href="#"
                        >
                          <span>Alerts</span>
                        </a>
                      </li>
                    </ul>
                  </template>
                </li>
              </ul>
            </div>
          </aside>

          <div className="flex flex-col flex-1 w-full">
            <header className="z-10 py-4 bg-[#ffffff] shadow-md dark:bg-gray-800">
              <div className="container flex items-center justify-between h-full px-6 mx-auto text-purple-600 dark:text-purple-300">
                <button
                  className="p-1 mr-5 -ml-1 rounded-md md:hidden focus:outline-none focus:shadow-outline-purple"
                  aria-label="Menu"
                >
                  <svg
                    className="w-6 h-6"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </button>
                <div className="flex justify-center flex-1 lg:mr-32">
                  <div className="relative w-full max-w-xl mr-6 focus-within:text-purple-500">
                    <div className="absolute inset-y-0 flex items-center pl-2">
                      {/* <svg
                        className="w-4 h-4"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                          clip-rule="evenodd"
                        ></path>
                      </svg> */}
                    </div>
                    <input
                      className="w-full h-10 pl-8 pr-2 text-sm text-black placeholder-white bg-white border-0 rounded-md dark:focus:shadow-outline-gray dark:focus:placeholder-gray-600 dark:bg-gray-700 dark:text-gray-200 focus:placeholder-gray-500 focus:bg-white focus:border-purple-300 focus:outline-none focus:shadow-outline-purple form-input"
                      type="text"
                      placeholder="Search for projects"
                      aria-label="Search"
                    />
                  </div>
                </div>
                <ul className="flex items-center flex-shrink-0 space-x-6">
                  <li className="flex">
                    <button
                      className="rounded-md focus:outline-none focus:shadow-outline-purple"
                      aria-label="Toggle color mode"
                    >
                      <template x-if="!dark">
                        <svg
                          className="w-5 h-5"
                          aria-hidden="true"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                        </svg>
                      </template>
                      <template x-if="dark">
                        <svg
                          className="w-5 h-5"
                          aria-hidden="true"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                      </template>
                    </button>
                  </li>

                  <li className="relative">
                    <button
                      className="align-middle rounded-full focus:shadow-outline-purple focus:outline-none"
                      aria-label="Account"
                      aria-haspopup="true"
                    ></button>
                  </li>
                </ul>
              </div>
            </header>
            <main className="h-full overflow-y-auto bg-[#f5f5f5]">
              <div className="container px-6 mx-auto grid ">
                <h2 className="my-6 text-2xl font-semibold text-black ">
                  Dashboard
                </h2>

                <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
                  <div className="flex items-center p-4 rounded-lg shadow-xs bg-[#1450A3]">
                    <div className="p-3 mr-4 text-orange-500 bg-orange-100 rounded-full dark:text-orange-100 dark:bg-red-500">
                      <AiFillDatabase />
                    </div>
                    <div>
                      <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                        Total Barang
                      </p>
                      <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                        00
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center p-4 bg-[#1450A3] shadow-md rounded-lg shadow-xs ">
                    <div className="p-3 mr-4 text-green-500 bg-green-100 rounded-full dark:text-green-100 dark:bg-green-500">
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </div>
                    <div>
                      <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                        Laba
                      </p>
                      <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                        00
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center p-4 bg-[#1450A3] shadow-md rounded-lg shadow-xs ">
                    <div className="p-3 mr-4 text-blue-500 bg-blue-100 rounded-full dark:text-blue-100 dark:bg-blue-500">
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>
                      </svg>
                    </div>
                    <div>
                      <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                        Rugi
                      </p>
                      <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                        00
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center p-4 bg-[#1450A3] shadow-md rounded-lg shadow-xs ">
                    <div className="p-3 mr-4 text-orange-500 bg-orange-100 rounded-full dark:text-orange-100 dark:bg-orange-500">
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
                      </svg>
                    </div>

                    <div>
                      <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                        User
                      </p>
                      <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                        00
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
