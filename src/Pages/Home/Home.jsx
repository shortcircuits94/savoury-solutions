import { useState, useEffect } from "react";
import axios from "axios";
import HomeHeader from "../../Components/HomeHeader/HomeHeader";
import HomeRecipes from "../../Components/HomeRecipes/HomeRecipes";
import "./Home.scss";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [randomRecipes, setRandomRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [favourites, setFavourites] = useState([]);
  const token = localStorage.getItem("authToken");

  useEffect(() => {
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

    fetchRandomRecipes();

    fetchFavourites();
  }, []);

  const fetchRandomRecipes = () => {
    const randomRecipeRequests = Array.from({ length: 6 }, () =>
      axios.get("https://www.themealdb.com/api/json/v1/1/random.php")
    );

    Promise.all(randomRecipeRequests)
      .then((responses) => {
        const recipes = responses.map((response) => response.data.meals[0]);
        setRandomRecipes(recipes);
      })
      .catch((error) => console.error("Error fetching random recipes:", error));
  };

  const fetchFavourites = () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.error("No token found");
      return;
    }

    axios
      .get(`${API_BASE_URL}/users/favourites`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setFavourites(response.data.map((fav) => fav.recipeId));
      })
      .catch((error) => {
        if (error.response && error.response.status === 403) {
          console.error("Unauthorized access - please login again");
        } else {
          console.error("Error fetching favourites:", error);
        }
      });
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
  const handleFavouriteClick = async (idMeal, strMeal, strMealThumb) => {
    if (favourites.includes(idMeal)) {
      setFavourites(favourites.filter((id) => id !== idMeal));
      try {
        await axios.delete(`${API_BASE_URL}/users/favourites/${idMeal}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (error) {
        console.error("Error removing favourite:", error);
      }
    } else {
      setFavourites([...favourites, idMeal]);
      try {
        const requestData = {
          recipe_id: idMeal,
          recipe_name: strMeal,
          recipe_image: strMealThumb,
        };
        await axios.post(`${API_BASE_URL}/users/favourites`, requestData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (error) {
        console.error("Error adding favourite:", error);
      }
    }
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

      {!isFiltered && randomRecipes.length > 0 && (
        <HomeRecipes
          recipes={randomRecipes}
          favourites={favourites}
          onFavouriteClick={handleFavouriteClick}
        />
      )}

      <HomeRecipes
        recipes={filteredRecipes}
        isFiltered={isFiltered}
        favourites={favourites}
        onFavouriteClick={handleFavouriteClick}
      />
    </div>
  );
};

export default Home;
