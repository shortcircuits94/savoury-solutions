// src/pages/RecipeDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import RecipeDetailsContent from "../../Components/RecipeDetailsContent/RecipeDetailsContent";

const RecipeDetails = () => {
  const [favourites, setFavourites] = useState([]); // Store the user's favorites
  const { id } = useParams(); // Get the recipe ID from the URL
  const [recipe, setRecipe] = useState(null);
  const fetchFavourites = () => {
    const token = localStorage.getItem("authToken");
    if (token) {
      axios
        .get("http://localhost:5000/users/favourites", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setFavourites(response.data.map((fav) => fav.recipeId)); // Store favorite recipe IDs
        })
        .catch((error) => console.error("Error fetching favourites:", error));
    }
  };

  const handleFavouriteClick = async (idMeal) => {
    const token = localStorage.getItem("authToken");
    try {
      // Check if the meal is already in the favorites
      if (favourites.includes(idMeal)) {
        // Remove from favorites
        await axios.delete(`http://localhost:5000/users/favourites/${idMeal}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setFavourites(favourites.filter((id) => id !== idMeal)); // Update state
      } else {
        // Add to favorites
        await axios.post(
          "http://localhost:5000/users/favourites",
          { recipeId: idMeal },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setFavourites([...favourites, idMeal]); // Update state
      }
    } catch (error) {
      console.error("Error handling favourite:", error);
    }
  };

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        setRecipe(response.data.meals[0]);
      } catch (error) {
        console.error("Error fetching recipe details:", error);
      }
    };

    fetchRecipeDetails();
  }, [id]);

  if (!recipe) return <div>Loading...</div>;

  return (
    <div className="recipe-details-page">
      <RecipeDetailsContent
        recipe={recipe}
        favourites={favourites}
        onFavouriteClick={handleFavouriteClick}
      />
    </div>
  );
};

export default RecipeDetails;
