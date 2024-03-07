import React from "react";

const CourseCard = ({ heading, description, level, lessons }) => {
  return (
    <div className=" bg-richblack-700  flex text-base w-[300px] h-[260px] p-4 flex-col items-start justify-between ">
      <div className=" flex flex-col gap-2">
        <h1 className=" text-xl font-semibold">{heading}</h1>
        <p className=" text-richblack-200 text-sm">{description}</p>
      </div>
      <div className=" border-t-2 border-dashed pt-2  w-full flex justify-between items-center">
        <p>{level}</p>
        <p>{lessons} Lessons</p>
      </div>
    </div>
  );
};

export default CourseCard;
