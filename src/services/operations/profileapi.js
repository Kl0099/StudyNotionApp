import { setToken, setLoading, setSignupData } from "../../slices/auth";
import { setUser } from "../../slices/profile";
import { apiConnector } from "../apiConnector";
import { authApis, profileApis } from "../apis";
import { profileEndpoints } from "../apis";
import { logout } from "./authapi";
import { toast } from "react-hot-toast";

export const getUser = (token, navigate) => {
  return async (dispatch) => {
    const toastId = toast.loading("Loading..");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector(
        "GET",
        profileApis.GET_USER_DETAILS_API,
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      );
      // console.log("getuser : ", response.data.user);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      const userImage = response.data.data.image
        ? response.data.data.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.data.firstName} ${response.data.data.lastName}`;
      dispatch(setUser({ ...response.data.data, image: userImage }));
    } catch (error) {
      // dispatch logout(navigate)
      dispatch(logout(navigate));
      console.log("get user details :  ", error);
      toast.error("could not fetch user details");
    }
    toast.dismiss(toastId);
    dispatch(setLoading(false));
  };
};

export const updateProfilePic = (token, avatar) => {
  return async (dispatch) => {
    setLoading(true);
    const toastid = toast.loading("Loading...");
    try {
      const response = await apiConnector(
        "POST",
        profileApis.UPDATE_PROFILE_PIC_API_URL,
        { avatar }
      );
      // console.log(response);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Profile Update successfully");
      dispatch(setUser(response.data.data));
      setLoading(false);
    } catch (error) {
      console.log("error while dispatching profile pic update", error);
      toast.error("Error while updating profile");
      setLoading(false);
    }
    toast.dismiss(toastid);
  };
};

export const updateProfile = (token, data, navigate) => {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    setLoading(true);
    try {
      const { about, contactNumber, dateOfBirth, gender } = data;
      const response = await apiConnector(
        "PUT",
        profileApis.UPDATE_PROFILE_API_URL,
        { dateOfBirth, about, contactNumber, gender },
        {
          Authorization: `Bearer ${token}`,
        }
      );
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("profile updated successfully");
      // setUser(response.data.profileDetails)
      dispatch(setUser(response.data.user));
      navigate("/dashboard/my-profile");
    } catch (error) {
      console.log("error while dispatching profile update", error);
      toast.error("Error while updating profile");
    }
    setLoading(false);
    toast.dismiss(toastId);
  };
};

export const deleteProfile = (token, navigate) => {
  return async (dispatch) => {
    setLoading(true);
    const toastid = toast.loading("Loading...");
    try {
      const response = await apiConnector(
        "DELETE",
        profileApis.DELETE_ACC_API,
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      );
      // console.log(response);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Profile deleted successfully");
      // dispatch(setUser(response.data.data));
      dispatch(logout(navigate));
      setLoading(false);
    } catch (error) {
      console.log("error while dispatching delete profile", error);
      toast.error("Error while deleting profile");
      setLoading(false);
    }
    toast.dismiss(toastid);
  };
};

export const getUserEnrolledCourses = async (token) => {
  // const toastid = toast.loading("Loading...");
  let result;
  try {
    const response = await apiConnector(
      "GET",
      profileEndpoints.GET_USER_ENROLLED_COURSES_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    result = response.data.data;
    return result;
  } catch (error) {
    console.log("error while fetching user enrolled courses ", error);
  }
  // toast.dismiss(toastid);
};
export const getInstructoreData = async (token) => {
  const toastid = toast.loading("Loading...");
  let result = [];

  try {
    const response = await apiConnector(
      "GET",
      profileEndpoints.GET_INSTRUCTOR_DATA_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    if (!response.data.success) {
      throw new Error("error while fetching instructor course data");
    }
    result = response?.data?.courses;
  } catch (error) {
    console.log("error while instructore course data fetching", error.message);

    toast.error(error.message);
  }
  toast.dismiss(toastid);
  return result;
};
