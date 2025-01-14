import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import Home from "./Pages/Home/Home";
import RecipeDetails from "./Pages/RecipeDetails/RecipeDetails";
import Favourites from "./Pages/Favourites/Favourites";
import "./App.scss";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";

function App() {
  return (
    <>
      <Router>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
          <Route path="/favourites" element={<Favourites />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
