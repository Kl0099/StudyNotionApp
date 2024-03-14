import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import EnrolledCourses from "./components/Dashboard/EnrolledCourses";
import MyProfile from "./components/Dashboard/MyProfile";
import Settings from "./components/Dashboard/Settings/index";
import Footer from "./components/common/Footer";
import Navbar from "./components/common/Navbar";
import { accountType } from "./data/constants";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import Error from "./pages/Error";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
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
          element={<Home />}
        />
        <Route
          path="/login"
          element={<Login />}
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
          element={<Register />}
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

        <Route element={<Dashboard />}>
          <Route
            path="/dashboard/my-profile"
            element={<MyProfile />}
          />
          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route
                path="/dashboard/enrolled-courses"
                element={<EnrolledCourses />}
              />
              <Route
                path="/dashboard/settings"
                element={<Settings />}
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
