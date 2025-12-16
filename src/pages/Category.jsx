import React from "react";
import { useParams } from "react-router-dom";
import Breakfast from "./Breakfast"; 
import Lunch from "./Lunch";
import Dinner from "./Dinner";
import Dessert from "./Dessert";


const Category = () => {
  const { name } = useParams();

  if (name === "breakfast") {
    return <Breakfast />;
  }
   if (name === "lunch") {
    return <Lunch/>;
  }
   if (name === "dinner") {
    return <Dinner/>;
  }
  if (name === "dessert") {
    return <Dessert/>;
  }

  return (
    <h2 style={{ textAlign: "center", marginTop: "50px" }}>
      Recipes coming soon...
    </h2>
  );
};

export default Category;
