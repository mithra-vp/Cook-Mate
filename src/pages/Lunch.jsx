import React, { useState } from "react";
import "./lunch.css";

import meals from "../assets/meals.jpg";
import biriyani from "../assets/banner4.jpg";
import sambar from "../assets/sambar.jpg";
import fishcurry from "../assets/fish.jpg";
import aviyal from "../assets/aviyal.jpg";
import saambar from "../assets/saambar.jpg";
import rasam from "../assets/rasam.jpg";

const lunchData = [
    {
        id: 1,
        name: "Kerala Meals",
        image: meals,
        ingredients: [
            "Rice",
            "Sambar",
            "Avial",
            "Thoran",
            "Rasam",
            "Papadam",
            "Pickle"
        ],
        steps: [
            "Cook rice and keep warm",
            "Prepare sambar, rasam, and avial",
            "Make vegetable thoran",
            "Fry papadam",
            "Serve all items together on a banana leaf"
        ],
    },
    {
        id: 2,
        name: "Chicken Biriyani",
        image: biriyani,
        ingredients: [
            "Basmati rice",
            "Chicken",
            "Onion",
            "Tomato",
            "Biriyani masala",
            "Ghee",
            "Whole spices"
        ],
        steps: [
            "Cook chicken with spices",
            "Cook rice separately till 70% done",
            "Layer rice and chicken",
            "Dum cook for 20 minutes",
            "Serve hot with raita"
        ],
    },
    {
        id: 3,
        name: "Sambar Rice",
        image: sambar,
        ingredients: [
            "Rice",
            "Toor dal",
            "Vegetables",
            "Sambar powder",
            "Tamarind",
            "Salt"
        ],
        steps: [
            "Cook rice and dal",
            "Cook vegetables with tamarind",
            "Add sambar powder and dal",
            "Mix with rice and serve hot"
        ],
    },
    {
        id: 4,
        name: "Fish Curry",
        image: fishcurry,
        ingredients: [
            "Fish",
            "Kudampuli",
            "Chilli powder",
            "Turmeric",
            "Coconut oil",
            "Curry leaves"
        ],
        steps: [
            "Prepare masala with spices",
            "Add fish and kudampuli",
            "Simmer till cooked",
            "Finish with coconut oil and curry leaves"
        ],
    },

    {
        id: 5,
        name: "Aviyal",
        image: aviyal,
        ingredients: [
            "Mixed vegetables",
            "Grated coconut",
            "Green chillies",
            "Cumin seeds",
            "Turmeric powder",
            "Curd",
            "Coconut oil",
            "Curry leaves"
        ],
        steps: [
            "Cut vegetables and cook with turmeric and salt",
            "Grind coconut, green chillies, and cumin to a coarse paste",
            "Add ground paste to cooked vegetables",
            "Mix in curd gently without boiling",
            "Finish with coconut oil and curry leaves"
        ],
    },
    {
        id: 6,
        name: "Sambar",
        image: saambar,
        ingredients: [
            "Toor dal",
            "Mixed vegetables",
            "Sambar powder",
            "Tamarind",
            "Turmeric powder",
            "Mustard seeds",
            "Dry red chillies",
            "Curry leaves",
            "Coconut oil"
        ],
        steps: [
            "Cook toor dal until soft",
            "Cook vegetables with turmeric and salt",
            "Add tamarind water and sambar powder",
            "Mix in cooked dal and simmer",
            "Prepare tempering with coconut oil, mustard, red chillies, and curry leaves",
            "Add tempering to sambar and serve hot"
        ],
    },
    
    {
        id: 7,
        name: "Rasam",
        image: rasam,
        ingredients: [
            "Tamarind",
            "Rasam powder",
            "Tomato",
            "Turmeric powder",
            "Black pepper",
            "Cumin seeds",
            "Mustard seeds",
            "Dry red chillies",
            "Curry leaves",
            "Coconut oil"
        ],
        steps: [
            "Extract tamarind water and add chopped tomato",
            "Add turmeric, rasam powder, pepper, and cumin",
            "Simmer gently without boiling",
            "Prepare tempering with coconut oil, mustard seeds, red chillies, and curry leaves",
            "Add tempering to rasam and serve hot"
        ],
    },


];

const Lunch = () => {
    const [selectedRecipe, setSelectedRecipe] = useState(null);

    return (
        <div className="lunch-page">
            <h1>Ready for lunch?</h1>

            <div className="lunch-grid">
                {lunchData.map((item) => (
                    <div
                        key={item.id}
                        className="lunch-card"
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

export default Lunch;
