import React, { useState } from "react";
import Inputlabel from "./Inputlabel";
import { Link } from "react-router-dom";
import { signUpType } from "bandirevanthblog";
import axios from "axios";
import { BACKEND_URL } from "../../../config";
import { useNavigate } from "react-router-dom";

const SignupCard = () => {
  const navigate = useNavigate();
  const [SignInputs, setSignInputs] = useState<signUpType>({
    name: "",
    email: "",
    password: "",
  });

  async function signupRequest() {
    try {
      const res = await axios.post(`${BACKEND_URL}/user/signup`, SignInputs);
      const token = res.data.token;
      localStorage.setItem("token", token);
      navigate('/blogs');
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="flex flex-col justify-center align-center items-center mx-auto md:h-screen lg:py-0">
      <div className="w-full  bg-white rounded-lg shadow md:mt-2 sm:max-w-md p-5 m-3 ">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-3xl text-center pb-2">
          Create an account
        </h1>
        <div className="text-lg text-slate-400 font-bold flex space-x-2 justify-center align-center items-center">
          <h4>Already have an Account?</h4>
          <Link to={"/"} className="text-slate-400 text-sm underline">
            Login
          </Link>
        </div>
        <Inputlabel
          type="text"
          label="Username"
          placeholder="username"
          onChange={(e) => {
            setSignInputs({ ...SignInputs, name: e.target.value });
          }}
        />
        <Inputlabel
          type="email"
          label="Email"
          placeholder="Enter your email"
          onChange={(e) => {
            setSignInputs({
              ...SignInputs,
              email: e.target.value,
            });
          }}
        />
        <Inputlabel
          type="password"
          label="Password"
          placeholder="Password"
          onChange={(e) => {
            setSignInputs({
              ...SignInputs,
              password: e.target.value,
            });
          }}
        />
        <div className="flex justify-center align-center items-center">
          <button
            onClick={signupRequest}
            className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded mt-3 "
          >
            Signup
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignupCard;
