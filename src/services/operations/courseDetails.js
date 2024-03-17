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
