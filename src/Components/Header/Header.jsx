import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.scss";
import Logo from "../../assets/Images/logo.svg";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("authToken");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header__logo">
        <Link to="/" onClick={handleLinkClick}>
          <img src={Logo} alt="Savoury Solutions Logo" />
        </Link>
      </div>

      {/* Mobile Hamburger Menu */}
      <div
        className={`header__menu-toggle ${isMenuOpen ? "open" : ""}`}
        onClick={toggleMenu}
      >
        <span className="header__menu-icon"></span>
      </div>

      {/* Navigation Links */}
      <nav className={`header__nav ${isMenuOpen ? "open" : ""}`}>
        {isLoggedIn ? (
          <>
            <Link
              to="/favourites"
              className="header__link"
              onClick={handleLinkClick}
            >
              Favourites
            </Link>
            <Link onClick={handleLogout} className="header__link">
              Log Out
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="header__link"
              onClick={handleLinkClick}
            >
              Login
            </Link>
            <Link
              to="/registration"
              className="header__link"
              onClick={handleLinkClick}
            >
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
