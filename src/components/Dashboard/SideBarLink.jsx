import { setDrawer } from "../../slices/profile";
import React from "react";
import * as Icons from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, matchPath, useLocation } from "react-router-dom";

const SideBarLink = ({ link, iconName }) => {
  const Icon = Icons[iconName];
  const location = useLocation();
  const dispatch = useDispatch();
  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };
  const { drawer } = useSelector((state) => state.profile);
  return (
    <NavLink
      to={link.path}
      // onClick={() => dispatch(resetCourseState())}
      className={`relative px-8 py-2 text-sm font-medium ${
        matchRoute(link.path)
          ? "bg-yellow-800 text-yellow-50"
          : "bg-opacity-0 text-richblack-300"
      } transition-all duration-200`}
      onClick={
        window.innerWidth < 628 ? () => dispatch(setDrawer(!drawer)) : () => {}
      }
    >
      <span
        className={`absolute left-0 top-0 h-full w-[0.15rem] bg-yellow-50 ${
          matchRoute(link.path) ? "opacity-100" : "opacity-0"
        }`}
      ></span>
      <div className="flex items-center gap-x-2">
        {/* Icon Goes Here */}
        <Icon className="text-lg" />
        <span>{link.name}</span>
      </div>
    </NavLink>
  );
};

export default SideBarLink;
