import React, { useState, useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { PiHamburgerLight } from "react-icons/pi";
import { FiSun, FiMoon, FiLogOut } from "react-icons/fi";
import { ThemeContext } from "./ThemeContext";
import './nav.css';
import { HashLink } from 'react-router-hash-link';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  const scrollWithDuration = (el) => {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const isLoggedIn = !!localStorage.getItem("signupUser");

  const handleLogout = () => {
    alert("You have been logged out successfully!");
    localStorage.removeItem("isLoggedIn");
    window.location.href = "/sign";
  };




  return (
    <nav className={darkMode ? "dark" : ""}>

      <div className="nav-left">
        <NavLink to="/" className="logo">
          <PiHamburgerLight /> CookMate
        </NavLink>
      </div>

      <ul className={`nav-links ${menuOpen ? "show" : ""}`}>
        <li><HashLink smooth to="/home#home" scroll={scrollWithDuration} onClick={() => setMenuOpen(false)}>Home</HashLink></li>
        <li><HashLink smooth to="/home#about" scroll={scrollWithDuration} onClick={() => setMenuOpen(false)}>About</HashLink></li>
        <li><HashLink smooth to="/home#newlaunch" scroll={scrollWithDuration} onClick={() => setMenuOpen(false)}> NewLaunch</HashLink></li>
        <li><NavLink to="/recipes" onClick={() => setMenuOpen(false)}>Recipes</NavLink></li>

        {/* scroll using hash link   === npm install react-router-hash-link==== */}
      </ul>

      <div className="nav-right">
        <button className="theme-btn" onClick={toggleTheme}>
          {darkMode ? <FiMoon /> : <FiSun />}
        </button>
        {isLoggedIn && (
          <button
            className="logout-icon"
            onClick={handleLogout}
            title="Logout"
          >
            <FiLogOut size={22} />
          </button>
        )}

        <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
          <span></span><span></span><span></span>
        </div>
      </div>

    </nav>
  );
};

export default Navbar;
