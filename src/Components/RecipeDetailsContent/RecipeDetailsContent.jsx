import "./RecipeDetailsContent.scss";

const RecipeDetailsContent = ({ recipe, isFavourite, onFavouriteClick }) => {
  const instructions = recipe.strInstructions.split("\n").filter(Boolean);
  const shareUrl = encodeURIComponent(window.location.href);

  return (
    <div className="recipe-details">
      <h1 className="recipe-details__title">{recipe.strMeal}</h1>
      <div className="recipe-details__content">
        <div className="recipe-details__image">
          <img src={recipe.strMealThumb} alt={recipe.strMeal} />
          <button
            className="recipe-details__heart"
            onClick={() =>
              onFavouriteClick(
                recipe.idMeal,
                recipe.strMeal,
                recipe.strMealThumb
              )
            }
            aria-label="Toggle Favourite"
          >
            {isFavourite ? (
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
          <div className="recipe-details__share-buttons">
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on Facebook"
            >
              <button className="share-button">Share on Facebook</button>
            </a>
            <a
              href={`https://www.pinterest.com/pin/create/button/?url=${shareUrl}&media=${encodeURIComponent(
                recipe.strMealThumb
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on Pinterest"
            >
              <button className="share-button">Share on Pinterest</button>
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
