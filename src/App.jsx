import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./shared/Navbar";
import Footer from "./shared/Footer";
import Home from "./pages/Home";
import HeroBanner from "./shared/HeroBanner";
import Recipe from "./pages/Recipe";
import Category from "./pages/Category";
import Sign from "./pages/Sign";
import Signup from "./pages/Signup";

function App() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const location = useLocation();

  // hide navbar & footer on auth pages
  const hideNavbar =
    location.pathname === "/sign" || location.pathname === "/signup";

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        {/* OPEN APP → SIGN IN FIRST */}
        <Route path="/" element={<Navigate to="/sign" />} />

        {/* SIGN IN */}
        <Route
          path="/sign"
          element={isLoggedIn ? <Navigate to="/home" /> : <Sign />}
        />

        {/* SIGN UP */}
        <Route
          path="/signup"
          element={isLoggedIn ? <Navigate to="/home" /> : <Signup />}
        />

        {/* HOME (PROTECTED) */}
        <Route
          path="/home"
          element={
            isLoggedIn ? (
              <>
                <HeroBanner />
                <Home />
              </>
            ) : (
              <Navigate to="/sign" />
            )
          }
        />

        {/* PROTECTED ROUTES */}
        <Route
          path="/recipes"
          element={isLoggedIn ? <Recipe /> : <Navigate to="/sign" />}
        />

        <Route
          path="/category/:name"
          element={isLoggedIn ? <Category /> : <Navigate to="/sign" />}
        />
      </Routes>

      {!hideNavbar && <Footer />}
    </>
  );
}

export default App;
