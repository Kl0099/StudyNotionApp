//catagory category/allcatagory
//base url = "http://localhost:port/api/v1/"
const BASE_URL =
  process.env.REACT_APP_BASE_URL || "http://localhost:4000/api/v1";

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

// COURSE ENDPOINTS
export const courseEndpoints = {
  GET_ALL_COURSE_API: BASE_URL + "/course/getallcourse",
  COURSE_DETAILS_API: BASE_URL + "/course/getCourseDetails",
  EDIT_COURSE_API: BASE_URL + "/course/editCourse",
  COURSE_CATEGORIES_API: BASE_URL + "/category/showAllCategories",
  CREATE_COURSE_API: BASE_URL + "/course/createCourse",
  CREATE_SECTION_API: BASE_URL + "/course/addSection",
  CREATE_SUBSECTION_API: BASE_URL + "/course/addSubSection",
  UPDATE_SECTION_API: BASE_URL + "/course/updateSection",
  UPDATE_SUBSECTION_API: BASE_URL + "/course/updateSubSection",
  GET_ALL_INSTRUCTOR_COURSES_API: BASE_URL + "/course/getInstructorCourses",
  DELETE_SECTION_API: BASE_URL + "/course/deleteSection",
  DELETE_SUBSECTION_API: BASE_URL + "/course/deleteSubSection",
  DELETE_COURSE_API: BASE_URL + "/course/deleteCourse",
  GET_FULL_COURSE_DETAILS_AUTHENTICATED:
    BASE_URL + "/course/getFullCourseDetails",
  LECTURE_COMPLETION_API: BASE_URL + "/course/updateCourseProgress",
  CREATE_RATING_API: BASE_URL + "/course/createRating",
};
// CATAGORIES API
export const categories = {
  CATEGORIES_API: BASE_URL + "/category/showAllCategories",
};

// CATALOG PAGE DATA
export const catalogData = {
  CATALOGPAGEDATA_API: BASE_URL + "/category/catagorypagedetails",
};

// STUDENTS ENDPOINTS
export const studentEndpoints = {
  COURSE_PAYMENT_API: BASE_URL + "/payment/capturePayment",
  COURSE_VERIFY_API: BASE_URL + "/payment/verifyPayment",
  SEND_PAYMENT_SUCCESS_EMAIL_API: BASE_URL + "/payment/sendPaymentSuccessEmail",
  DIRECTENROLLED_API: BASE_URL + "/payment/directEnrolled",
};

// PROFILE ENDPOINTS
export const profileEndpoints = {
  GET_USER_DETAILS_API: BASE_URL + "/profile/getUserDetails",
  GET_USER_ENROLLED_COURSES_API: BASE_URL + "/profile/getEnrolledCourses",
  GET_INSTRUCTOR_DATA_API: BASE_URL + "/profile/instructorDashboard",
};
