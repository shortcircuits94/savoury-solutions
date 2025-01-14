import React from "react";
import { Link } from "react-router-dom";
import "./HomeRecipes.scss";

const HomeRecipes = ({ recipes, isFiltered }) => {
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
              <button className="home-recipes__heart">❤️</button>
            </div>
          ))
        ) : (
          <p>No recipes to display</p>
        )}
      </div>
    </div>
  );
};

export default HomeRecipes;
