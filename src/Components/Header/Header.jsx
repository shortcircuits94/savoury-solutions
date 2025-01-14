import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.scss";
import Logo from "../../assets/Images/logo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="header__logo">
        <Link to="/">
          <img src={Logo}></img>
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
        <Link to="/favourites" className="header__link">
          Favourites
        </Link>
      </nav>
    </header>
  );
};

export default Header;
