import { apiConnector } from "../apiConnector";
import { courseEndpoints } from "../apis";
import { toast } from "react-hot-toast";

export const fetchCourseCategories = async () => {
  let result = [];
  try {
    const response = await apiConnector(
      "GET",
      courseEndpoints.COURSE_CATEGORIES_API
    );
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Course Categories");
    }
    result = response?.data?.data;
  } catch (error) {
    console.log("COURSE_CATEGORY_API API ERROR............", error);
    toast.error(error.message);
  }
  return result;
};

export const addCourseDetails = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector(
      "POST",
      courseEndpoints.CREATE_COURSE_API,
      data,
      {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      }
    );
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Course");
    }
    toast.success("Course Details added successfully");
    result = response?.data?.data;
  } catch (error) {
    console.log("error in addCourseDetails", error);
    toast.error("error while adding courseDetails");
  }
  toast.dismiss(toastId);
  return result;
};

export const editCourseDetails = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector(
      "POST",
      courseEndpoints.EDIT_COURSE_API,
      data,
      {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      }
    );
    console.log("EDIT COURSE API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Update Course Details");
    }
    toast.success("Course Details Updated Successfully");
    result = response?.data?.data;
  } catch (error) {
    console.log("EDIT COURSE API ERROR............", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};
