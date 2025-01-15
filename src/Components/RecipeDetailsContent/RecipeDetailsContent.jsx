import React from "react";
import "./RecipeDetailsContent.scss";

const RecipeDetailsContent = ({ recipe }) => {
  const instructions = recipe.strInstructions.split("\n").filter(Boolean);
  const shareUrl = encodeURIComponent(window.location.href);

  return (
    <div className="recipe-details">
      <h1 className="recipe-details__title">{recipe.strMeal}</h1>
      <div className="recipe-details__content">
        <div className="recipe-details__image">
          <img src={recipe.strMealThumb} alt={recipe.strMeal} />

          {/* Sharing Buttons */}
          <div className="recipe-details__share-buttons">
            {/* Facebook Share Button */}
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on Facebook"
            >
              <button className="share-button">Share on Facebook</button>
            </a>

            {/* Instagram Share Button */}
            <a
              href={`https://www.instagram.com/?url=${shareUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on Instagram"
            >
              <button className="share-button">Share on Instagram</button>
            </a>
          </div>
        </div>

        <div className="recipe-details__info">
          <h3>Ingredients</h3>
          <ul className="recipe-details__ingredients">
            {Object.keys(recipe)
              .filter(
                (key) => key.startsWith("strIngredient") && recipe[key]?.trim()
              )
              .map((ingredientKey) => {
                const index = ingredientKey.replace("strIngredient", "");
                const measure = recipe[`strMeasure${index}`]?.trim();
                const ingredient = recipe[ingredientKey]?.trim();

                return (
                  <li key={ingredientKey}>
                    {measure ? `${measure} ` : ""}
                    {ingredient}
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
      <div className="recipe-details__instructions">
        <h3>Instructions</h3>
        {instructions.map((step, index) => (
          <p key={index}>{step}</p>
        ))}
      </div>
    </div>
  );
};

export default RecipeDetailsContent;
