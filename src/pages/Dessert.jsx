import React, { useState } from "react";
import "./dessert.css";
import payasam from "../assets/payasam.jpg";
import gulabjamun from "../assets/gulabjamun.jpg";
import halwa from "../assets/halwa.jpg";
import icecream from "../assets/icecream.jpg";
import fruitcustard from "../assets/custard.jpg";
import laddu from "../assets/laddu.jpg";

const dessertItems = [
  {
    id: 1,
    name: "Payasam",
    image: payasam,
    ingredients: [
      "Milk",
      "Jaggery",
      "Rice vermicelli",
      "Cardamom",
      "Ghee",
      "Cashews"
    ],
    steps: [
      "Cook vermicelli in milk",
      "Add jaggery and stir well",
      "Simmer until thick",
      "Add cardamom powder",
      "Fry cashews in ghee and garnish"
    ],
  },
  {
    id: 2,
    name: "Gulab Jamun",
    image: gulabjamun,
    ingredients: [
      "Milk powder",
      "Flour",
      "Sugar",
      "Cardamom",
      "Ghee"
    ],
    steps: [
      "Prepare soft dough",
      "Shape into balls",
      "Deep fry until golden",
      "Soak in sugar syrup"
    ],
  },
  {
    id: 3,
    name: "Halwa",
    image: halwa,
    ingredients: [
      "Wheat flour",
      "Sugar",
      "Ghee",
      "Water",
      "Cashews"
    ],
    steps: [
      "Roast flour in ghee",
      "Add sugar syrup slowly",
      "Stir continuously",
      "Cook until thick",
      "Garnish with fried cashews"
    ],
  },
  {
    id: 4,
    name: "Ice Cream",
    image: icecream,
    ingredients: [
      "Milk",
      "Cream",
      "Sugar",
      "Vanilla essence"
    ],
    steps: [
      "Mix milk, cream, and sugar",
      "Freeze partially",
      "Whisk and refreeze",
      "Serve chilled"
    ],
  },
  {
    id: 5,
    name: "Fruit Custard",
    image: fruitcustard,
    ingredients: [
      "Milk",
      "Custard powder",
      "Sugar",
      "Mixed fruits"
    ],
    steps: [
      "Prepare custard with milk",
      "Cool completely",
      "Add chopped fruits",
      "Mix gently and chill"
    ],
  },
  {
    id: 6,
    name: "Laddu",
    image: laddu,
    ingredients: [
      "Gram flour",
      "Sugar",
      "Ghee",
      "Cardamom"
    ],
    steps: [
      "Roast flour in ghee",
      "Add sugar",
      "Mix well",
      "Shape into laddus"
    ],
  },
];

const Dessert = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <div className="dessert-page">
      <h1>Try some sweet..!</h1>

      <div className="dessert-grid">
        {dessertItems.map((item) => (
          <div
            key={item.id}
            className="dessert-card"
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

export default Dessert;
