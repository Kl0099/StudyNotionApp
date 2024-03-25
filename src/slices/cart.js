import { createSlice } from "@reduxjs/toolkit";
import { Toast } from "react-hot-toast";

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
    addToCart: (state, value) => {},

    //remove cart
    removeToCart: (state, value) => {},
    //reset cart
    resetCart: (state, value) => {},
  },
});

export const {
  setTotalItems, //add to cart
  addToCart,
  removeToCart,
  resetCart,
} = cartSlice.actions;
export default cartSlice.reducer;
