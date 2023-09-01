import React from "react";

export default function Button({ title, type, ...props }) {
  return (
    <React.Fragment>
      <button
        {...props}
        type={type}
        className="w-[290px] p-2 px-10 bg-black border outline-none  text-white font-serif mt-2"
      >
        {title}
      </button>
    </React.Fragment>
  );
}
