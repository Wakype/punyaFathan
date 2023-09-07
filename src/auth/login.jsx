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
  let navigate = useNavigate();
  const [errorName, setErrorName] = React.useState("");
  const [errorEmail, setErrorEmail] = React.useState("");
  const [errorPassword, setErrorPassword] = React.useState("");
  const [errorMessage, setMessageError] = React.useState("");

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
        setMessageError(response?.response?.data?.msg);
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
    } finally {
    }
    console.log("jalan cuy");
  };

  const [isLoading, setIsLoading] = React.useState(false);
  return (
    <div>
      <div className="w-screen h-full flex ">
        <form className="" onSubmit={handleSubmit}>
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
                type="email"
                placeholder={"Enter your email"}
              />
              <p className="flex ">{errorPassword}</p>
              <Input
                name="password"
                label="password"
                onChange={handleChange}
                type="password"
                placeholder={"Enter your password"}
              />
              <a
                className="text-black text-[12px] font-sans hover:font-bold ml-[350px] mt-4"
                href="/forgotPassword"
              >
                Forgot Password
              </a>
              <div className="ml-16 mt-10 ">
                <Button
                  type={"submit"}
                  title={isLoading ? "PROCESS" : "LOGIN"}
                />
              </div>
            </div>
          </div>
        </form>
        <div className="">
          <img src={Image} className="w-[900px] h-screen rounded-lg " />
        </div>
      </div>
    </div>
  );
}
