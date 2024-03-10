import { setToken, setLoading, setSignupData } from "../../slices/auth";
import { setUser } from "../../slices/profile";
import { apiConnector } from "../apiConnector";
import { authApis, profileApis } from "../apis";
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
