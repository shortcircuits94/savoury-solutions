import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import FavouriteRecipes from "../../Components/FavouriteRecipes/FavouriteRecipes";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const FavouritesPage = () => {
  const [favourites, setFavourites] = useState([]);
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    fetchFavourites();
  }, []);

  const fetchFavourites = async () => {
    if (!token) {
      console.error("Token is missing, cannot fetch favourites.");
      return;
    }

    try {
      const response = await axios.get(`${API_BASE_URL}/users/favourites`, {
        headers: { Authorization: `Bearer ${token}` },
      });
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
        await axios.delete(`${API_BASE_URL}/users/favourites/${recipeId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post(
          `${API_BASE_URL}/users/favourites`,
          { recipe_id: recipeId },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }

      // Refresh the list
      fetchFavourites();
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
