

import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";


function Input({ value, onChange, label, placeholder, type }) {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <label className="text-[15px] text-Slate-800">{label}</label>
      <div className=" text-gray-700 text-sm font-bold mb-2 flex items-center px-3 py-2 border border-gray-300 rounded-md bg-gray-50">
        <input
          type={
            type === "password"
              ? showPassword
                ? "text" : "password"
              : type
          }
          placeholder={placeholder}
          className="w-full bg-transparent outline-none"
          value={value}
          onChange={(e) => onChange(e)}
        />

        {type === "password" && (
          <>
            {showPassword ? (
              <FaRegEye
                size={22}
                className="text-primary cursor-pointer"
                onClick={toggleShowPassword}
              />
            ) : (
              <FaRegEyeSlash
                size={22}
                className="text-slate-400 cursor-pointer"
                onClick={toggleShowPassword}
              />
            )}
          </>
        )}
      </div>
    </div>

  );
}

export default Input






















// import React, { useState } from 'react';
// import{FaRegEye, FaRegEyeSlash} from "react-icons/fa6";

// function Input({value,onchange,label,placeholder,type}) {
//     const [showPassword, setPassword]=useState(false);

//     const toggleShowPassword =()=>{
//         setShowPassword(!showPassword);
//     };
//     return (
//         <div >
//             <label className="text-[13px] text-Slate-800">{label}</label>
//             <div className="input-box">
//                 <input
//                  type={
//                     type="password" ?(showPassword ? "text":"Password"):type
//                  }
//                  placeholder={placeholder}
//                  className="w-full bg-transparent outline-none"
//                  value={value}
//                  onChange={(e)=> onChange(e)}
//                  />
//                  {type==="password"&&(
//                     <>
//                     {showPassword ?(
//                         <FaRegEye
//                         size={22}
//                         className="text-primary cursor-pointer"
//                         onlClick={()=>toggleShowPassword()}
//                         />
//                      ):(
//                         <FaRegEyeSlash
//                         size={22}
//                         className="text-slate-400 cursor-pointer"
//                         onlClick={()=>toggleShowPassword()}
//                         />
//                      )}
//                     </>
//                  )}
//             </div>
//         </div>
//     )
// }

// export default Input

