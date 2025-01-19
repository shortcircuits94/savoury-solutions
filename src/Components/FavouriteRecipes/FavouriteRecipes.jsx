import React from "react";
import { Link } from "react-router-dom";
import "./FavouriteRecipes.scss";

const FavouriteRecipes = ({ favourites, onFavouriteClick }) => {
  return (
    <div className="favourites-recipes">
      <h2 className="favourites-recipes__title">Your Favourite Recipes</h2>
      <div className="favourites-recipes__card-container">
        {favourites.length > 0 ? (
          favourites.map((favourite) => (
            <div className="favourites-recipes__card" key={favourite.recipe_id}>
              <Link
                className="favourites-recipes__link"
                to={`/recipe/${favourite.recipe_id}`}
              >
                <img
                  src={favourite.recipe_image}
                  alt={favourite.recipe_name}
                  className="favourites-recipes__image"
                />
                <div className="favourites-recipes__content">
                  <h3 className="favourites-recipes__card-title">
                    {favourite.recipe_name}
                  </h3>
                </div>
              </Link>

              <button
                className="favourites-recipes__heart"
                onClick={() => onFavouriteClick(favourite.recipe_id)}
                aria-label="Toggle Favorite"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 471.701 471.701"
                  fill="#ff5722"
                >
                  <path d="M433.601,67.001c-24.7-24.7-57.4-38.2-92.3-38.2s-67.7,13.6-92.4,38.3l-12.9,12.9l-13.1-13.1c-24.7-24.7-57.6-38.4-92.5-38.4c-34.8,0-67.6,13.6-92.2,38.2c-24.7,24.7-38.3,57.5-38.2,92.4c0,34.9,13.7,67.6,38.4,92.3l187.8,187.8c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-3.9l188.2-187.5c24.7-24.7,38.3-57.5,38.3-92.4C471.801,124.501,458.301,91.701,433.601,67.001z" />
                </svg>
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

export default FavouriteRecipes;
