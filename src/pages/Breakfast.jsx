import React, { useState } from "react";
import "./breakfast.css";
import putt from "../assets/putt.jpg";
import upma from "../assets/upma.jpg";
import dosa from "../assets/dosa.jpg";
import idiyappam from "../assets/idiyappam.jpg";
import idali from "../assets/idali.jpg";
import vada from "../assets/vada.jpg";
import puri from "../assets/puri.jpg";
import appam from "../assets/appam.jpg";

const breakfastData = [
    {
        id: 1,
        name: "Puttu",
        image: putt,
        ingredients: [
            "Rice flour (Puttu podi)",
            "Grated coconut",
            "Salt (to taste)",
            "Water",
            "Kadala curry (for serving)",
            "Ripe banana (optional)"
        ],
        steps: [
            "Take rice flour in a bowl and add salt",
            "Sprinkle water little by little and mix to get a moist, crumbly texture",
            "Fill puttu maker by layering grated coconut and rice flour",
            "Steam for 5–7 minutes until the puttu is cooked",
            "Serve hot with kadala curry or ripe banana"
        ],

    },
    {
        id: 2,
        name: "Upma",
        image: upma,
        ingredients: [
            "Rava (semolina)",
            "Onion (finely chopped)",
            "Green chilli",
            "Ginger",
            "Mustard seeds",
            "Curry leaves",
            "Water",
            "Salt",
            "Oil or ghee"
        ],
        steps: [
            "Dry roast rava until aromatic and keep aside",
            "Heat oil or ghee in a pan and splutter mustard seeds",
            "Add curry leaves, ginger, green chilli, and onion; sauté well",
            "Add water and salt, bring to a boil",
            "Slowly add roasted rava while stirring continuously",
            "Cook on low flame until soft and fluffy"
        ],
    },

    {
        id: 3,
        name: "Dosa",
        image: dosa,
        ingredients: [
            "Raw rice",
            "Urad dal",
            "Fenugreek seeds",
            "Salt",
            "Water",
            "Oil or ghee"
        ],
        steps: [
            "Soak rice, urad dal, and fenugreek seeds for 6–8 hours",
            "Grind to a smooth batter adding water as needed",
            "Ferment the batter overnight",
            "Heat a dosa tawa and lightly grease it",
            "Pour batter and spread thin in a circular motion",
            "Drizzle oil and cook until crisp and golden",
            "Serve hot with sambar and coconut chutney"
        ],
    },

    {
        id: 4,
        name: "Idiyappam",
        image: idiyappam,
        ingredients: [
            "Rice flour",
            "Grated coconut",
            "Salt",
            "Water"
        ],
        steps: [
            "Boil water with salt",
            "Add boiling water gradually to rice flour and mix into soft dough",
            "Fill dough into idiyappam press",
            "Press dough into circular nests on idli plates",
            "Steam for 5–7 minutes until cooked",
            "Serve hot with coconut milk, stew, or kadala curry"
        ],
    },
    {
        id: 5,
        name: "Idli",
        image: idali,
        ingredients: [
            "Idli rice",
            "Urad dal",
            "Fenugreek seeds",
            "Salt",
            "Water"
        ],
        steps: [
            "Wash and soak idli rice and urad dal separately for 4–6 hours",
            "Grind urad dal into a smooth fluffy batter",
            "Grind rice into a slightly coarse batter",
            "Mix both batters together with salt",
            "Allow the batter to ferment overnight",
            "Grease idli moulds and pour batter into them",
            "Steam for 10–12 minutes until soft and cooked",
            "Serve hot with sambar and coconut chutney"
        ],
    },
    {
        id: 6,
        name: "Uzhunnu Vada",
        image: vada,
        ingredients: [
            "Urad dal",
            "Green chilli",
            "Ginger",
            "Curry leaves",
            "Onion (optional)",
            "Black pepper (optional)",
            "Salt",
            "Oil (for deep frying)"
        ],
        steps: [
            "Soak urad dal for 4–5 hours",
            "Grind into a thick, fluffy batter without adding much water",
            "Add chopped green chilli, ginger, curry leaves, onion, pepper, and salt",
            "Heat oil in a deep pan",
            "Wet your hands, shape batter into vadas with a hole in the center",
            "Deep fry on medium heat until golden and crisp",
            "Drain excess oil and serve hot with sambar or coconut chutney"
        ],
    },
    {
        id: 7,
        name: "Puri",
        image: puri,
        ingredients: [
            "Wheat flour (atta)",
            "Salt",
            "Water",
            "Oil (for deep frying)"
        ],
        steps: [
            "Take wheat flour and salt in a bowl",
            "Add water little by little and knead into a stiff dough",
            "Cover and rest the dough for 15–20 minutes",
            "Divide dough into small balls and roll into small circles",
            "Heat oil in a deep pan",
            "Deep fry the poori until it puffs up and turns golden",
            "Remove and drain excess oil",
            "Serve hot with potato masala or chana curry"
        ],
    },
    {
        id: 8,
        name: "Appam",
        image: appam,
        ingredients: [
            "Raw rice",
            "Grated coconut",
            "Cooked rice",
            "Yeast",
            "Sugar",
            "Salt",
            "Water"
        ],
        steps: [
            "Soak raw rice for 4–5 hours",
            "Grind soaked rice with grated coconut and cooked rice into a smooth batter",
            "Dissolve yeast and sugar in warm water and add to the batter",
            "Add salt and mix well",
            "Allow the batter to ferment for 8–10 hours",
            "Heat appam pan and pour a ladle of batter",
            "Swirl the pan to spread batter thin on the sides",
            "Cover and cook until edges are crisp and center is soft",
            "Serve hot with vegetable stew or egg curry"
        ],
    },




];

const Breakfast = () => {
    const [selectedRecipe, setSelectedRecipe] = useState(null);

    return (
        <div className="breakfast-page">
            <h1>Breakfast Recipes</h1>

            <div className="breakfast-grid">
                {breakfastData.map((item) => (
                    <div
                        key={item.id}
                        className="breakfast-card"
                        onClick={() => setSelectedRecipe(item)}
                    >
                        <img src={item.image} alt={item.name} />
                        <h3>{item.name}</h3>
                    </div>
                ))}
            </div>

            {/* MODAL */}
            {selectedRecipe && (
                <div
                    className="modal-overlay"
                    onClick={() => setSelectedRecipe(null)}
                >
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <button
                            className="close-btn"
                            onClick={() => setSelectedRecipe(null)}
                        >
                            ✖
                        </button>

                        <h2>{selectedRecipe.name}</h2>

                        <h4>Ingredients</h4>
                        <ul>
                            {selectedRecipe.ingredients.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>

                        <h4>How to Make</h4>
                        <ol>
                            {selectedRecipe.steps.map((step, index) => (
                                <li key={index}>{step}</li>
                            ))}
                        </ol>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Breakfast;
