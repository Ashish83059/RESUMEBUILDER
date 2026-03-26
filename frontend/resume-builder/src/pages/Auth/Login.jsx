import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Input from '../../component/inputs/input';
import { validEmail } from '../../utils/helper';
import { UserContext } from '../../context/userContext';
import { useContext } from 'react';


const Login = ({ setCurrentPage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const {updateUser}=useContext(UserContext);
  const navigation = useNavigate();

  //Handle login form submit
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validEmail(email)) {
      setError("please enter a valid email address");
      return;
    }

    if (!password) {
      setError("please enter password");
      return;
    }

    setError("")

    //Login API Call
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
      email,
      password,
      });

      const { token } = response.data;
      
      if (token){
      localStorage.setItem("token", token);
      updateUser(response.data) ;
      navigate("/dashboard");
       }
      } catch (error) {
        if (error.response && error.response.data.message) {
        setError(error.response.data.message) ;
        } else{
        setError("Something went wrong. Please try again.");
      }
    }
    };
  return (
    <div className="w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center">
      <h3 className="text-lg font-semibold text-black">Welcome Back</h3>
      <p className="text-xs text-slate-700 mt-1.25 mb-6">please enter your details to login</p>

      <form onSubmit={handleLogin}>
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="Email Address"
          placeholder="john@example.com"
          type="text"
        />

        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="password"
          placeholder="min 8 Charcters"
          type="password"
        />


        {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

        {/* class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded" */}

        <button type="submit" className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-50 rounded">LOGIN</button>
        <p className="text-[13px] text-slate-800 mt-3">Don't have account?{""}
          <button
            className="text-medium text-primary underline cursor-pointer"
            onClick={() => {
              setCurrentPage("signup")
            }}
          >
            SignUP
          </button>
        </p>
      </form>
    </div>
  )
}

export default Login

