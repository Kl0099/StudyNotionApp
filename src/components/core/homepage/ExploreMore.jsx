import React, { useState } from "react";
import Highlighted from "./Highlighted";
import { HomePageExplore } from "../../../data/homepage-explore";
import CourseCard from "./CourseCard";

const tabNames = [
  "Free",
  "New to coding",
  "Most popular",
  "Skills paths",
  "Career paths",
];

const ExploreMore = () => {
  const [currentTab, setCurrentTab] = useState(tabNames[0]);
  const [courses, setCourse] = useState(HomePageExplore[0].courses);
  const [currentCard, setCurrentCard] = useState(
    HomePageExplore[0].courses[0].heading
  );
  const setMyCard = (value) => {
    setCurrentTab(value);
    const result = HomePageExplore.filter((item) => item.tag === value);
    setCourse(result[0].courses);
    setCurrentCard(result[0].courses[0].heading);
  };
  return (
    <div className="  z-10 -mb-28">
      <div className=" text-pure-greys-5 text-left sm:text-center">
        <h1 className=" text-3xl  sm:text-4xl mb-3 font-semibold">
          Unlock the <Highlighted text={"Power of Code"} />
        </h1>
        <p className=" text-richblack-300 text-base">
          Learn to Build Anything You Can Imagine
        </p>
      </div>
      <div className="sm:h-[40px]"></div>
      <div className=" flex flex-col justify-center items-center gap-5">
        {/* tabs */}
        <div className=" shadow-sm shadow-white flex sm:ml-4 sm:w-fit  items-center justify-center bg-richblack-700 rounded-3xl ">
          {tabNames.map((item, index) => {
            return (
              <div
                className={` text-[14px] sm:text-base ${
                  currentTab === item ? "bg-richblack-900 text-white " : null
                } sm:p-2 rounded-full sm:px-4 text-richblack-300 transition-all duration-200 cursor-pointer hover:scale-90 hover:bg-richblack-900 hover:text-white px-2`}
                key={index}
                onClick={() => setMyCard(item)}
              >
                {item}
              </div>
            );
          })}
        </div>
        <div className=" sm:h-[60px]"></div>
        {/* card  */}
        <div className="  flex gap-4">
          {courses.map((item, index) => {
            return (
              <CourseCard
                key={index}
                heading={item.heading}
                description={item.description}
                level={item.level}
                lessons={item.lessionNumber}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ExploreMore;
