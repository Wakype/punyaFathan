import React from "react";
import Input from "../component/input";

import Image from "../assets/image/background.png";
import Image2 from "../assets/image/Logo MyKanten.png";
import Button from "../component/button";

export default function Login() {
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

  const [isLoading, setIsLoading] = React.useState(false);
  return (
    <div>
      <div className="w-screen h-full flex ">
        <form className="">
          <div className="bg-white w-[620px] h-screen space-y-5 p-10 ml-20">
            <img
              src={Image2}
              className="w-[100px] h-[100px] rounded-lg bg-inherit ml-56  "
            />
            <h1 className="text-center font-serif text-xl mt-4">
              Welcome Back
            </h1>
            <Input
              name="email"
              label="email"
              onChange={handleChange}
              type="email"
              placeholder={"Enter your email"}
            />
            <Input
              name="password"
              label="password"
              onChange={handleChange}
              type="password"
              placeholder={"Enter your password"}
            />
            <a
              className="text-black text-[12px] font-sans hover:font-bold ml-[350px] mt-2 "
              href="/forgotPassword"
            >
              Forgot Password
            </a>
            <div className="ml-24 ">
              <Button type={"submit"} title={isLoading ? "PROCESS" : "LOGIN"} />
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
