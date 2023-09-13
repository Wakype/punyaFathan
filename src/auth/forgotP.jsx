import React from "react";
import Input from "../component/input";

import Image from "../assets/image/background.png";
import Image2 from "../assets/image/Logo MyKanten.png";
import Button from "../component/button";
import Select from "../component/select";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { authForgot } from "../redux/actions/authAction";
import { forgotPassword } from "../Api/auth";
export default function ForgotPassword() {
  let navigate = useNavigate();

  const [errorEmail, setErrorEmail] = React.useState("");

  let dispatch = useDispatch();
  const [isLoading, setIsLoading] = React.useState(true);
  const [payload, setPayload] = React.useState({
    email: "",
  });

  const [errorMessage, setErrorMessage] = React.useState("");

  const handleChange = (e) => {
    console.log("change jalan");
    setPayload((payload) => {
      return {
        ...payload,
        [e.target.name]: e.target.value,
      };
    });
  };

  let [messageError, setMessageError] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(false);
      const response = await forgotPassword(payload)
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
        return navigate("/reset", { replace: true });
      } else {
        setMessageError(response?.response?.data?.msg);

        setErrorEmail(response?.response?.data?.errors?.email);

        // alert('fail email anda belum terdaftar');
      }
      if (payload.email === "") {
        setErrorEmail("Email wajib diisi");
      }
    } catch (err) {
      alert("error coba cari solusinya");
      console.log(err);
    } finally {
      setIsLoading(true);
    }
    console.log("jalan cuy");
  };

  return (
    
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
              Forgot Password
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
        
                <div className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline">
                  <Button
                    type={"submit"}
                    title={isLoading ? "FORGOT" : "PROCCESS"}
                  />
                </div>
              </form>
              <hr className="my-8" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
