import React from "react";

export default function Select({
  value,
  label,
  opsi1,
  opsi2,
  opsi3,
  isError,
  textError,
  children,
  ...props
}) {
  return (
    <div className="input">
      <label className="label text-black">{/* {label} */}</label>
      <select
        {...props}
        className="input-text border border-black rounded-md w-[430px] h-[40px] text-center text-black"
        id={label}
      >
       {children}
      </select>
      {isError && <p className="error">{textError} </p>}
    </div>
  );
}
