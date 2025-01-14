// src/pages/RecipeDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import RecipeDetailsContent from "../../Components/RecipeDetailsContent/RecipeDetailsContent";

const RecipeDetails = () => {
  const { id } = useParams(); // Get the recipe ID from the URL
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        setRecipe(response.data.meals[0]); // Assuming the API returns a meals array with the first meal being the correct one
      } catch (error) {
        console.error("Error fetching recipe details:", error);
      }
    };

    fetchRecipeDetails();
  }, [id]); // Run this effect when the recipe ID changes

  if (!recipe) return <div>Loading...</div>; // Show a loading state while fetching data

  return (
    <div className="recipe-details-page">
      <RecipeDetailsContent recipe={recipe} />
    </div>
  );
};

export default RecipeDetails;
