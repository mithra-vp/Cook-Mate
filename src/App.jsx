import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./shared/Navbar";
import Footer from "./shared/Footer";
import Home from "./pages/Home";
import HeroBanner from "./shared/HeroBanner";
import Recipe from "./pages/Recipe";
import Category from "./pages/Category";
import Sign from "./pages/Sign";
import Signup from "./pages/Signup";
import AddRecipe from "./pages/admin/AddRecipe";
import EditRecipe from "./pages/admin/EditRecipe";
import AdminDashboard from "./pages/admin/AdminDashboard";

function App() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const location = useLocation();

  const hideNavbar =
    location.pathname === "/sign" ||
    location.pathname === "/signup" ||
    location.pathname.startsWith("/admin");

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Navigate to="/sign" />} />

        <Route
          path="/sign"
          element={isLoggedIn ? <Navigate to="/home" /> : <Sign />}
        />

        <Route
          path="/signup"
          element={isLoggedIn ? <Navigate to="/home" /> : <Signup />}
        />

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

        <Route
          path="/recipes"
          element={isLoggedIn ? <Recipe /> : <Navigate to="/sign" />}
        />

        <Route
          path="/category/:name"
          element={isLoggedIn ? <Category /> : <Navigate to="/sign" />}
        />

        <Route
          path="/admin"
          element={isLoggedIn ? <AdminDashboard /> : <Navigate to="/sign" />}
        />
        <Route
          path="/admin/add"
          element={isLoggedIn ? <AddRecipe /> : <Navigate to="/sign" />}
        />
        <Route
          path="/admin/edit/:id"
          element={isLoggedIn ? <EditRecipe /> : <Navigate to="/sign" />}
        />
      </Routes>

      {!hideNavbar && <Footer />}
    </>
  );
}

export default App;
