import React from "react";
import { HiUsers } from "react-icons/hi";
import { ImTree } from "react-icons/im";

const CourseCard = ({
  heading,
  description,
  level,
  lessons,
  setCurrentCard,
  currentCard,
}) => {
  return (
    <div
      className={` hover:scale-95 cursor-pointer bg-richblack-700  flex text-base w-[300px] h-[260px] p-4 flex-col items-start justify-between ${
        currentCard === heading
          ? "bg-white shadow-[12px_12px_0_0] text-richblack-900 shadow-yellow-50"
          : "bg-richblack-800"
      }`}
      onClick={() => setCurrentCard(heading)}
    >
      <div className=" flex flex-col gap-2">
        <h1 className=" text-xl font-semibold">{heading}</h1>
        <p className=" text-richblack-200 text-sm">{description}</p>
      </div>
      <div className=" text-richblack-500 border-t-2 border-dashed pt-2  w-full flex justify-between items-center">
        <p
          className={` ${
            currentCard === heading ? " text-richblue-600" : null
          } flex gap-2 items-center`}
        >
          <HiUsers />
          {level}
        </p>
        <p
          className={` ${
            currentCard === heading ? " text-richblue-300" : null
          } flex gap-2 items-center`}
        >
          <ImTree /> {lessons} Lessons
        </p>
      </div>
    </div>
  );
};

export default CourseCard;
