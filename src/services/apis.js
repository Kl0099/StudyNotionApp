//catagory category/allcatagory
//base url = "http://localhost:port/api/v1/"
const BASE_URL =
  process.env.REACT_APP_BASE_URL || "http://localhost:4000/api/v1";

export const categories = {
  CATEGORIES_API: BASE_URL + "/category/allcatagory",
};
