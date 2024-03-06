import React from "react";
import Highlighted from "./Highlighted";
import ProgressKnow from "../../../assets/Images/Know_your_progress.png";
import plan_lesson from "../../../assets/Images/Plan_your_lessons.png";
import compare_other from "../../../assets/Images/Compare_with_others.png";
import CTButton from "./Button";

const Learning = () => {
  return (
    <div>
      <div className=" sm:h-[50px]"></div>
      <div className="flex flex-col mx-auto  gap-20 mb-20 items-center">
        <div className=" mx-auto text-center flex flex-col items-center">
          <h1 className=" text-4xl mb-4 ">
            Your swiss knife for <Highlighted text={"learning any language"} />{" "}
          </h1>
          <p className=" text-center text-base w-[70%]">
            Using spin making learning multiple languages easy. with 20+
            languages realistic voice-over, progress tracking, custom schedule
            and more.
          </p>
        </div>

        <div className="flex ">
          <img
            src={ProgressKnow}
            className=" object-contain  -mr-32"
          />
          <img
            src={compare_other}
            className=" object-contain"
          />
          <img
            src={plan_lesson}
            className=" object-contain -ml-44"
          />
        </div>
        <CTButton
          active={true}
          linkto={"/signup"}
        >
          Learn More
        </CTButton>
      </div>
    </div>
  );
};

export default Learning;
