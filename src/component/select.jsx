import React  from "react";

export default function Select({ label,opsi1,opsi2,opsi3,opsi4,opsi5,opsi6, isError, textError, children, ...props }) {
  return ( 
    <div className="input">
      
      <label className="label text-black" >
        {/* {label} */}
      </label>
      <select {...props} className="input-text border border-black rounded-md w-[450px] h-[40px] text-center text-black" id={label} >
        <option selected>{label}</option>
        <option  value={opsi1}>{opsi1}</option>
        <option value={opsi2}>{opsi2}</option>
        <option value={opsi3}>{opsi3}</option>
       </select>
      {isError && <p className="error">{textError} </p>}
    </div>
  );
}
