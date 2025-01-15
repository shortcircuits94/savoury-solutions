import React from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // Import axios to make HTTP requests
import "./HomeRecipes.scss";

const HomeRecipes = ({ recipes, isFiltered }) => {
  const addToFavorites = async (idMeal, strMeal, strMealThumb) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/favourites",
        {
          idMeal,
          strMeal,
          strMealThumb,
        }
      );
      alert(response.data.message); // Show a success message
    } catch (error) {
      console.error("Error adding to favorites:", error);
      alert("Failed to add recipe to favorites");
    }
  };

  return (
    <div className="home-recipes">
      <h2 className="home-recipes__title">
        {isFiltered
          ? "Filtered Recipes"
          : recipes.length > 0
          ? "Recipes"
          : "No Recipes Searched"}
      </h2>
      <div className="home-recipes__card-container">
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <div className="home-recipes__card" key={recipe.idMeal}>
              <Link
                className="home-recipes__link"
                to={`/recipe/${recipe.idMeal}`}
              >
                <img
                  src={recipe.strMealThumb}
                  alt={recipe.strMeal}
                  className="home-recipes__image"
                />
                <div className="home-recipes__content">
                  <h3 className="home-recipes__card-title">{recipe.strMeal}</h3>
                </div>
              </Link>
              <button
                className="home-recipes__heart"
                onClick={() =>
                  addToFavorites(
                    recipe.idMeal,
                    recipe.strMeal,
                    recipe.strMealThumb
                  )
                }
              >
                ❤️
              </button>
            </div>
          ))
        ) : (
          <p className="home-recipes__none">No recipes to display</p>
        )}
      </div>
    </div>
  );
};

export default HomeRecipes;
