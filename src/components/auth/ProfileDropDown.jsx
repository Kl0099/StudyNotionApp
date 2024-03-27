import useOnClickOutside from "../../hooks/useOnClickOutside";
import { logout } from "../../services/operations/authapi";
import { ACCOUNT_TYPE } from "../../utils/constants";
import Catalog from "../common/Catalog";
import { useRef, useState } from "react";
import { AiOutlineCaretDown } from "react-icons/ai";
import { VscDashboard, VscSignOut } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const ProfileDropDown = ({
  NavbarLinks = null,

  matchRoute = null,
  subLinks = null,
  loading = null,
}) => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useOnClickOutside(ref, () => setOpen(false));

  if (!user) return null;
  return (
    <button
      className="relative"
      onClick={() => setOpen(true)}
    >
      <div className="flex items-center gap-x-1">
        <img
          src={user?.image?.url || user?.image}
          alt={`profile-${user?.firstName}`}
          className="aspect-square w-[30px] rounded-full object-cover"
        />
        <AiOutlineCaretDown className="text-sm text-richblack-100" />
      </div>
      {open && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute top-[118%] right-0 z-[1000] divide-y-[1px] divide-richblack-700 overflow-hidden rounded-md border-[1px] border-richblack-700 bg-richblack-800 h-fit "
          ref={ref}
        >
          <Link
            to="/dashboard/my-profile"
            onClick={() => setOpen(false)}
          >
            <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25">
              <VscDashboard className="text-lg" />
              Dashboard
            </div>
          </Link>
          <div
            onClick={() => {
              dispatch(logout(navigate));
              setOpen(false);
            }}
            className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25"
          >
            <VscSignOut className="text-lg" />
            Logout
          </div>
          {user && user.accountType === ACCOUNT_TYPE.STUDENT && (
            <div className=" visible sm:hidden">
              {/* about us  */}
              <div
                onClick={() => {
                  // dispatch(logout(navigate));
                  navigate("/aboutus");
                  setOpen(false);
                }}
                className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25"
              >
                About Us
              </div>
              {/* contact us  */}
              <div
                onClick={() => {
                  // dispatch(logout(navigate));
                  navigate("contactus");
                  setOpen(false);
                }}
                className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25"
              >
                Conact Us
              </div>
            </div>
          )}
          <div className="  w-fit ">
            <Catalog
              NavbarLinks={NavbarLinks}
              matchRoute={matchRoute}
              subLinks={subLinks}
              loading={loading}
            />
          </div>
        </div>
      )}
    </button>
  );
};

export default ProfileDropDown;
