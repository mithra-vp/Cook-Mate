import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import "./home.css";
import breakfast from "../assets/breakfast.jpg";
import lunch from "../assets/lunch.jpg";
import dinner from "../assets/dinner.jpg";
import dessert from "../assets/deserts.jpg";

const Home = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const [category, setCategory] = useState("");


  const categories = [
    { name: "Breakfast", image: breakfast },
    { name: "Lunch", image: lunch },
    { name: "Dinner", image: dinner },
    { name: "Dessert", image: dessert },
  ];

  return (

    <div>

      {/* ABOUT */}
      <section id="about" className="about">
        <div className="about-container">
          <h1 className="about-title">Welcome to CookMate</h1>
          <div className="about-section">
            <p>
              CookMate is your smart recipe companion designed to make cooking simple, enjoyable, and inspiring for everyone.Whether you’re a beginner taking your first steps in the kitchen or a passionate home chef exploring new flavors, CookMate helps you discover recipes that match your taste, ingredients, and lifestyle. With an easy-to-use interface and thoughtfully curated recipes, cooking becomes less stressful and more joyful.
            </p>
          </div>

          <div className="about-section">
            <h2>Our Values</h2>

            <div className="values-grid">
              <div className="value-card">
                <h3>Simplicity</h3>
                <p>Easy-to-follow recipes for everyone.</p>
              </div>

              <div className="value-card">
                <h3>Creativity</h3>
                <p>Inspiring you to try new flavors and ideas.</p>
              </div>

              <div className="value-card">
                <h3>Accessibility</h3>
                <p>Cooking made enjoyable for all skill levels.</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* HOME */}
      <section id="home" className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Find Your Next Favorite Recipe</h1>
          <p>Simple, delicious recipes for every day</p>
        </div>
      </section>


      {/* categories */}

      <section id="newlaunch" className="categories">
        <h2>Try New Tastes with Kerala</h2>
        <div className="category-grid">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              to={`/category/${cat.name.toLowerCase()}`}
              className="category-card"
            >
              <img src={cat.image} alt={cat.name} />
              <div className="category-overlay">
                <span>{cat.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* explore recipe button */}
      <section className="cta">
        <h3>Cook Smarter Eat Better</h3>
        <p>Discover new recipes and try your favorites.</p>
        <Link to="/recipes" className="cta-btn"> Explore Recipes </Link>
      </section>
    </div>

  );
};

export default Home;


