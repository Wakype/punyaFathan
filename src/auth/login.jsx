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
<<<<<<< HEAD
    console.log("tes");
=======
    console.log("tes")
>>>>>>> 6b2f4860512c0a41507f0ab6ef6fdc3e343d2130
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
<<<<<<< HEAD
    }
=======
    } 
>>>>>>> 6b2f4860512c0a41507f0ab6ef6fdc3e343d2130
  };

  const [isLoading, setIsLoading] = React.useState(false);
  return (
<<<<<<< HEAD
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
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
              <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                Login
              </h1>
              <form action="" onSubmit={handleSubmit}>
                <label className="block text-sm">
                  <span className="text-gray-700 dark:text-gray-400">
                    Email
                  </span>
                  <input
                    className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                    placeholder="Email"
                    name="email"
                    label="email"
                    onChange={handleChange}
                    payload={payload.email}
                    type="email"
                    // placeholder={"Enter your password"}
                  />
                </label>
                <label className="block mt-4 text-sm">
                  <span className="text-gray-700 dark:text-gray-400">
                    Password
                  </span>
                  <input
                    className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                    placeholder="***************"
                    name="password"
                    label="password"
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
                  onClick={() => 
                    navigate("/forgotPassword")
                  }
                >
                  forgot Password
                </button>
              </form>
              <hr className="my-8" />
=======
    <div>
      <div className="w-screen h-full flex ">
        <form onSubmit={handleSubmit}>
          <div className="bg-white w-[620px] h-screen p-10 ml-20">
            <div className="ml-10  space-y-2">
              <img
                src={Image2}
                className="w-[100px] h-[100px] rounded-lg bg-inherit ml-52  "
              />
              <h1 className="text-center font-sans text-xl mt-4">
                Welcome Back
              </h1>
              <p className="">{errorEmail}</p>
              <Input 
                name="email"
                label="email"
                onChange={handleChange}
                payload={payload.email}
                type="email"
                placeholder={"Enter your email"}
              />
              <p className="flex ">{errorPassword}</p>
              <Input
                name="password"
                label="password"
                onChange={handleChange}
                payload={payload.password}
                type="password"
                placeholder={"Enter your password"}
              />
              <button className="font-semibold underline underline-offset-2 text-blue-500" onClick={() => {
                return navigate("/forgotPassword")
            }}>
            
            </button>
              <div className="ml-16 mt-10 ">
                <Button
                  type={"submit"}
                 
                  title={isLoading ? "PROCESS" : "LOGIN"}
                />
              </div>
>>>>>>> 6b2f4860512c0a41507f0ab6ef6fdc3e343d2130
            </div>
            <div className="w-full flex items-center justify-center p-9">
          <p className="text-sm font-normal text-black">
            Dont have'an Account?
            <button className="font-semibold underline underline-offset-2 text-blue-500" onClick={() => {
                return navigate("/register")
            }}>
              Sign up or free
            </button>
          </p>
        </div>
          </div>
<<<<<<< HEAD
=======
          
        </form>
        <div className="">
          <img
            src={Image}
            className="w-[900px] h-screen rounded-lg bg-inherit"
          />
>>>>>>> 6b2f4860512c0a41507f0ab6ef6fdc3e343d2130
        </div>
      </div>
     
    </div>
  );
}
