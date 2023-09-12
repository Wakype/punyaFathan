import React from "react";

export default function Input({ label, isError, textError, ...props }) {
  return (
    <div className="input grid">
      <label className="label" htmlFor={label}>
        {label}
      </label>
      <input
        {...props}
        className="w-[422px] h-[40px] p-2 px-3 bg-transparent border-2 border-[#000000] outline-none  text-black rounded-lg "
        id={label}
      />

      {isError && <p className="error">{textError}</p>}
    </div>
  );
}
