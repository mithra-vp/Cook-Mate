import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios"
import "./recipe.css";

const Category = () => {
  const { name } = useParams();
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {

        const categoryName = name.charAt(0).toUpperCase() + name.slice(1);

        const res = await api.get(`/recipes?category=${categoryName}`);
        setRecipes(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchRecipes();
  }, [name]);

  return (
    <div className="recipe-page">
      <h2>{name} Recipes</h2>

      {recipes.length === 0 && <p style={{ textAlign: 'center' }}>No recipes found for this category.</p>}

      <div className="recipe-grid">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="recipe-card">
            <img src={recipe.image} alt={recipe.title} />
            <div className="recipe-overlay">
              <span>{recipe.title}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
