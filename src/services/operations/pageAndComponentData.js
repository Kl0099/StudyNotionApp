import { apiConnector } from "../apiConnector";
import { catalogData } from "../apis";
import toast from "react-hot-toast";

export const getCatalogPageData = async (catalogId) => {
  const toastId = toast.loading("Loading...");
  let result = [];
  try {
    const response = await apiConnector(
      "POST",
      catalogData.CATALOGPAGEDATA_API,
      {
        categoryId: catalogId,
      }
    );
    if (!response?.data.success) {
      throw new Error("Could Not fetch Catalog page Data");
    }
    result = response?.data;
  } catch (error) {
    console.log("catalog API ERROR............", error);
    toast.error(error.message);
    result = error.response?.data;
  }
  toast.dismiss(toastId);
  return result;
};
