import ConfirmationModal from "../../components/common/ConfirmationModal";
import { sidebarLinks } from "../../data/dashboard-links";
import { logout } from "../../services/operations/authapi";
import SideBarLink from "./SideBarLink";
import React, { useState } from "react";
import { VscSignOut } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SideBar = () => {
  const [modalData, setModalData] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading: profileLoading } = useSelector(
    (state) => state.profile
  );
  const { loading: authLoading } = useSelector((state) => state.auth);

  if (profileLoading || authLoading) {
    return <div className=" text-4xl text-center">Loading...</div>;
  }
  return (
    <div>
      <div className=" flex h-[calc(100vh-3.5rem)] min-w-[220px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800 py-10">
        <div className="flex flex-col">
          {sidebarLinks.map((link) => {
            if (link.type && user?.accountType !== link.type) {
              return null;
            }

            return (
              <SideBarLink
                key={link.id}
                link={link}
                iconName={link.icon}
              />
            );
          })}
        </div>

        <div className=" mx-auto my-7 h-[0.1rem] bg-richblue-600 w-10/12"></div>
        <div className="flex flex-col ">
          <SideBarLink
            link={{ name: "Settings", path: "dashboard/settings" }}
            iconName={"VscSettingsGear"}
          />
          <button
            onClick={() => {
              setModalData({
                text1: "Are you sure ? ",
                text2: "you will be logged out be careful",
                btn1Text: "Logout",
                btn2Text: "Cancel",
                btn1Handler: () => dispatch(logout(navigate)),
                btn2Handler: () => setModalData(null),
              });
            }}
            className="px-8 py-2 text-sm font-medium text-richblack-300"
          >
            <div className="flex items-center gap-x-2">
              <VscSignOut className="text-lg" />
              <span>Logout</span>
            </div>
          </button>
        </div>
      </div>
      {modalData && <ConfirmationModal modalData={modalData} />}
    </div>
  );
};

export default SideBar;
