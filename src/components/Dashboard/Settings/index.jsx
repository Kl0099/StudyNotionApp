import ChangeProfilePic from "./ChangeProfilePic";
import DeleteAccount from "./DeleteAccount";
import EditProfile from "./EditProfile";
import React from "react";

const Settins = () => {
  return (
    <>
      <h1 className="mb-14 text-3xl font-medium text-richblack-5">
        Edit Profile
      </h1>
      <ChangeProfilePic />
      <EditProfile />
      <DeleteAccount />
    </>
  );
};

export default Settins;
