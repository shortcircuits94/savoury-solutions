import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import RecipeDetailsContent from "../../Components/RecipeDetailsContent/RecipeDetailsContent";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const RecipeDetails = () => {
  const [favourites, setFavourites] = useState([]);
  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const token = localStorage.getItem("authToken");

  const fetchFavourites = async () => {
    if (!token) {
      setFavourites([]);
      return;
    }

    try {
      const response = await axios.get(`${API_BASE_URL}/favourites`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFavourites(response.data);
    } catch (error) {
      console.error("Error fetching favourites:", error);
      setFavourites([]);
    }
  };

  const isRecipeInFavorites = (recipeId) => {
    return favourites.some((fav) => String(fav.recipe_id) === String(recipeId));
  };

  const handleFavouriteClick = async (idMeal, strMeal, strMealThumb) => {
    if (!token) {
      alert("Please log in to save favorites");
      return;
    }

    try {
      if (isRecipeInFavorites(idMeal)) {
        await axios.delete(`${API_BASE_URL}/favourites/${idMeal}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFavourites((prevFavourites) =>
          prevFavourites.filter(
            (fav) => String(fav.recipe_id) !== String(idMeal)
          )
        );
      } else {
        const requestData = {
          recipe_id: idMeal,
          recipe_name: strMeal,
          recipe_image: strMealThumb,
        };

        const response = await axios.post(
          "${API_BASE_URL}/users/favourites",
          requestData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data) {
          const newFavorite = {
            recipe_id: idMeal,
            recipe_name: strMeal,
            recipe_image: strMealThumb,
          };
          setFavourites((prevFavourites) => [...prevFavourites, newFavorite]);
        }
      }
    } catch (error) {
      console.error("Error handling favourite:", error);
      await fetchFavourites();
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const recipeResponse = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );

        if (recipeResponse.data.meals) {
          setRecipe(recipeResponse.data.meals[0]);
        }

        await fetchFavourites();
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (!recipe) return <div>Loading...</div>;

  return (
    <div className="recipe-details-page">
      <RecipeDetailsContent
        recipe={recipe}
        isFavourite={isRecipeInFavorites(recipe.idMeal)}
        onFavouriteClick={handleFavouriteClick}
      />
    </div>
  );
};

export default RecipeDetails;
