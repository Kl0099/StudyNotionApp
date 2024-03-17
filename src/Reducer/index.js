import authReducer from "../slices/auth";
import cartReducer from "../slices/cart";
import courseReducer from "../slices/course";
import profileReducer from "../slices/profile";
import { combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  cart: cartReducer,
  course: courseReducer,
});

export default rootReducer;
