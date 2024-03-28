import { updateProfilePic } from "../../../services/operations/profileapi";
import IconBtn from "../../common/IconBtn";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { FiUpload } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ChangeProfilePic = () => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(null);
  const [avatar, setAvatar] = useState("");
  const [imageform, setImageForm] = useState(null);
  const fileInputRef = useRef(null);
  const handleClick = () => {
    fileInputRef.current.click();
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      prevFile(file);
    }
  };
  const handleFileUpload = () => {
    try {
      // setLoading(true);

      dispatch(updateProfilePic(token, avatar)).then(() => {
        setLoading(false);
      });
    } catch (error) {
      toast.error("something went wrong !!!");
      setLoading(false);
    }
  };
  const prevFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPreviewSource(reader.result);
      setAvatar(reader.result);
      // console.log(avatar);
    };
  };
  useEffect(() => {
    if (avatar) {
      // console.log("imageform", avatar);
    }
  }, [setAvatar]);

  return (
    <div className="flex items-start sm:items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-2 sm:p-8 sm:px-12 text-richblack-5">
      <div className="flex items-start sm:items-center gap-x-4">
        <img
          src={previewSource || user?.image.url || user?.image}
          alt={user?.firstName}
          className="aspect-square w-[50px] sm:w-[78px] rounded-full object-cover"
        />
        <div className=" flex flex-col sm:space-y-2">
          <p>Change Profile Picture</p>
          <div className=" flex sm:flex-row flex-col gap-3">
            <input
              type="file"
              name="file"
              id="file"
              // ref={fileInputRef}
              // className="hidden"
              required
              className=" sm:w-fit w-[200px]  flex file:bg-richblue-700 file:text-richblack-5 file:border "
              accept="image/png , image/jpeg , image/gif "
              onChange={handleFileChange}
            />{" "}
            <div className="  flex flex-col items-end">
              <IconBtn
                text={loading ? "Uploading..." : "upload"}
                onclick={handleFileUpload}
              >
                {!loading && (
                  <FiUpload className=" w-fit text-lg text-richblue-900" />
                )}
              </IconBtn>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeProfilePic;
