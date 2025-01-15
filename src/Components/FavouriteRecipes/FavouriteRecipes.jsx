import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./FavouriteRecipes.scss";

const FavouritesRecipes = () => {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const response = await axios.get("http://localhost:5000/favourites");
        setFavourites(response.data);
      } catch (error) {
        console.error("Error fetching favourites:", error);
      }
    };

    fetchFavourites();
  }, []);

  const handleFavoriteClick = async (idMeal, strMeal, strMealThumb) => {
    try {
      if (favourites.some((fav) => fav.idMeal === idMeal)) {
        await axios.delete(`http://localhost:5000/favourites/${idMeal}`);
        setFavourites(favourites.filter((fav) => fav.idMeal !== idMeal));
      } else {
        await axios.post("http://localhost:5000/favourites", {
          idMeal,
          strMeal,
          strMealThumb,
        });
        setFavourites([...favourites, { idMeal, strMeal, strMealThumb }]);
      }
    } catch (error) {
      console.error("Error handling favourite:", error);
    }
  };

  return (
    <div className="favourites-recipes">
      <h2 className="favourites-recipes__title">Your Favourite Recipes</h2>
      <div className="favourites-recipes__card-container">
        {favourites.length > 0 ? (
          favourites.map((favourite) => (
            <div className="favourites-recipes__card" key={favourite.idMeal}>
              <Link
                className="favourites-recipes__link"
                to={`/recipe/${favourite.idMeal}`}
              >
                <img
                  src={favourite.strMealThumb}
                  alt={favourite.strMeal}
                  className="favourites-recipes__image"
                />
                <div className="favourites-recipes__content">
                  <h3 className="favourites-recipes__card-title">
                    {favourite.strMeal}
                  </h3>
                </div>
              </Link>

              <button
                className="favourites-recipes__heart"
                onClick={() =>
                  handleFavoriteClick(
                    favourite.idMeal,
                    favourite.strMeal,
                    favourite.strMealThumb
                  )
                }
                aria-label="Toggle Favorite"
              >
                {favourites.some((fav) => fav.idMeal === favourite.idMeal) ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 471.701 471.701"
                    fill="#ff5722"
                    stroke="none"
                  >
                    <path
                      d="M433.601,67.001c-24.7-24.7-57.4-38.2-92.3-38.2s-67.7,13.6-92.4,38.3l-12.9,12.9l-13.1-13.1
                        c-24.7-24.7-57.6-38.4-92.5-38.4c-34.8,0-67.6,13.6-92.2,38.2c-24.7,24.7-38.3,57.5-38.2,92.4c0,34.9,13.7,67.6,38.4,92.3
                        l187.8,187.8c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-3.9l188.2-187.5c24.7-24.7,38.3-57.5,38.3-92.4
                        C471.801,124.501,458.301,91.701,433.601,67.001z M414.401,232.701l-178.7,178l-178.3-178.3c-19.6-19.6-30.4-45.6-30.4-73.3
                        s10.7-53.7,30.3-73.2c19.5-19.5,45.5-30.3,73.1-30.3c27.7,0,53.8,10.8,73.4,30.4l22.6,22.6c5.3,5.3,13.8,5.3,19.1,0l22.4-22.4
                        c19.6-19.6,45.7-30.4,73.3-30.4c27.6,0,53.6,10.8,73.2,30.3c19.6,19.6,30.3,45.6,30.3,73.3
                        C444.801,187.101,434.001,213.101,414.401,232.701z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 471.701 471.701"
                    fill="none"
                    stroke="#ff5722"
                    strokeWidth="20"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path
                      d="M433.601,67.001c-24.7-24.7-57.4-38.2-92.3-38.2s-67.7,13.6-92.4,38.3l-12.9,12.9l-13.1-13.1
                        c-24.7-24.7-57.6-38.4-92.5-38.4c-34.8,0-67.6,13.6-92.2,38.2c-24.7,24.7-38.3,57.5-38.2,92.4c0,34.9,13.7,67.6,38.4,92.3
                        l187.8,187.8c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-3.9l188.2-187.5c24.7-24.7,38.3-57.5,38.3-92.4
                        C471.801,124.501,458.301,91.701,433.601,67.001z M414.401,232.701l-178.7,178l-178.3-178.3c-19.6-19.6-30.4-45.6-30.4-73.3
                        s10.7-53.7,30.3-73.2c19.5-19.5,45.5-30.3,73.1-30.3c27.7,0,53.8,10.8,73.4,30.4l22.6,22.6c5.3,5.3,13.8,5.3,19.1,0l22.4-22.4
                        c19.6-19.6,45.7-30.4,73.3-30.4c27.6,0,53.6,10.8,73.2,30.3c19.6,19.6,30.3,45.6,30.3,73.3
                        C444.801,187.101,434.001,213.101,414.401,232.701z"
                    />
                  </svg>
                )}
              </button>
            </div>
          ))
        ) : (
          <p className="favourites-recipes__none">No favourites added</p>
        )}
      </div>
    </div>
  );
};

export default FavouritesRecipes;
