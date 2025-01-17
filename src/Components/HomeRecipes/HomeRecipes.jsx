import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./HomeRecipes.scss";

const HomeRecipes = ({ recipes, isFiltered }) => {
  const [favourites, setFavourites] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/users/favourites",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setFavourites(response.data.map((fav) => fav.idMeal));
      } catch (error) {
        console.error("Error fetching favourites:", error);
      }
    };

    fetchFavourites();
  }, [token]);

  const handleFavouriteClick = async (idMeal, strMeal, strMealThumb) => {
    try {
      console.log("Token: ", token);
      if (favourites.includes(idMeal)) {
        await axios.delete(`http://localhost:5000/users/favourites/${idMeal}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFavourites(favourites.filter((id) => id !== idMeal));
      } else {
        await axios.post(
          "http://localhost:5000/users/favourites",
          {
            idMeal,
            strMeal,
            strMealThumb,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setFavourites([...favourites, idMeal]);
      }
    } catch (error) {
      console.error("Error handling favourite:", error);
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
                  handleFavouriteClick(
                    recipe.idMeal,
                    recipe.strMeal,
                    recipe.strMealThumb
                  )
                }
                aria-label="Toggle Favourite"
              >
                {favourites.includes(recipe.idMeal) ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="#ff5846"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#ff5846"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                )}
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
