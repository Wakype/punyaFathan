import React from "react";
import Input from "../component/input";

import Image from "../assets/image/background.png";
import Image2 from "../assets/image/Logo MyKanten.png";
import Button from "../component/button";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { authLogin } from "../redux/actions/authAction";
import Swal from "sweetalert2";

export default function Login() {
  const navigate = useNavigate();
  const [errorEmail, setErrorEmail] = React.useState("");
  const [errorPassword, setErrorPassword] = React.useState("");
  // const [errorMessage, setMessageError] = React.useState('');

  let dispatch = useDispatch();
  const [payload, setPayload] = React.useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    console.log("change jalan");
    setPayload((payload) => {
      return {
        ...payload,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = async (e) => {
    console.log("tes");

    console.log("tes");

    e.preventDefault();
    try {
      const response = await dispatch(authLogin(payload));
      console.log("response", response);
      if (response?.status === "Success") {
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
          title: response?.msg,
        });
        return navigate("/dashboard", { replace: true });
      } else {
        // setMessageError(response?.response?.data?.msg);
        setErrorEmail(response?.response?.data?.msg);
        setErrorPassword(response?.response?.data?.msg);
        // alert('Email kosong silahkan di isi');
      }

      if (payload.password === "") {
        setErrorPassword("Password wajib diisi");
      } else if (payload.password.length < 8) {
        setErrorEmail("Password harus 8 karakter");
      }
      if (payload.email === "") {
        setErrorEmail("Email wajib diisi");
      }
    } catch (err) {
      console.log(err);
      Swal.fire("Gagal!", "Email tidak di temukan.", "error");
      alert("fail anda gagal login");
    }
  };

  const [isLoading, setIsLoading] = React.useState(false);
  return (
    <div className="flex items-center min-h-screen p-6  bg-[#2B2D31]">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-2xl ">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <img
              aria-hidden="true"
              className="object-cover w-full h-full dark:hidden"
              src={Image}
              alt="Office"
            />
            <img
              aria-hidden="true"
              className="hidden object-cover w-full h-full dark:block"
              src="../assets/img/login-office-dark.jpeg"
              alt="Office"
            />
          </div>
          <div className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <h1 className="mb-4 text-xl font-semibold text-black-- font-sans">
                Login
              </h1>
              <form action="" onSubmit={handleSubmit} className="space-y-4">
                <label className="block text-sm space-y-2">
                  <span className="text-gray-700 dark:text-gray-400 ">
                    Email
                  </span>
                  <Input
                    className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                    placeholder="Email"
                    name="email"
                    // label="email"
                    onChange={handleChange}
                    payload={payload.email}
                    type="email"
                    // placeholder={"Enter your password"}
                  />
                </label>
                <label className="block mt-4 text-sm space-y-2">
                  <span className="text-gray-700 dark:text-gray-400">
                    Password
                  </span>
                  <Input
                    className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                    placeholder="***************"
                    name="password"
                    // label="password"
                    onChange={handleChange}
                    payload={payload.password}
                    type="password"
                  />
                </label>
                <div className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline">
                  <Button
                    type={"submit"}
                    title={isLoading ? "PROCESS" : "LOGIN"}
                  />
                </div>
                <button
                  className="font-semibold underline underline-offset-2 text-black ml-44"
                  onClick={() => navigate("/forgotPassword")}
                >
                  forgot Password
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
