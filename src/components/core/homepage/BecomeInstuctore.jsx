import React from "react";
import Instructore from "../../../assets/Images/Instructor.png";
import CTAButton from "./Button";

import { FaArrowRightLong } from "react-icons/fa6";
import Highlighted from "./Highlighted";
const BecomeInstuctore = () => {
  return (
    <div className=" h-fit sm:h-[90vh] flex flex-col items-center justify-center">
      <div className="flex flex-col-reverse sm:flex-row items-center justify-center">
        <div className=" m-5 w-full sm:w-[40%] shadow-2xl mr-5 border">
          <img
            src={Instructore}
            className=" object-contain shadow-white shadow-lg  "
          />
        </div>
        <div className="flex flex-col ml-4 w-full sm:w-[40%]  gap-5">
          <h1 className=" text-3xl sm:text-4xl ">
            Become an <Highlighted text={"Instructore"} />
          </h1>
          <p className="mt-4 text-sm sm:text-base text-richblack-400 sm:w-[70%]">
            Instructors from around the world teach millions of students on
            StudyNotion. We provide the tools and skills to teach what you love.
          </p>
          <div className="w-fit mt-5">
            <CTAButton
              active={true}
              linkto={"/signup"}
            >
              <div className="flex gap-2 items-center">
                Start Teaching Today
                <FaArrowRightLong />
              </div>
            </CTAButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BecomeInstuctore;
