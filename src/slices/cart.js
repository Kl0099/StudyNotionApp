import { createSlice } from "@reduxjs/toolkit";
import toast, { Toast } from "react-hot-toast";

const initialState = {
  cart: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
  total: localStorage.getItem("total")
    ? JSON.parse(localStorage.getItem("total"))
    : 0,
  totalItems: localStorage.getItem("totalItems")
    ? JSON.parse(localStorage.getItem("totalItems"))
    : 0,
};
const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    setTotalItems(state, value) {
      state.totalItems = value.payload;
    },
    //add to cart
    addToCart: (state, value) => {
      const course = value.payload;
      console.log("course from cart : ", course);
      const index = state.cart.findIndex((item) => item._id === course._id);
      if (index >= 0) {
        // means course is already in to the card
        toast.error("Course already in cart");
        return;
      }

      state.cart.push(course);
      state.totalItems++;
      state.total += course.price;
      localStorage.setItem("cart", JSON.stringify(state.cart));
      localStorage.setItem("total", JSON.stringify(state.total));
      localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
      toast.success("Course successfully added to cart");
    },

    //remove cart
    removeToCart: (state, value) => {
      // step 1 find id
      // step 2 find index
      // step 3 if index is present then remove course and remove from the localStorage also update the localstorage

      const courseId = value.payload;
      const index = state.cart.findIndex((item) => item._id === courseId);
      if (index >= 0) {
        state.totalItems--;
        state.total -= state.cart[index].price;
        state.cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(state.cart));
        localStorage.setItem("total", JSON.stringify(state.total));
        localStorage.setItem("totalItems", JSON.stringify(state.totalItems));

        toast.success("Successfully removed items from cart");
      }
    },
    //reset cart
    resetCart: (state, value) => {
      state.cart = [];
      state.total = 0;
      state.totalItems = 0;
      localStorage.getItem("cart");
      localStorage.removeItem("total");
      localStorage.removeItem("totalItems");
    },
  },
});

export const {
  setTotalItems, //add to cart
  addToCart,
  removeToCart,
  resetCart,
} = cartSlice.actions;
export default cartSlice.reducer;
