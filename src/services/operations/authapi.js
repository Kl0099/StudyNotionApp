import { setToken, setLoading, setSignupData } from "../../slices/auth";
import { setUser } from "../../slices/profile";
import { apiConnector } from "../apiConnector";
import { authApis } from "../apis";
import { toast } from "react-hot-toast";

export const login = (email, password, navigate) => {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const result = await apiConnector("POST", authApis.LOGIN_API, {
        email,
        password,
      });
      if (!result.data.success) {
        throw new Error(result.data.message);
      }
      console.log(result.data);
      toast.success("login successful");
      dispatch(setToken(result.data.token));
      const userImage = result.data?.user?.image
        ? result.data.user.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${result.data.user.firstName} ${result.data.user.lastName}`;
      dispatch(setUser({ ...result.data.user, image: userImage }));
      localStorage.setItem("token", JSON.stringify(result.data.token));
      navigate("/dashboard/my-profile");
    } catch (error) {
      console.log("login error when dispatch login : ", error.message);
      toast.error("Login Failed Try again");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
};

export const logout = (navigate) => {
  return async (dispatch) => {
    dispatch(setToken(null));
    dispatch(setUser(null));
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
    navigate("/");
  };
};

export const signup = (
  accoutType,
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  otp,
  navigate
) => {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", authApis.SIGNUP_API, {
        accoutType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Signup successful");
      navigate("/login");
    } catch (error) {
      console.log("error while dispatch signup : ", error);
      toast.error("Signup failed");
      navigate("/signup");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
};

export const sendotp = (email, navigate) => {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", authApis.SEND_OTP_API, {
        email,
        checkUserPresent: true,
      });
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Otp sent successfully");
      navigate("/verify-email");
    } catch (error) {
      console.log("error while dispatch send otp :", error);
      toast.error("Could not send otp");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
};

export const getPasswordResetToken = (email, setEmailSent) => {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    setLoading(true);
    try {
      const response = await apiConnector(
        "POST",
        authApis.RESET_PASSWORD_TOEN_API_URL,
        { email }
      );
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success(response.data.message);
    } catch (error) {
      console.log(
        "error while dispatch reset password token : ",
        error.message
      );
      toast.error("failed to send url ");
    }
    setLoading(false);
    setEmailSent(true);
    toast.dismiss(toastId);
  };
};

export const resetPassword = (password, confirmPassword, token) => {
  return async (dispatch) => {
    setLoading(true);
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector(
        "POST",
        authApis.RESET_PASSWORD_API_URL,
        {
          password,
          confirmPassword,
          token,
        }
      );
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success(response.data.message);
    } catch (error) {
      console.log("error while reset password dispatch : ", error.message);
      toast.error(error.message);
    }
    setLoading(false);
    toast.dismiss(toastId);
  };
};
