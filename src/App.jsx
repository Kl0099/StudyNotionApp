import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import Login from "./pages/Login";
import AboutUs from "./pages/AboutUs";
import Register from "./pages/Register";
import ContactUs from "./pages/ContactUs";
import { useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  console.log(location.pathname);
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
          path="/register"
          element={<Register />}
        />
        <Route
          path="/aboutus"
          element={<AboutUs />}
        />
        <Route
          path="/contactus"
          element={<ContactUs />}
        />
      </Routes>
      {location.pathname !== "/register" && location.pathname !== "/login" && (
        <Footer />
      )}
    </main>
  );
}

export default App;
