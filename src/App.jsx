import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import Login from "./pages/Login";
import About from "./pages/About";
import Register from "./pages/Register";
import Contact from "./pages/Contact";
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
      {location.pathname !== "/signup" && location.pathname !== "/login" && (
        <Footer />
      )}
    </main>
  );
}

export default App;
