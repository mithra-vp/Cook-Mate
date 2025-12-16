import React, { useState, useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { PiHamburgerLight } from "react-icons/pi";
import { FiSun, FiMoon } from "react-icons/fi";
import { ThemeContext } from "./ThemeContext";
import './nav.css';
import { HashLink } from 'react-router-hash-link';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  const scrollWithDuration = (el) => {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
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
        <Link to="/sign" className='sign' onClick={() => setMenuOpen(false)}>Sign in</Link>

        <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
          <span></span><span></span><span></span>
        </div>
      </div>

    </nav>
  );
};

export default Navbar;
