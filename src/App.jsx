import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import Home from "./Pages/Home/Home";
import RecipeDetails from "./Pages/RecipeDetails/RecipeDetails";
import Favourites from "./Pages/Favourites/Favourites";
import "./App.scss";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import Registration from "./Pages/Registration/Registration";
import Login from "./Pages/Login/Login";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipe/:id" element={<RecipeDetails />} />
        {isLoggedIn && <Route path="/favourites" element={<Favourites />} />}
        {!isLoggedIn && <Route path="/login" element={<Login />} />}
        {!isLoggedIn && (
          <Route path="/registration" element={<Registration />} />
        )}
      </Routes>

      <Footer />
    </>
  );
}

export default App;
