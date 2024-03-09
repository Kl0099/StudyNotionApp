import React from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import NavbarLinks from "../../data/navbar-links";
import "../../App.css";
const Navbar = () => {
  return (
    <div className=" flex h-14 items-center justify-center border-b-[1px] border-richblack-700">
      <div className=" flex w-11/12 max-w-maxContent justify-between">
        <NavLink to={"/"}>
          <img
            src={logo}
            alt="logo"
            width={160}
            height={42}
            loading="lazy"
          />
        </NavLink>

        <nav>
          <ul className=" mt-1 flex gap-x-6 text-richblack-25">
            {NavbarLinks.map((item, index) => (
              <li>
                <NavLink to={item?.path}>{item.title}</NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className=" flex gap-5">
          <button className="p-2 rounded-lg bg-richblack-800 text-richblack-500">
            <Link>Log in</Link>
          </button>
          <button className=" rounded-lg p-2 bg-richblack-800 text-richblack-500">
            <Link>Sign up</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
