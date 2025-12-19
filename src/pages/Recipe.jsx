import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiSearch } from "react-icons/fi";
import "./recipe.css";

const Recipe = () => {
    const [query, setQuery] = useState("");
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedRecipe, setSelectedRecipe] = useState(null);

    const fetchIndianMeals = async (search = "") => {
        setLoading(true);
        try {
            let meals = [];

            if (search.trim()) {
                const res = await axios.get(
                    `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
                );
                meals = res.data.meals || [];
            } else {
                const res = await axios.get(
                    "https://www.themealdb.com/api/json/v1/1/filter.php?a=Indian"
                );

                meals = await Promise.all(
                    (res.data.meals || []).map(async (meal) => {
                        const detail = await axios.get(
                            `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`
                        );
                        return detail.data.meals[0];
                    })
                );
            }

            setRecipes(meals);
        } catch (err) {
            console.error(err);
            setRecipes([]);
        }
        setLoading(false);
    };


    useEffect(() => {
        fetchIndianMeals();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        fetchIndianMeals(query);
    };

    const closeModal = () => setSelectedRecipe(null);

    return (
        <div className="recipe-page">
            <h1>Ready for cooking..?</h1>
            <form className="search-box" onSubmit={handleSearch}>
                <FiSearch className="search-icon" />
                <input
                    type="text"
                    placeholder="Search recipes or ingredients..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>

            <div className="recipe-grid">
                {recipes.map((recipe) => (
                    <div
                        key={recipe.idMeal}
                        className="recipe-card"
                        onClick={() => setSelectedRecipe(recipe)}
                    >
                        <img src={recipe.strMealThumb} alt={recipe.strMeal} />
                        <div className="recipe-overlay">
                            <span>{recipe.strMeal}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {selectedRecipe && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={closeModal}>
                            &times;
                        </button>
                        <h2>{selectedRecipe.strMeal}</h2>
                        <img
                            src={selectedRecipe.strMealThumb}
                            alt={selectedRecipe.strMeal}
                        />
                        <p>
                            <strong>Category:</strong> {selectedRecipe.strCategory}
                        </p>
                       
                        <h4>Ingredients:</h4>
                        <ul>
                            {Array.from({ length: 20 }, (_, i) => i + 1)
                                .map((n) => selectedRecipe[`strIngredient${n}`])
                                .filter((ing) => ing && ing.trim() !== "")
                                .map((ing, idx) => (
                                    <li key={idx}>
                                        {ing} - {selectedRecipe[`strMeasure${idx + 1}`]}
                                    </li>
                                ))}
                        </ul>
                        <h4>Instructions:</h4>
                        <p>{selectedRecipe.strInstructions}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Recipe;
