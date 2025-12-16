import React, { useEffect, useState } from "react";
import "./banner.css";
import banner from "../assets/banner.jpg"
import banner2 from "../assets/banner2.jpg"
import banner3 from "../assets/banner3.jpg"
import { HashLink } from "react-router-hash-link";
const HeroBanner = () => {
  const images = [banner, banner2, banner3];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  const leftIndex = (index + images.length - 1) % images.length;
  const rightIndex = (index + 1) % images.length;
  return (
    <div className="hero-container">
      <div className="hero-left">
        <p className="hero-tag">Discover — Your Next Favorite Recipe</p>

        <h1 className="hero-title">
          Fresh Recipes, Confident Cook
        </h1>

        <p className="hero-desc">
          Curated recipes and kitchen essentials.
          Fresh flavors, effortless cooking made to brighten your everyday meals.
        </p>

        <section id="history">

          <HashLink smooth to="/#history" className="primary-btn">
            Go to our history
          </HashLink>        
          </section>

      </div>

      <div className="carousel-moving">

        <img src={images[leftIndex]} className="carousel-img left" />

        <img src={images[index]} className="carousel-img center" />

        <img src={images[rightIndex]} className="carousel-img right" />

      </div>

    </div>
  );
};

export default HeroBanner;
