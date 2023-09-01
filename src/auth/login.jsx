import React from "react";
import Input from "../component/input";

import Image from "../assets/image/background.png";
import Image2 from "../assets/image/Logo MyKanten.png";
import Button from "../component/button";

export default function Login() {
  const [isLoading, setIsLoading] = React.useState(false);
  return (
    <div>
      <div className="w-screen h-full flex ">
        <form className="">
          <div className="bg-white w-[700px] h-screen space-y-5 p-10">
            <img
              src={Image2}
              className="w-[100px] h-[100px] rounded-lg bg-inherit ml-60"
            />
            <h1 className="text-center font-serif text-xl mt-4">
              Welcome Back
            </h1>
            <Input
              onChange=""
              value=""
              name={"username"}
              id={"username"}
              type={"name"}
              placeholder="Enter your email"
            />
            <Input
              onChange=""
              value=""
              name={""}
              id={""}
              type={"password"}
              placeholder="Enter your password"
            />
            <a
              className="text-black text-[12px] font-sans hover:font-bold ml-[350px] mt-2 "
              href="/forgotPassword"
            >
              Forgot Password
            </a>
          </div>
          <Button type={"submit"} title={isLoading ? "PROCESS" : "LOGIN"} />
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
