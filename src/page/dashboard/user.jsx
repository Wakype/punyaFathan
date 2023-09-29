import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  AiFillHome,
  AiOutlineUser,
  AiFillGolden,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import * as Yup from "yup";
import { Form, formikProvider, useFormik } from "formik";
import { BiLogOutCircle } from "react-icons/bi";
import { MdDeleteForever, MdEditDocument } from "react-icons/md";
import Swal from "sweetalert2";
import { FaUserCircle } from "react-icons/fa";
// import Button from "../../component/button";
// import Input from "../../component/input";
import Skeleton from "react-loading-skeleton";
import {
  createUser,
  deleteUser,
  getDetailUser,
  getUser,
  updateUser,
} from "../../Api/user";
// import { useRouter } from "next/";
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

import { EditIcon, DeleteIcon, SearchIcon } from "@chakra-ui/icons";

export default function User() {
  const [listUser, setListUser] = React.useState([]);
  const [isFetch, setIsFetch] = React.useState(false);
  const [isShowModalEdit, setIsShowModalEdit] = React.useState(false);
  const navigate = useNavigate();
  const [isProfileMenuOpen, setProfileMenuOpen] = React.useState(false);
  const [isCreatePop, setCreatePop] = React.useState(false);
  const [roleOption, setRoleOption] = useState([]);

  let {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    setFieldTouched,
    setFieldValue,
  } = formik;
  // ----------------------------Create User----------------------------

  const formik = useFormik({
    initialValues: {
      nama: "",
      email: "",
      role: "",
    },
    validationSchema: Yup.object().shape({
      nama: Yup.string().required("nama Siswa harus diisi"),
      email: Yup.string().email().required("Email harus diisi"),
      role: Yup.string().required("role harus diisi"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        setIsFetch(true);
        const response = await createUser(values);
        console.log("response => ", response);
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });
        setCreatePop(false)
        Swal.fire({
          icon: "success",
          title: "Berhasil Menambah data",
        });
        getUser();
        resetForm({ values: "" });
        setIsShowModalEdit(false);
      } catch (error) {
        console.log(error);
      } finally {
        setIsFetch(false);
      }
    },
  });

  ///--------------------------------------------------------

  
  //--------------------------------------------------------
  //---------------------------- Update User ----------------------------

  const formikEdit = useFormik({
    initialValues: {
      nama: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      nama: Yup.string().required("nama Siswa harus diisi"),
      email: Yup.string().email().required("Email harus diisi"),
      password: Yup.string().required(" harus diisi"),
    }),
    onSubmit: async (values) => {
      try {
        setIsFetch(true);
        const response = await updateUser(values.id, values);
        console.log("id", values.id);
        console.log("response => ", response);
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: "success",
          title: "Berhasil Mengedit data",
        });
        getUser();
        setIsShowModalEdit(false);
      } catch (error) {
        console.log(error);
      } finally {
        setIsFetch(false);
      }
    },
  });

  //--------------------------------------------------------
  // ---------------------------- Log Out ----------------------------
  const handleLogout = () => {
    // Menghapus token dari localStorage
    localStorage.removeItem("token");
    try {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: "success",
      });
      return navigate("/login", { replace: true });
    } catch (error) {}
    // Redirect atau melakukan hal lain sesuai kebutuhan
    alert("Anda telah logout");
  };
  // --------------------------------------------------------
  //-------------------------------- List User --------------------------------------------------------

  const [data, setData] = useState([]);

  const fetchUser = async () => {
    const response = await getUser();
    console.log("====================================");
    console.log("response", response);
    console.log("====================================");
    return setData(response.data.data);
  };
  //--------------------------------------------------------
  const getRoleHandle = useCallback(async () => {
    const res = await getUser();
    setRoleOption(res.data.data);
  }, []);

  /// --------------------------------------------------------Delete User --------------------------------------------------------
  const deleteUserHandle = (id) => {
    console.log("button delete berjalan", id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await deleteUser(id);
          //delete
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
          fetchUser();
        } catch (err) {
          console.log("err =>", err);
          Swal.fire("Gagal!");
        }
      }
    });
    console.log("berhasil di delete", id);
  };
  //--------------------------------------------------------
  // ---------------------------Use Effect---------------------------
  useEffect(() => {
    fetchUser();
  }, []);
  // --------------------------------------------------------
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
                    <AiFillGolden className="w-[25px] h-[25px] text-gray-400 " />

                    <span className="ml-4">Produk</span>
                  </a>
                </li>
              </ul>
            </div>
          </aside>
          <aside className="fixed inset-y-0 z-20 flex-shrink-0 w-64 mt-16 overflow-y-auto bg-white dark:bg-gray-800 md:hidden">
            <div className="py-4 text-gray-500 dark:text-gray-400">
              <a
                className="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200"
                href="#"
              >
                Windmill
              </a>
              <ul className="mt-6">
                <li className="relative px-6 py-3">
                  <span
                    className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
                    aria-hidden="true"
                  ></span>
                  <a
                    className="inline-flex items-center w-full text-sm font-semibold text-gray-800 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 dark:text-gray-100"
                    href="index.html"
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
                    href="forms.html"
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
                      <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                    </svg>
                    <span className="ml-4">Forms</span>
                  </a>
                </li>
                <li className="relative px-6 py-3">
                  <a
                    className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                    href="cards.html"
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
                      <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                    </svg>
                    <span className="ml-4">Cards</span>
                  </a>
                </li>
                <li className="relative px-6 py-3">
                  <a
                    className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                    href="charts.html"
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
                      <path d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"></path>
                      <path d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"></path>
                    </svg>
                    <span className="ml-4">Charts</span>
                  </a>
                </li>
                <li className="relative px-6 py-3">
                  <a
                    className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                    href="buttons.html"
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
                      <path d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"></path>
                    </svg>
                    <span className="ml-4">Buttons</span>
                  </a>
                </li>
                <li className="relative px-6 py-3">
                  <a
                    className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                    href="modals.html"
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
                      <path d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                    </svg>
                    <span className="ml-4">Modals</span>
                  </a>
                </li>
                <li className="relative px-6 py-3">
                  <a
                    className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                    href="tables.html"
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
                      <path d="M4 6h16M4 10h16M4 14h16M4 18h16"></path>
                    </svg>
                    <span className="ml-4">Tables</span>
                  </a>
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
                      <svg
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
                      </svg>
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
                      onClick={() => setProfileMenuOpen(!isProfileMenuOpen)}
                    >
                      <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
                    </button>

                    {isProfileMenuOpen && (
                      <ul
                        className="absolute right-0 w-56 p-2 mt-2 space-y-2 text-gray-600 bg-white border border-gray-100 rounded-md shadow-md dark:border-gray-700 dark:text-gray-300 dark:bg-gray-700"
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
                        <li className="flex">
                          <a
                            className="inline-flex items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                            href="#"
                            onClick={handleLogout}
                          >
                            {/* SVG for Logout */}
                            {/* ... */}
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
              <div className="container px-6 m-3 grid">
                <div className="flex justify-between">
                  <h2 className="my-6 text-2xl font-semibold text-black">
                    User
                  </h2>
                  <div className="">
                    <button
                      className="mr-10 bg-green-500 w-36 h-10 rounded-md text-white font-semibold hover:text-white hover:bg-green-800"
                      onClick={() => setCreatePop(true)}
                    >
                      Create User
                    </button>
                    {isCreatePop ? (
                      <>
                        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                          <form onSubmit={formik.handleSubmit}>
                            <div className="relative w-auto my-6 mx-auto max-w-3xl">
                              {/*content*/}
                              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                  <h3 className="text-3xl font-semibold">
                                    Create Petugas
                                  </h3>
                                  <button
                                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                    onClick={() => setCreatePop(false)}
                                  >
                                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                      ×
                                    </span>
                                  </button>
                                </div>
                                {/* body */}
                                <div className="p-10 w-[400px] h-full">
                                  <h1 className="pt-3">nama</h1>
                                  <Input
                                    className="block w-full h-8 mt-1 text-sm border border-black rounded-md p-2 focus:outline-none focus:shadow-outline-purple dark:text-black dark:focus:shadow-outline-gray form-input bg-white "
                                    placeholder="nama"
                                    name={"nama"}
                                    value={formik.values.nama}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    iserror={
                                      formik.touched.nama && formik.errors.nama
                                    }
                                    texterror={formik.errors.nama}
                                  />
                                  <h1 className="pt-3">Email</h1>
                                  <Input
                                    className="block w-full h-8 mt-1 text-sm border border-black rounded-md p-2 focus:outline-none focus:shadow-outline-purple dark:text-black dark:focus:shadow-outline-gray form-input bg-white"
                                    placeholder="Email"
                                    name={"email"}
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    iserror={
                                      formik.touched.email &&
                                      formik.errors.email
                                    }
                                    texterror={formik.errors.email}
                                  />
                                  <h1 className="pt-3">Role</h1>
                                  <InputGroup>
                                    <Select
                                      className="block w-full h-8 mt-1 text-sm border border-black rounded-md focus:outline-none focus:shadow-outline-purple text-black dark:focus:shadow-outline-gray form-input bg-white"
                                      name="role"
                                      id="role"
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={values.role}
                                    >
                                      <option
                                        value={""}
                                        className="text-center"
                                      >
                                        --Please choose Role--
                                      </option>
                                      <option value={"petugas"}>Petugas</option>
                                      <option value={"admin"}>
                                        Administrator
                                      </option>
                                    </Select>
                                  </InputGroup>
                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                  <button
                                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={() => setCreatePop(false)}
                                  >
                                    Tutup
                                  </button>
                                  <button
                                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="submit"
                                  >
                                    {isSubmitting ? "Sedang Membuat" : "Create"}
                                  </button>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                      </>
                    ) : null}
                  </div>
                </div>
                <TableContainer>
                  <Table
                    size="md"
                    className="w-[95%] h-[75%] space-x-10 border border-collapse border-black rounded-lg"
                  >
                    <Thead>
                      <Tr className="space-x-5 bg-black text-white">
                        <Th>No</Th>
                        <Th>Nama</Th>
                        <Th>email</Th>
                        <Th>role</Th>
                        <Th>Action</Th>
                      </Tr>
                    </Thead>

                    <tbody className="">
                      {isFetch ? (
                        <tr>
                          <td colSpan={4}>
                            <Skeleton count={4} />
                          </td>
                        </tr>
                      ) : (
                        <>
                          {data.map((data, index) => {
                            return (
                              <tr
                                key={index}
                                className="border-b dark:border-neutral-500"
                              >
                                <td className="whitespace-nowrap h-2 border-l-2 border-black px-10 py-8 font-medium h-5">
                                  {index + 1}.
                                </td>
                                <td className="whitespace-nowrap h-2 border-l-2 border-black px-10 py-8 h-2  ">
                                  {data?.nama}
                                </td>
                                <td className="whitespace-nowrap h-2 border-l-2 border-black px-10 py-8 h-2  ">
                                  {data?.email}
                                </td>
                                <td className="whitespace-nowrap h-2 border-l-2 border-r-2 border-black px-2 py-8 h-2  ">
                                  {data?.role}
                                </td>

                                <td className="flex items-center whitespace-nowrap px-2 py-[15%]">
                                  <IconButton
                                    className="mr-5 w-8 h-8 bg-blue-500 ml-10 text-lg text-white rounded hover:bg-blue-800"
                                    icon={<MdEditDocument />}
                                    onClick={() => {
                                      setIsShowModalEdit(true);
                                    }}
                                  />
                                  {isShowModalEdit ? (
                                    <>
                                      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                                        <form
                                          onSubmit={formikEdit.handleSubmit}
                                        >
                                          <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                            {/*content*/}
                                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                              {/*header*/}
                                              <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                                <h3 className="text-3xl font-semibold">
                                                  Edit Siswa
                                                </h3>
                                                <button
                                                  className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none "
                                                  onClick={() =>
                                                    setIsShowModalEdit(false)
                                                  }
                                                >
                                                  <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                                    ×
                                                  </span>
                                                </button>
                                              </div>
                                              {/* body */}
                                              <div className="p-10 w-[400px] h-full">
                                                <h1 className="pt-3">nama</h1>
                                                <Input
                                                  className="w-[100%] h-10 border-2 p-1 text-sm border-gray-400 focus:border-sky-600 rounded-md"
                                                  placeholder="nama"
                                                  name={"nama"}
                                                  value={formik.values.nama}
                                                  onChange={formik.handleChange}
                                                  onBlur={formik.handleBlur}
                                                  iserror={
                                                    formik.touched.nama &&
                                                    formik.errors.nama
                                                  }
                                                  texterror={formik.errors.nama}
                                                />
                                                <h1 className="pt-3">Email</h1>
                                                <Input
                                                  className="w-[100%] mt-2 h-10 border-2 p-1 text-sm border-gray-400 focus:border-sky-600 rounded-md"
                                                  placeholder="Email"
                                                  name={"email"}
                                                  value={formik.values.email}
                                                  onChange={formik.handleChange}
                                                  onBlur={formik.handleBlur}
                                                  iserror={
                                                    formik.touched.email &&
                                                    formik.errors.email
                                                  }
                                                  texterror={
                                                    formik.errors.email
                                                  }
                                                />
                                                <h1 className="pt-3">Role</h1>
                                                <Select
                                                  name="role"
                                                  id="role"
                                                  onChange={formik.handleChange}
                                                  value={formik.values.role}
                                                >
                                                  <option
                                                    value={formik.values.role}
                                                    className="text-center"
                                                  >
                                                    --Please choose Role--
                                                  </option>
                                                  <option
                                                    value={
                                                      formik.values.petugas
                                                    }
                                                  >
                                                    Petugas
                                                  </option>
                                                  <option
                                                    value={
                                                      formik.values
                                                        .administrator
                                                    }
                                                  >
                                                    Administrator
                                                  </option>
                                                </Select>
                                              </div>
                                              {/*footer*/}
                                              <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                                <button
                                                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                  type="button"
                                                  onClick={() =>
                                                    setIsShowModalEdit(false)
                                                  }
                                                >
                                                  Tutup
                                                </button>
                                                <button
                                                  className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                  type="submit"
                                                >
                                                  {isFetch
                                                    ? "Sedang Mengedit"
                                                    : "Edit"}
                                                </button>
                                              </div>
                                            </div>
                                          </div>
                                        </form>
                                      </div>
                                      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                                    </>
                                  ) : null}
                                  <IconButton
                                    className="w-8 h-8 bg-red-500 pl-2  text-lg text-white rounded hover:bg-red-800"
                                    icon={<MdDeleteForever />}
                                    onClick={(e) => {
                                      Swal.fire({
                                        title: "Warning!",
                                        text: "Anda yakin ingin menghapus data ini?",
                                        icon: "warning",
                                        showCancelButton: true,
                                        confirmButtonColor: "#3085d6",
                                        cancelButtonColor: "#d33",
                                        confirmButtonText: "Hapus",
                                      }).then(async (result) => {
                                        if (result.isConfirmed) {
                                          try {
                                            e.preventDefault();
                                            console.log(data);
                                            const response = await deleteUser(
                                              data.id
                                            );
                                            console.log(
                                              "response => ",
                                              response
                                            );
                                            console.log("datanya", data);
                                            console.log(data.id);
                                            console.log("idnya", data.id);
                                            const Toast = Swal.mixin({
                                              toast: true,
                                              position: "top-end",
                                              showConfirmButton: false,
                                              timer: 3000,
                                              timerProgressBar: true,
                                              didOpen: (toast) => {
                                                toast.addEventListener(
                                                  "mouseenter",
                                                  Swal.stopTimer
                                                );
                                                toast.addEventListener(
                                                  "mouseleave",
                                                  Swal.resumeTimer
                                                );
                                              },
                                            });

                                            Swal.fire({
                                              icon: "success",
                                              title: "Berhasil Menghapus data",
                                            });
                                            fetchUser();
                                          } catch (error) {
                                            console.log(error);
                                            Swal.fire({
                                              icon: "error",
                                              title: "Error",
                                              text: "Ada Suatu Masalah!",
                                              footer:
                                                "<a href=console.log(error)>Kenapa saya mengalami masalah ini?</a>",
                                            });
                                          }
                                        }
                                      });
                                    }}
                                  />
                                </td>
                              </tr>
                            );
                          })}
                        </>
                      )}
                    </tbody>
                  </Table>
                </TableContainer>
              </div>
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
