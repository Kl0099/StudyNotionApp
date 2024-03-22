import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  step: 2,
  // course: null,
  course: {
    courseContent: [],
    courseDescription: "ewerwerwer",
    courseName: "new course",
    instructor: "65f52b7424893d4a498dcd7b",
    price: 12323,
    ratingAndReviews: [],
    studentsEnrolled: [],
    tag: [],
    thumbnail:
      "https://res.cloudinary.com/dkzp8h6xw/image/upload/v1711111376/akhgpjqty19hccdzuv2q.jpg",
    whatYouWillLearn: "efafsdfsadf",
    __v: 0,
    _id: "65fd7cd16b81541b837d1e12",
  },
  editCourse: false,
  paymentLoading: false,
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    setStep: (state, value) => {
      state.step = value.payload;
    },
    setCourse: (state, value) => {
      state.course = value.payload;
    },
    setEditCourse: (state, value) => {
      state.editCourse = value.payload;
    },
    setPaymentLoading: (state, value) => {
      state.paymentLoading = value.payload;
    },
    resetCourseState: (state) => {
      state.step = 1;
      state.course = null;
      state.editCourse = false;
    },
  },
});

export const {
  setStep,
  setCourse,
  setEditCourse,
  setPaymentLoading,
  resetCourseState,
} = courseSlice.actions;
export default courseSlice.reducer;
