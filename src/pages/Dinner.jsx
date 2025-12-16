import React, { useState } from "react";
import "./dinner.css";
import chapathi from "../assets/chapathi.jpg";
import mealss from "../assets/mealss.jpg";
import wheat from "../assets/wheat.jpg";
import pulao from "../assets/pulao.jpg";
import fry from "../assets/fry.jpg";
import salad from "../assets/salad.jpg";

const dinnerItems = [
  {
    id: 20,
    name: "Chapathi",
    image: chapathi,
    ingredients: ["Wheat flour", "Water", "Salt"],
    steps: [
      "Mix wheat flour, salt, and water to form soft dough",
      "Rest the dough for 15 minutes",
      "Roll into thin circles",
      "Cook on hot tawa until both sides puff",
    ],
  },
  {
    id: 21,
    name: "Normal Meals",
    image: mealss,
    ingredients: ["Rice", "Sambar", "Rasam", "Vegetable curry", "Curd"],
    steps: [
      "Cook rice until fluffy",
      "Prepare sambar and rasam",
      "Make vegetable curry",
      "Serve rice with all sides",
    ],
  },
  {
    id: 22,
    name: "Wheat Dosa",
    image: wheat,
    ingredients: [
      "Wheat flour",
      "Rice flour",
      "Cumin seeds",
      "Salt",
      "Water",
    ],
    steps: [
      "Mix all ingredients into thin batter",
      "Heat tawa and pour batter",
      "Drizzle oil around edges",
      "Cook until crisp",
    ],
  },
  {
    id: 23,
    name: "Pulao",
    image: pulao,
    ingredients: [
      "Basmati rice",
      "Mixed vegetables",
      "Whole spices",
      "Ghee",
      "Salt",
    ],
    steps: [
      "Soak and wash rice",
      "Saute spices and vegetables in ghee",
      "Add rice and water",
      "Cook until rice is fluffy",
    ],
  },
  {
    id: 24,
    name: "Fried Rice",
    image: fry,
    ingredients: ["Cooked rice", "Vegetables", "Soy sauce", "Pepper", "Oil"],
    steps: [
      "Heat oil in a pan",
      "Saute vegetables on high flame",
      "Add cooked rice and sauces",
      "Toss well and serve hot",
    ],
  },
  {
    id: 25,
    name: "Salad",
    image: salad,
    ingredients: [
      "Cucumber",
      "Tomato",
      "Carrot",
      "Lettuce",
      "Salt",
      "Lemon juice",
    ],
    steps: [
      "Wash and chop vegetables",
      "Mix in a bowl",
      "Add salt and lemon juice",
      "Toss and serve fresh",
    ],
  },
];

const Dinner = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <div className="dinner-page">
      <h1>Dinner menu</h1>

      <div className="dinner-grid">
        {dinnerItems.map((item) => (
          <div
            key={item.id}
            className="dinner-card"
            onClick={() => setSelectedItem(item)}
          >
            <img src={item.image} alt={item.name} />
            <h3>{item.name}</h3>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {selectedItem && (
        <div className="modal-overlay" onClick={() => setSelectedItem(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="close-btn"
              onClick={() => setSelectedItem(null)}
            >
              ✖
            </button>

            <h2>{selectedItem.name}</h2>

            <h4>Ingredients</h4>
            <ul>
              {selectedItem.ingredients.map((ing, i) => (
                <li key={i}>{ing}</li>
              ))}
            </ul>

            <h4>Steps</h4>
            <ol>
              {selectedItem.steps.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dinner;
