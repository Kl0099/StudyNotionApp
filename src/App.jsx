import { useDispatch } from "react-redux";
import "./App.css";
import Footer from "./components/common/Footer";
import Navbar from "./components/common/Navbar";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UpdatePassword from "./pages/UpdatePassword";
import { getUser } from "./services/operations/profileapi";
import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // console.log(location.pathname);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      const token = JSON.parse(localStorage.getItem("token"));
      dispatch(getUser(token, navigate));
    }
  }, []);
  return (
    <main className="flex min-h-screen w-screen flex-col bg-richblack-900 font-inter">
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
          path="/aboutus"
          element={<About />}
        />
        <Route
          path="/contactus"
          element={<Contact />}
        />
      </Routes>
    </main>
  );
}

export default App;
