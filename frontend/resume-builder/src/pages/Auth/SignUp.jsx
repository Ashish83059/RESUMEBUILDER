import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Input from '../../component/inputs/input';
import { validEmail } from '../../utils/helper';
import ProfilePhotoSelector from '../../component/inputs/ProfilePhotoSelector';
import { UserContext } from '../../context/userContext';

const SignUp = ({ setCurrentPage }) => {
  const [profilPic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);


  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  //Handle signUp Form submit

  const handleSignUp = async (e) => {
    e.preventDefault();

    let profileImageUrl = "";

    if (!fullName) {
      setError("please enter full name")
      return;

    }

    if (!validEmail(email)) {
      setError("please enter a valid email address");
      return;
    }

    if (!password) {
      setError("please enter password");
      return;
    }

    setError("")

    //SignUp API Call
  
    try {
      //Upload image if present
      if (profilPic) {
        const imgUploadRes = await uploadImage(profilPic);
        profileImageUrl = imgUploadRes.imageUrl || "";
      }


      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name: fullName,
        email,
        password,
        profileImageUrl,
      });
      const { token } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      };
    }
  };
  return (
    <div className="w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center">
      <h3 className="text-lg font-semibold text-black">Create an Account</h3>
      <p className="text-xs text-slate-700 mt-[5px] mb-6">
        Join us today by entering your details below.
      </p>

      <form onSubmit={handleSignUp}>

        <ProfilePhotoSelector image={profilPic} setImage={setProfilePic} />

        <div className="grid grid-cols-1 md:grid-cols-1 gap-3 ">
          <Input
            value={fullName}
            onChange={({ target }) => setFullName(target.value)}
            label="Fullname"
            placeholder="john"
            type="text"
          />

          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Address"
            placeholder="john@example.com"
            type="text"

          />

          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="password"
            placeholder="min 8 Charcters"
            type="password"
          />
        </div>

        {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

        <button type="submit" className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-50 rounded">SIGN UP</button>

        <p className="text-[13px] text-slate-800 mt-3">Already have account?{""}

          <button
            className="text-medium text-primary underline cursor-pointer"
            onClick={() => {
              setCurrentPage("login")
            }}
          >
            Login
          </button>
        </p>
      </form>
    </div>
  )
}

export default SignUp