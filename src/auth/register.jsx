import React from "react";
import Input from "../component/input";

export default function Register()  {
  return (
    <div>
      <div className="w-screen h-full flex">
        <div className="bg-white border-2 border-black w-[800px] h-[600px] space-y-5">
          <h1 className="text-center font-serif text-xl mt-4">Welcome Back</h1>
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
            name={"username"}
            id={"username"}
            type={"name"}
            placeholder="Enter your password"
          />
          <a
            className="text-black text-[12px] font-sans hover:font-bold m-3 w-10 "
            href="/forgotPassword"
          >
            Forgot Password
          </a>
        </div>
        <div className="bg-[#00CC9C] rounded-l-2xl w-[800px] h-[600px] "></div>
      </div>
    </div>
  );
};
