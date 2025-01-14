Savoury Solutions

## Overview

Savoury Solutions is a dynamic web application that allows users to input a list of ingredients they have on hand and receive customized recipes that they can prepare. This app aims to minimize food waste and inspire users with creative meal ideas based on what is already available in their kitchen.

### Problem Space

Many people struggle to come up with meal ideas based on the ingredients they have at home, leading to wasted food and missed opportunities for creativity in the kitchen. Existing recipe platforms often require users to have specific ingredients, making them less flexible. This app solves these issues by tailoring recipes to the user’s available ingredients, promoting sustainability and convenience.

### User Profile

Primary Users: Home cooks, busy professionals, and students looking for quick and creative meal solutions.

Secondary Users: Individuals focused on reducing food waste or improving their cooking skills.

Users will need an intuitive interface to input their ingredients, browse through recipe suggestions, and save or share their favourite recipes.

### Features

Ingredient Input: Users can manually enter ingredients or select them from a predefined list.

Recipe Recommendations: The app will dynamically generate a list of recipes based on the selected ingredients.

Filters: Users can apply filters such as cuisine type, dietary restrictions, or preparation time.

Exclusion Feature: Users can exclude specific ingredients (e.g., allergens) from recipe recommendations.

Recipe Details: Each recipe includes step-by-step instructions, preparation time, and nutritional information.

Favourites: Users can save recipes for future reference.

Sharing: Users can share recipes via social media or email(more complicated). - Share through url http:..localhost:5000/recipe

## Implementation

### Tech Stack

Frontend: React, react-router-dom, Axios, BEM/SASS

Backend: Node.js, Express, Knex

Database: MySQL for storing user data, saved recipes, and ingredient lists.

API Testing: Postman

Other Tools: npm, browser development tools

### APIs

Recipe API: The Meal DB https://www.themealdb.com/api.php to fetch recipe data. This API provides access to a large database of recipes with advanced filtering options and ingredient-based searches.

A database to store user preferences and saved recipes.

### Sitemap

Home Page: Welcome message and ingredient input form and recipe results.

Recipe Details: Detailed view of a selected recipe.

Favourites: Page displaying saved recipes.

### Mockups

Mockups will include:

Ingredient input form on the home page.

Recipe results displayed as cards with images and brief descriptions.

Recipe details page with step-by-step instructions and nutritional information.

Favourites page with saved recipes.

### Data

Ingredients: List of user-inputted ingredients.

Recipes: Data from the BigOven API, including name, ingredients, instructions, preparation time, and dietary information.

Users: User data for saved recipes and preferences.

Start planning what database tables

### Endpoints

GET /api/recipes: Fetch recipes based on selected ingredients.

- Parameters: ingredients (array), exclude (array)
- Response: JSON object with a list of recipes.

POST /api/favourites: Save a recipe to the user's favourites.

- Body: Recipe ID
- Response: Success message.

GET /api/favourites: Retrieve a user's saved recipes.

- Response: JSON object with saved recipes.

DELETE /api/favourites/:id: Remove a recipe from favourites.

- Response: Success message.

## Roadmap

January 6 - 8:

- Set up the project environment and initial React components.
- Research and integrate the BigOven API.
- Begin building the ingredient input form.

January 9 - 11:

- Complete the ingredient input form and develop the recipe results page.
- Implement the recipe details page.
- Start backend setup using Express.

January 12 - 15:

- Develop the favourites page and backend endpoints.
- Add filters and exclusion features.
- Test API calls using Postman.

January 6 - 18:

- Implement BEM/SASS throughout the project for consistent styling, starting with the initial components and continuing as features are developed.
- Test the application thoroughly.
- Deploy the app and fix any bugs.

January 19:

- Final review and prepare the project for submission.

## Future Implementations

User Authentication: Allow users to create accounts and manage their saved recipes across devices.

Shopping List Generator: Suggest missing ingredients for selected recipes and generate a shopping list.

Offline Mode: Allow users to access saved recipes without an internet connection.

Custom Recipe Submission: Let users add their own recipes to the database.

notes:
dont prioritize Authentication if it goes well I can add it

(image.png)
