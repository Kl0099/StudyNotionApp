//catagory category/allcatagory
//base url = "http://localhost:port/api/v1/"
const BASE_URL =
  process.env.REACT_APP_BASE_URL || "http://localhost:4000/api/v1";

export const categories = {
  CATEGORIES_API: BASE_URL + "/category/allcatagory",
};

export const authApis = {
  LOGIN_API: BASE_URL + "/auth/login",
  SIGNUP_API: BASE_URL + "/auth/signup",
  SEND_OTP_API: BASE_URL + "/auth/sendotp",
  CHANGE_PASSWORD_API_URL: BASE_URL + "/auth/changepassword",
  RESET_PASSWORD_TOEN_API_URL: BASE_URL + "/auth/reset-password-token",
  RESET_PASSWORD_API_URL: BASE_URL + "/auth/reset-password",
};

export const profileApis = {
  GET_USER_DETAILS_API: BASE_URL + "/profile/getallusersdetails",
  DELETE_ACC_API: BASE_URL + "/profile/deleteaccount",
  UPDATE_PROFILE_API_URL: BASE_URL + "/profile/updateprofile",
  UPDATE_PROFILE_PIC_API_URL: BASE_URL + "/profile/updateprofilepic",
};
