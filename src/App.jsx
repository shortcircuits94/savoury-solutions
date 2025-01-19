import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./Pages/Home/Home";
import RecipeDetails from "./Pages/RecipeDetails/RecipeDetails";
import Favourites from "./Pages/Favourites/Favourites";
import "./App.scss";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import Registration from "./Pages/Registration/Registration";
import Login from "./Pages/Login/Login";

// Create a protected route component
const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("authToken");

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className="app">
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipe/:id" element={<RecipeDetails />} />
        <Route
          path="/favourites"
          element={
            <ProtectedRoute>
              <Favourites />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={
            isLoggedIn ? (
              <Navigate to="/favourites" replace />
            ) : (
              <Login onLoginSuccess={handleLoginSuccess} />
            )
          }
        />
        <Route
          path="/registration"
          element={
            isLoggedIn ? (
              <Navigate to="/favourites" replace />
            ) : (
              <Registration />
            )
          }
        />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
