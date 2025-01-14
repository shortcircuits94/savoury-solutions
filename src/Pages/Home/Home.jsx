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
  }, []);

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
      setFilteredRecipes([]); // Reset to no recipes if no tags left
      setIsFiltered(false); // No filter applied
    } else {
      filterRecipesByTags(updatedTags); // Filter recipes by the remaining tags
    }
  };

  const filterRecipesByTags = (tags) => {
    let filtered = [];
    if (tags.length > 0) {
      // Filter logic based on tags goes here
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

      {/* Show filtered recipes */}
      <HomeRecipes recipes={filteredRecipes} />
    </div>
  );
};

export default Home;
