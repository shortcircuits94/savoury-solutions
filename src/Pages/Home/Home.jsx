import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import HomeHeader from "../../Components/HomeHeader/HomeHeader";
import HomeRecipes from "../../Components/HomeRecipes/HomeRecipes";
import "./Home.scss";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [randomRecipes, setRandomRecipes] = useState([]); // Store multiple random recipes
  const [categories, setCategories] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);

  useEffect(() => {
    // Fetch categories
    axios
      .get("https://www.themealdb.com/api/json/v1/1/categories.php")
      .then((response) => {
        setCategories(
          response.data.categories.filter((cat) =>
            ["Vegan", "Vegetarian"].includes(cat.strCategory)
          )
        );
      })
      .catch((error) => console.error("Error fetching categories:", error));

    // Fetch 6 random recipes when the page loads
    fetchRandomRecipes();
  }, []);

  const fetchRandomRecipes = () => {
    // Make 6 separate API calls to get random recipes
    const randomRecipeRequests = Array.from({ length: 6 }, () =>
      axios.get("https://www.themealdb.com/api/json/v1/1/random.php")
    );

    // Use Promise.all to fetch all random recipes at once
    Promise.all(randomRecipeRequests)
      .then((responses) => {
        const recipes = responses.map((response) => response.data.meals[0]);
        setRandomRecipes(recipes); // Store 6 random recipes
      })
      .catch((error) => console.error("Error fetching random recipes:", error));
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleTagAdd = (tag) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleTagRemove = (tag) => {
    const updatedTags = selectedTags.filter((t) => t !== tag);
    setSelectedTags(updatedTags);
    if (updatedTags.length === 0) {
      setFilteredRecipes([]);
      setIsFiltered(false);
    } else {
      filterRecipesByTags(updatedTags);
    }
  };

  const filterRecipesByTags = (tags) => {
    let filtered = [];
    if (tags.length > 0) {
      filtered = filtered.filter((recipe) =>
        tags.every((tag) => recipe.tags.includes(tag))
      );
    }
    setFilteredRecipes(filtered);
    setIsFiltered(true);
  };

  const handleSearch = () => {
    if (searchTerm) {
      axios
        .get(
          `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchTerm}`
        )
        .then((response) => {
          setFilteredRecipes(response.data.meals || []);
          handleTagAdd(searchTerm);
          setSearchTerm("");
          setIsFiltered(true);
        })
        .catch((error) =>
          console.error("Error fetching filtered recipes:", error)
        );
    }
  };

  const handleCategorySelect = (category) => {
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
      .then((response) => {
        setFilteredRecipes(response.data.meals || []);
        handleTagAdd(category);
        setIsFiltered(true);
      })
      .catch((error) =>
        console.error("Error fetching category recipes:", error)
      );
  };

  return (
    <div className="home">
      <HomeHeader
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        onSearch={handleSearch}
        selectedTags={selectedTags}
        onTagRemove={handleTagRemove}
        categories={categories}
        onCategorySelect={handleCategorySelect}
      />

      {/* Display 6 random recipes */}
      {!isFiltered && randomRecipes.length > 0 && (
        <HomeRecipes recipes={randomRecipes} />
      )}

      {/* Show filtered recipes */}
      <HomeRecipes recipes={filteredRecipes} />
    </div>
  );
};

export default Home;
