import React from "react";
import { FaFacebookF, FaInstagram, FaYoutube} from "react-icons/fa";
import { PiHamburgerFill } from "react-icons/pi";
import "./footer.css";
import { HashLink } from "react-router-hash-link";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-about">
          <h2> <PiHamburgerFill/>CookMate</h2>
          <p>Discover, cook, and enjoy delicious recipes from around the world.</p>
        </div>

        <section className="footer-links"id="">
          <h3>Quick Links</h3>
          <ul>
            <li><HashLink  smooth to="/#home">Home</HashLink></li>
            <li><HashLink smooth to="/#about">About</HashLink></li>
            <li><HashLink smooth to="/#newlaunch">Newlaunch</HashLink></li>
          </ul>
        </section>


        <div className="footer-social">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <FaFacebookF />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer">
              <FaYoutube />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>


      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} CookMate. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
