import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginFailure, loginStart, loginSuccess } from "../redux/userSlice";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";

const SignIn = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [createAccount, setCreateAccount] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await axios.post("/auth/signin", { email, password });
      dispatch(loginSuccess(res.data));
      navigate("/");
    } catch (err) {
      dispatch(loginFailure());
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await axios.post("/auth/signup", { name, email, password });
      console.log("signup success");
      res.status === 200 && setSuccess(true);
    } catch (err) {
      dispatch(loginFailure());
    }
  };

  const signInWithGoogle = async () => {
    dispatch(loginStart());
    signInWithPopup(auth, provider)
      .then((result) => {
        axios
          .post("/auth/google", {
            name: result.user.displayName,
            email: result.user.email,
          })
          .then((res) => {
            console.log(res);
            dispatch(loginSuccess(res.data));
            navigate("/");
          });
      })
      .catch((error) => {
        dispatch(loginFailure());
      });
  };

  return (
    <div className="relative pt-60px pl-72px w-full h-full min-h-screen flex gap-y-10 gap-x-7 overflow-auto justify-center items-center">
      {!createAccount ? (
        <div className="w-1/3 flex flex-col gap-5 justify-center">
          <h1 className="text-3xl font-bold w-fit left-0 right-0 mx-auto">
            Sign In
          </h1>
          <div className="flex flex-col gap-3">
            <input
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
              className=" border-[2px] rounded-md h-10"
            />
            <input
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
              className="border-[2px] rounded-md h-10"
            />
            <button
              onClick={handleLogin}
              className="rounded-sm mt-5 w-20 p-1 text-white text-sm  cursor-pointer left-0 right-0 mx-auto bg-blue-600 hover:bg-blue-400"
            >
              Sign In
            </button>
          </div>
          <h1 className="font-light w-fit left-0 right-0 mx-auto">or</h1>
          <button
            onClick={signInWithGoogle}
            className="rounded-lg cursor-pointer border-[1px] hover:bg-slate-50 border-black flex items-center justify-center h-10 w-2/3 left-0 right-0 mx-auto"
          >
            <FcGoogle className="text-3xl mr-6" />
            Signin with Google
          </button>
          <div className="flex space-x-3">
            <h2>Don't have an account?</h2>
            <button
              onClick={() => setCreateAccount(true)}
              className=" text-blue-500 hover:underline"
            >
              Create a new account
            </button>
          </div>
        </div>
      ) : (
        <div className="w-1/3 flex flex-col gap-5 justify-center">
          <h1 className="text-3xl font-bold w-fit left-0 right-0 mx-auto">
            New Account
          </h1>
          <input
            placeholder="username"
            onChange={(e) => setName(e.target.value)}
            className="border-[2px] rounded-md h-10"
          />
          <input
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
            className="border-[2px] rounded-md h-10"
          />
          <input
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            className="border-[2px] rounded-md h-10"
          />
          <button
            onClick={handleSignup}
            className="rounded-sm mt-5 w-20 p-1 text-white text-sm  cursor-pointer left-0 right-0 mx-auto bg-blue-600 hover:bg-blue-400"
          >
            Sign up
          </button>
          {success && (
            <div className="flex text-green-500">
              <CheckCircleOutlineOutlinedIcon />
              <p>Your account has been successfully created!</p>
            </div>
          )}
          <div className="flex space-x-3">
            <h2>Already have an account?</h2>
            <button
              onClick={() => setCreateAccount(false)}
              className=" text-blue-500 hover:underline"
            >
              Sign in
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default SignIn;
