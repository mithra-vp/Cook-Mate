import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./shared/Navbar";
import Footer from "./shared/Footer";
import Home from "./pages/Home";
import HeroBanner from "./shared/HeroBanner";
import Recipe from "./pages/Recipe";
import Category from "./pages/Category";
import Sign from "./pages/Sign";
import Signup from "./pages/Signup";

function App() {
  return (
    <>
      <Navbar />
      {/* <Sign/> */}
      <Routes>
        {/* DEFAULT ROUTE */}
        <Route
          path="/"
          element={
            <>
              <HeroBanner />
              <Home />
            </>
          }
        />

        {/* OPTIONAL */}
        <Route path="/home" element={<Navigate to="/" />} />
        <Route path="/sign" element={<Sign />} /> 
        <Route path="/signup" element={<Signup />} />
        <Route path="/category/:name" element={<Category />} />
        <Route path="/recipes" element={<Recipe />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
