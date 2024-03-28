import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import EditCourse from "./components/Dashboard/EditCourse/EditCourse";
import EnrolledCourses from "./components/Dashboard/EnrolledCourses";
import MyCourses from "./components/Dashboard/MyCourses";
import MyProfile from "./components/Dashboard/MyProfile";
import Settings from "./components/Dashboard/Settings/index";
import VideoDetails from "./components/Dashboard/VideoDetails/VideoDetails";
import VideoDetailsSideBar from "./components/Dashboard/VideoDetails/VideoDetailsSideBar";
import AddCourses from "./components/Dashboard/addCourses";
import Cart from "./components/Dashboard/cart";
import OpenRoute from "./components/auth/OpenRoute";
import PrivateRoute from "./components/auth/PrivateRoute";
import Footer from "./components/common/Footer";
import Navbar from "./components/common/Navbar";
import { accountType } from "./data/constants";
import About from "./pages/About";
import Catalog from "./pages/Catalog";
import Contact from "./pages/Contact";
import CourseDetails from "./pages/CourseDetails";
import Dashboard from "./pages/Dashboard";
import Error from "./pages/Error";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import ViewCourse from "./pages/ViewCourse";
import { getUser } from "./services/operations/profileapi";
import { ACCOUNT_TYPE } from "./utils/constants";
import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.profile);

  // console.log(location.pathname);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      const token = JSON.parse(localStorage.getItem("token")) || null;
      dispatch(getUser(token, navigate));
    }
  }, []);
  return (
    <main className=" text-richblack-5 flex min-h-screen w-screen flex-col bg-richblack-900 font-inter">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <OpenRoute>
              <Home />
            </OpenRoute>
          }
        />
        <Route
          path="/login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />
        <Route
          path="/update-password/:id"
          element={<UpdatePassword />}
        />

        <Route
          path="/signup"
          element={
            <OpenRoute>
              <Register />
            </OpenRoute>
          }
        />
        <Route
          path="/verify-email"
          element={<VerifyEmail />}
        />

        <Route
          path="/aboutus"
          element={<About />}
        />
        <Route
          path="/contactus"
          element={<Contact />}
        />
        <Route
          path="catalog/:catalogName"
          element={<Catalog />}
        />
        <Route
          path="courses/:courseId"
          element={<CourseDetails />}
        />

        <Route
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route
            path="/dashboard/my-profile"
            element={<MyProfile />}
          />
          <Route
            path="/dashboard/settings"
            element={<Settings />}
          />
          {/* student  */}
          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route
                path="/dashboard/enrolled-courses"
                element={<EnrolledCourses />}
              />
              <Route
                path="/dashboard/cart"
                element={<Cart />}
              />
            </>
          )}
          {/* instructore  */}
          {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
            <>
              <Route
                path="/dashboard/add-course"
                element={<AddCourses />}
              />
              <Route
                path="/dashboard/my-courses"
                element={<MyCourses />}
              />
              <Route
                path="dashboard/edit-course/:courseId"
                element={<EditCourse />}
              />
            </>
          )}
        </Route>

        {/* video lectures routes
         */}
        <Route element={<ViewCourse />}>
          {user && user.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route
                path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
                element={<VideoDetails />}
              />
            </>
          )}
        </Route>

        {/* not found path  */}
        <Route
          path="*"
          element={<Error />}
        />
      </Routes>
    </main>
  );
}

export default App;
