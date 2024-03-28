import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  user: null,
  drawer: true,
};
const profileSlice = createSlice({
  name: "profile",
  initialState: initialState,
  reducers: {
    setUser(state, value) {
      state.user = value.payload;
    },
    setLoading(state, value) {
      state.loading = value.payload;
    },
    setDrawer(state, value) {
      state.drawer = value.payload;
    },
  },
});

export const { setDrawer, setUser, setLoading } = profileSlice.actions;
export default profileSlice.reducer;
