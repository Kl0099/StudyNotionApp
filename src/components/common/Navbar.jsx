import logo from "../../assets/Logo/Logo-Full-Light.png";
import NavbarLinks from "../../data/navbar-links";
import React, { useEffect, useRef, useState } from "react";
import {
  Link,
  NavLink,
  matchPath,
  useLocation,
  useNavigate,
} from "react-router-dom";
import "../../App.css";
import { accountType } from "../../data/constants";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import { apiConnector } from "../../services/apiConnector";
import { categories } from "../../services/apis";
import { setDrawer } from "../../slices/profile";
import { ACCOUNT_TYPE } from "../../utils/constants";
import ProfileDropDown from "../auth/ProfileDropDown";
import Catalog from "./Catalog";
import axios from "axios";
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai";
import { BsChevronDown, BsChevronUp, BsCrosshair } from "react-icons/bs";
import { FiCrosshair } from "react-icons/fi";
import { RxCross1 } from "react-icons/rx";
import { VscAccount, VscHome, VscSignIn } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";

// const subLinks = [
//   {
//     title: "Python",
//     link: "/catalog/python",
//   },
//   {
//     title: "javascript",
//     link: "/catalog/javascript",
//   },
//   {
//     title: "web-development",
//     link: "/catalog/web-development",
//   },
//   {
//     title: "Android Development",
//     link: "/catalog/Android Development",
//   },
// ];

const Navbar = () => {
  const location = useLocation();
  const { token } = useSelector((state) => state.auth);
  const { user, drawer } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const [subLinks, setSubLinks] = useState([]);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const fetchSubLinks = async () => {
    try {
      setLoading(true);
      const result = await apiConnector("GET", categories.CATEGORIES_API);
      // console.log(result);
      setSubLinks(result.data.data);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(`Error fetching : ${error}`);
    }
  };
  const ref = useRef(null);

  useOnClickOutside(ref, () => setOpen(false));

  useEffect(() => {
    // console.log("category url : ", categories.CATEGORIES_API);
    fetchSubLinks();
  }, []);
  useEffect(() => {
    // console.log(subLinks);
    // console.log("toen", token);
    // console.log(" user", user);
  }, [subLinks, token, user]);
  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

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
          <ul className="hidden md:flex mt-1  gap-x-6 text-richblack-25">
            {NavbarLinks.map((item, index) => (
              <li key={index}>
                {item.title === "Catalog" ? (
                  <>
                    <div
                      className={`group relative flex cursor-pointer items-center gap-1 ${
                        matchRoute("/catalog/:catalogName")
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                    >
                      <p>{item.title}</p>
                      <BsChevronDown />
                      <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                        <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
                        {loading ? (
                          <p className="text-center">Loading...</p>
                        ) : subLinks.length > 0 ? (
                          <>
                            {subLinks?.map((subLink, i) => (
                              <Link
                                to={`/catalog/${subLink?.name
                                  .split(" ")
                                  .join("-")
                                  .toLowerCase()}`}
                                className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                                key={i}
                              >
                                <p>{subLink?.name}</p>
                              </Link>
                            ))}
                          </>
                        ) : (
                          <p className="text-center">No Courses Found</p>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <NavLink to={item?.path}>{item.title}</NavLink>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Login / Signup / Dashboard */}
        <div className="hidden  items-center gap-x-4 md:flex">
          {user && user?.accountType !== accountType.Instructor && (
            <Link
              to="/dashboard/cart"
              className="relative"
            >
              <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
              {totalItems > 0 && (
                <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                  {totalItems}
                </span>
              )}
            </Link>
          )}
          {token === null && (
            <Link to="/login">
              <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 p-1 sm:px-[12px] sm:py-[8px] text-richblack-100 hover:scale-95">
                Log in
              </button>
            </Link>
          )}
          {token === null && (
            <Link to="/signup">
              <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 p-1 sm:px-[12px] sm:py-[8px] text-richblack-100 hover:scale-95">
                Sign up
              </button>
            </Link>
          )}
          {token !== null && (
            <ProfileDropDown
              NavbarLinks={NavbarLinks}
              matchRoute={matchRoute}
              subLinks={subLinks}
              loading={loading}
            />
          )}
        </div>
        {window.innerWidth < 628 && token === null && (
          <div>
            <AiOutlineMenu
              fontSize={24}
              onClick={() => {
                setOpen(!open);
                console.log("hii");
              }}
            />
            {open && (
              <div>
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="absolute top-[4%] right-10 z-[1000] divide-y-[1px] divide-richblack-700 overflow-hidden rounded-md border-[1px] border-richblack-700 bg-richblack-800 h-fit "
                  ref={ref}
                >
                  {/* home  */}
                  <Link
                    to="/"
                    onClick={() => setOpen(false)}
                  >
                    <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25">
                      Home
                    </div>
                  </Link>

                  {/* signup  */}
                  <div
                    onClick={() => {
                      navigate("/signup");
                      setOpen(false);
                    }}
                    className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25"
                  >
                    sign up
                  </div>

                  {/* login  */}

                  <div
                    onClick={() => {
                      navigate("/login");
                      setOpen(false);
                    }}
                    className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25"
                  >
                    Log in
                  </div>
                  {/* aboutUs  */}
                  <div
                    onClick={() => {
                      navigate("/aboutus");
                      setOpen(false);
                    }}
                    className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25"
                  >
                    about us
                  </div>
                  {/* contactus  */}
                  <div
                    onClick={() => {
                      navigate("/contactus");
                      setOpen(false);
                    }}
                    className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25"
                  >
                    Contact us
                  </div>
                  {/* catelog  */}
                  <div
                    onClick={() => {
                      setVisible(!visible);
                    }}
                    className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25"
                  >
                    <p className="flex gap-3 items-center">
                      {"Catelog"}
                      <span>
                        {visible ? <BsChevronUp /> : <BsChevronDown />}
                      </span>
                    </p>
                  </div>
                  {/* catelog data  */}
                  {visible &&
                    subLinks?.map((links, index) => (
                      <div
                        key={index}
                        onClick={() => {
                          navigate(
                            `/catalog/${links?.name
                              .split(" ")
                              .join("-")
                              .toLowerCase()}`
                          );
                          setOpen(false);
                        }}
                        className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25"
                      >
                        {links.name}
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* this is for deails  */}
          </div>
        )}
        {token && (
          <button
            onClick={() => {
              dispatch(setDrawer(!drawer));
              // console.log("hellow : ", drawer);
              console.log("innerwidth :", window.innerWidth);
            }}
            className="mr-4 md:hidden"
          >
            {drawer ? (
              <RxCross1
                fontSize={24}
                fill="#AFB2BF"
              />
            ) : (
              <AiOutlineMenu
                fontSize={24}
                fill="#AFB2BF"
              />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
