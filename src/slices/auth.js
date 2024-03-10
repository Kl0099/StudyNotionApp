import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  signupData: null,
  token: localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token"))
    : null,
};
const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setLoading(state, value) {
      state.loading = value.payload;
    },
    setSignupData(state, value) {
      state.signupData = value.payload;
    },
    setToken(state, value) {
      state.token = value.payload;
    },
  },
});

export const { setToken, setLoading, setSignupData } = authSlice.actions;
export default authSlice.reducer;
