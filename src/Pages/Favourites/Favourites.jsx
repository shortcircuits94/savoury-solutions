import React, { useState, useEffect } from "react";
import axios from "axios";
import FavouriteRecipes from "../../Components/FavouriteRecipes/FavouriteRecipes";

const FavouritesPage = () => {
  const [favourites, setFavourites] = useState([]);
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    fetchFavourites();
  }, []);

  const fetchFavourites = async () => {
    if (!token) {
      console.error("No auth token found");
      return;
    }

    try {
      const response = await axios.get(
        "http://localhost:5000/users/favourites",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setFavourites(response.data);
    } catch (error) {
      console.error("Error fetching favourites:", error);
    }
  };

  const handleFavouriteClick = async (recipeId) => {
    if (!token) {
      alert("Please log in to manage favourites.");
      return;
    }

    try {
      const isFavourite = favourites.some((fav) => fav.recipe_id === recipeId);

      if (isFavourite) {
        await axios.delete(
          `http://localhost:5000/users/favourites/${recipeId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setFavourites(favourites.filter((fav) => fav.recipe_id !== recipeId));
      } else {
        alert("This recipe is no longer a favourite.");
      }
    } catch (error) {
      console.error("Error handling favourite:", error);
      if (error.response?.status === 403) {
        alert("Please log in again to continue.");
        localStorage.removeItem("authToken");
        window.location.href = "/login";
      } else {
        alert("An error occurred while managing favourites.");
      }
    }
  };

  return (
    <div className="favourites-page">
      <FavouriteRecipes
        favourites={favourites}
        onFavouriteClick={handleFavouriteClick}
      />
    </div>
  );
};

export default FavouritesPage;
