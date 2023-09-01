import React from "react";
import Input from "../component/input";

import Image from "../assets/image/background.png";
import Image2 from "../assets/image/Logo MyKanten.png";
import Button from "../component/button";
import Select from "../component/select";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
export default function Register() {
  let navigate = useNavigate();
  const [errorName, setErrorName] = React.useState('');
  const [errorEmail, setErrorEmail] = React.useState('');
  const [errorPassword, setErrorPassword] = React.useState('');
  const [errorResetPassword, setErrorResetPassword] = React.useState('');
  let dispatch = useDispatch();
  const [isLoading, setIsLoading] = React.useState(true);
  const [payload, setPayload] = React.useState({
    username: '',
    email: '',
    password: '',
    role: '',
  });

  const [errorMessage, setErrorMessage] = React.useState('');

  const handleChange = (e) => {
    console.log('change jalan');
    setPayload((payload) => {
      return {
        ...payload,
        [e.target.name]: e.target.value,
      };
    });
  };

  let [messageError, setMessageError] = React.useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(false);
      const response = await dispatch(Register(payload));
      console.log('response', response);
      if (response?.status === 'Success') {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: 'success',
          title: response?.msg,
        });
        return navigate('/login', { replace: true });
      } else {
        setMessageError(response?.response?.data?.msg);
        setErrorName(response?.response?.data?.errors?.name);
        setErrorEmail(response?.response?.data?.errors?.email);
        setErrorPassword(response?.response?.data?.errors?.password);
        setErrorResetPassword(
          response?.response?.data?.errors?.password_confirmation
        );

        // alert('fail email anda belum terdaftar');
      }
      if (payload.password === '') {
        setErrorPassword('Password wajib diisi');
      } else if (payload.password.length < 8) {
        setErrorEmail('Password harus 8 karakter');
      }
      if (payload.email === '') {
        setErrorEmail('Email wajib diisi');
      }
    } catch (err) {
      
      alert('fail email anda belum terdaftar');
      console.log(err);
    } finally {
      setIsLoading(true);
    }
    console.log('jalan cuy');
  };
 
  return (
    <div>
      <div className="w-screen h-full flex ">
        <form className="" onSubmit={handleSubmit}>
          <div className="bg-white w-[620px] h-screen space-y-5 p-10 ml-20">
            <img
              src={Image2}
              className="w-[100px] h-[100px] rounded-lg bg-inherit ml-56  "
            />
            <h1 className="text-center font-serif text-xl mt-4">
              Welcome Back
            </h1>
            <Input
              name="username"
              label='username'
              onChange={handleChange}
              type="name"
              placeholder={"Enter your username"}
            />
            <Input
             name="email"
             label='email'
             onChange={handleChange}
             type="email"
              placeholder={"Enter your email"}
            />
            <Input
             name="password"
             label='password'
             onChange={handleChange}
             type="password"
              placeholder={"Enter your password"}
            />
            <Select
                
                name="Pilih role"
                // value={payload.jenisKelamin}
                // onChange={handleChange}
                label={'Role'}
                opsi1={'Administrator'}
                opsi2="Petugas"
              />
            <a
              className="text-black text-[12px] font-sans hover:font-bold ml-[350px] mt-2 "
              href="/forgotPassword"
            >
              Forgot Password
            </a>
            
            <div className="ml-24 ">
              <Button type={"submit"} title={isLoading ? "PROCESS" : "Register"} />
            </div>
          </div>
        </form>
        <div className="">
          <img
            src={Image}
            className="w-[900px] h-screen rounded-lg bg-inherit"
          />
        </div>
      </div>
    </div>
  );
}
