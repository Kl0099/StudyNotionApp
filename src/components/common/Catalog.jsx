import React, { useState } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { Link, NavLink } from "react-router-dom";

const Catalog = ({ NavbarLinks, matchRoute, subLinks, loading }) => {
  const [visible, setVisible] = useState(false);
  return (
    <nav className="  flex flex-col">
      {/* flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25 */}
      <ul className=" items-start w-full   mt-1 flex-col flex gap-y-0  text-richblack-25">
        {NavbarLinks.map((item, index) => (
          <li
            key={index}
            className="w-full"
          >
            {item.title === "Catalog" ? (
              <div className=" flex w-full items-start  border-b-2 border-b-richblack-700  py-[10px] px-[12px]  text-richblack-100 ">
                <div
                  className={`group relative flex cursor-pointer items-center gap-1 flex-col ${
                    matchRoute("/catalog/:catalogName")
                      ? "text-yellow-25"
                      : "text-richblack-25"
                  }`}
                  onClick={() => setVisible(!visible)}
                >
                  <p className="flex gap-3 items-center">
                    {item.title}{" "}
                    <span>{visible ? <BsChevronUp /> : <BsChevronDown />}</span>
                  </p>

                  <div className={`${visible ? "block" : "hidden"} `}>
                    <div className=""></div>
                    {loading ? (
                      <p className="text-center">Loading...</p>
                    ) : subLinks.length > 0 ? (
                      <div className=" flex flex-col">
                        {subLinks?.map((subLink, i) => (
                          <Link
                            to={`/catalog/${subLink?.name
                              .split(" ")
                              .join("-")
                              .toLowerCase()}`}
                            className=" text-xs flex w-full items-start border-b-2 border-b-richblack-700 py-[10px]   text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25 px-[12px]"
                            key={i}
                          >
                            <p>{subLink?.name}</p>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <p className="text-center">No Courses Found</p>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className=" mx-auto w-full ">
                <NavLink
                  className={
                    "flex w-full items-start border-b-2 border-b-richblack-700 py-[10px]   text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25 px-[12px]"
                  }
                  to={item?.path}
                >
                  {item.title}
                </NavLink>
              </div>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Catalog;
