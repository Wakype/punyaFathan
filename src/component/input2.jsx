import React from "react";

export default function Input2({ label, isError, textError, ...props }) {
  return (
    <div className="input grid">
      <label className="label" htmlFor={label}>
        {label}
      </label>
      <input
        {...props}
        className="w-[240px] h-[50px] p-2 px-3 bg-transparent border-2 border-[#000000] outline-none  text-black rounded-lg "
        id={label}
      />

      {isError && <p className="error">{textError}</p>}
    </div>
  );
}
