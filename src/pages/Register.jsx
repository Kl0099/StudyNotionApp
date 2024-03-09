import React, { useState } from "react";
import CTAButton from "../components/core/homepage/Button";
import { FaRegEye as OpenEye } from "react-icons/fa";
import { FaRegEyeSlash as CloseEye } from "react-icons/fa";
import Highlighted from "../components/core/homepage/Highlighted";
const Register = () => {
  const accounts = ["Student", "Instructors"];
  const [email, setEmail] = useState("");
  const [fistname, setfistname] = useState("");
  const [lastname, setlastname] = useState("");

  const [password, setPassword] = useState("");
  const [number, setNumber] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [visiblepassword, setVisiblePassword] = useState(false);
  const [confirmvisiblepassword, setConfirmVisiblePassword] = useState(false);
  const [accountType, setAccountType] = useState("Student");
  const handlePasswordChange = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
    // setVisiblePassword(e.target.value);
  };
  const handleconfirmPasswordChange = (e) => {
    e.preventDefault();
    setConfirmPassword(e.target.value);
  };
  return (
    <div className=" flex flex-col items-center justify-center mt-6  ">
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
          <form className="  w-full ">
            <div className="flex gap-2 justify-between mb-4 mt-4">
              <div className="flex flex-col items-start gap-2">
                <label
                  htmlFor="Name"
                  id="firstname"
                  className="  text-[12px]"
                >
                  First Name <sup className=" text-pink-100">*</sup>
                </label>
                <input
                  type="text"
                  name="fistname"
                  id="email"
                  placeholder="Enter first name"
                  className=" bg-richblack-800 p-2 rounded-md w-full"
                  onChange={(e) => setfistname(e.target.value)}
                />
              </div>

              <div className="flex flex-col items-start gap-2">
                <label
                  htmlFor="Name"
                  id="lastname"
                  className="  text-[12px]"
                >
                  Last Name <sup className=" text-pink-100">*</sup>
                </label>
                <input
                  type="text"
                  name="lastname"
                  id="lastname"
                  placeholder="Enter last name"
                  className=" bg-richblack-800 p-2 rounded-md w-full"
                  onChange={(e) => setlastname(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col items-start gap-2">
              <label
                htmlFor="email"
                id="email"
                className="  text-[12px]"
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
            <div className=" my-4 flex flex-col items-start gap-2">
              <label
                htmlFor="number"
                id="number"
                className="  text-[12px]"
              >
                Phone Number <sup className=" text-pink-100">*</sup>
              </label>
              <input
                type="text"
                name="number"
                id="number"
                placeholder="Enter phone number"
                className=" bg-richblack-800 p-2 rounded-md w-full"
                onChange={(e) => setNumber(e.target.value)}
              />
            </div>
            <div className=" flex flex-col md:flex-row  justify-between">
              <div className="relative flex flex-col items-start mt-5 gap-2">
                <label
                  htmlFor="password"
                  id="password"
                  className="  text-[12px] "
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
              <div className="relative flex flex-col items-start mt-5 gap-2">
                <label
                  htmlFor="confirmpassword"
                  id="confirmpassword"
                  className="  text-[12px] "
                >
                  Confirm password <sup className=" text-pink-100">*</sup>
                </label>
                <div className=" w-full">
                  <input
                    type={confirmvisiblepassword ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="Enter Password"
                    className=" bg-richblack-800 p-2 rounded-md w-full"
                    value={confirmpassword}
                    onChange={handleconfirmPasswordChange}
                  ></input>
                  <div
                    className=""
                    onClick={() =>
                      setConfirmVisiblePassword(!confirmvisiblepassword)
                    }
                  >
                    {confirmvisiblepassword ? (
                      <CloseEye className=" right-2 -mt-[2rem] text-2xl absolute text-richblack-300" />
                    ) : (
                      <OpenEye className=" right-2 -mt-[2rem] text-2xl absolute text-richblack-300" />
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className=" w-full mt-8">
              <CTAButton active={true}>Create Account</CTAButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
