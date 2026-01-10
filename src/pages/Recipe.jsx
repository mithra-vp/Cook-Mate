import React, { useState, useEffect } from "react";
import api from "../api/axios";
import { FiSearch } from "react-icons/fi";
import "./recipe.css";

const Recipe = () => {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const fetchRecipes = async () => {
    setLoading(true);
    try {
      const res = await api.get("/recipes");
      console.log("RECIPES ", res.data);
      setRecipes(res.data);
    } catch (err) {
      console.error("ERROR ", err);
      setRecipes([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(query.toLowerCase())
  );

  const closeModal = () => setSelectedRecipe(null);

  return (
    <div className="recipe-page">
      <h1>Ready for cooking..?</h1>

      <form className="search-box" onSubmit={handleSearch}>
        <FiSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search recipes..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading...</p>}
      {!loading && filteredRecipes.length === 0 && <p>No recipes found</p>}

      <div className="recipe-grid">
        {filteredRecipes.map((recipe) => (
          <div
            key={recipe.id}
            className="recipe-card"
            onClick={() => setSelectedRecipe(recipe)}
          >
            <img
              src={recipe.image}
              alt={recipe.title}
            />
            <div className="recipe-overlay">
              <span>{recipe.title}</span>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {selectedRecipe && (
        <div className="modal-overlay" onClick={closeModal}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close" onClick={closeModal}>
              &times;
            </button>

            <h2>{selectedRecipe.title}</h2>
            <img
              src={selectedRecipe.image}
              alt={selectedRecipe.title}
            />

            <p>
              <strong>Category:</strong> {selectedRecipe.category}
            </p>

            <h4>Ingredients:</h4>
            <ul>
              {selectedRecipe.ingredients && selectedRecipe.ingredients.map((item, idx) => (
                <li key={idx}>
                  {item.name} {item.measure ? `- ${item.measure}` : ''}
                </li>
              ))}
            </ul>

            <h4>Instructions:</h4>
            <p>{selectedRecipe.instructions}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Recipe;
