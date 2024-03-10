import CTAButton from "../components/core/homepage/Button";
import Highlighted from "../components/core/homepage/Highlighted";
import { login } from "../services/operations/authapi";
import React, { useState } from "react";
import { FaRegEye as OpenEye } from "react-icons/fa";
import { FaRegEyeSlash as CloseEye } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accounts = ["Student", "Instructors"];
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visiblepassword, setVisiblePassword] = useState(false);
  const [accountType, setAccountType] = useState("Student");
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    // setVisiblePassword(e.target.value);
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password, navigate));
  };
  return (
    <div className=" flex flex-col items-center justify-center h-[90vh] ">
      <div className="shadow-richblack-500  shadow-sm   flex  flex-col gap-8 text-white p-4 sm:w-[60%] lg:w-[30%]  md:w-[40%] ">
        <div className="flex flex-col">
          <h1 className=" text-3xl mb-3">Welcome Back</h1>
          <p className=" text-sm text-richblack-500">Discover your passion</p>
          <p className=" text-xs font-edu-sa">
            <Highlighted text={" Be unstoppable"} />
          </p>
        </div>
        <div className=" ml-1  flex gap-3 bg-richblue-800 w-fit rounded-full shadow-richblack-500  shadow-sm">
          {accounts.map((item, index) => (
            <div
              key={index}
              className={`${
                accountType === item
                  ? " bg-richblack-900 text-richblack-5"
                  : " text-richblack-200"
              } px-3 py-1 rounded-full cursor-pointer hover:scale-95 `}
              onClick={() => setAccountType(item)}
            >
              {item}
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center">
          <form
            className="  w-full "
            onSubmit={handleFormSubmit}
          >
            <div className="flex flex-col items-start gap-2">
              <label
                htmlFor="email"
                id="email"
                className=" text-[12px]"
              >
                Email Address <sup className=" text-pink-100">*</sup>
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter email address"
                className=" bg-richblack-800 p-2 rounded-md w-full"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="relative flex flex-col items-start mt-5 gap-2">
              <label
                htmlFor="password"
                id="password"
                className=" text-[12px] "
              >
                Password <sup className=" text-pink-100">*</sup>
              </label>
              <div className=" w-full">
                <input
                  type={visiblepassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="Enter Password"
                  className=" bg-richblack-800 p-2 rounded-md w-full"
                  value={password}
                  onChange={handlePasswordChange}
                ></input>
                <div
                  className=""
                  onClick={() => setVisiblePassword(!visiblepassword)}
                >
                  {visiblepassword ? (
                    <CloseEye className=" right-2 -mt-[2rem] text-2xl absolute text-richblack-300" />
                  ) : (
                    <OpenEye className=" right-2 -mt-[2rem] text-2xl absolute text-richblack-300" />
                  )}
                </div>
              </div>
            </div>
            <p
              onClick={() => navigate("/forgot-password")}
              className=" cursor-pointer  text-right text-sm text-richblue-300 mt-2"
            >
              forgot password
            </p>
            <button
              type="submit"
              className=" hover:scale-95 w-full mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
