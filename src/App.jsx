import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/common/Navbar";

function App() {
  return (
    <main className="flex min-h-screen w-screen flex-col bg-richblack-900 font-inter">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
      </Routes>
    </main>
  );
}

export default App;
