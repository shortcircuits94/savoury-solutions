import React from "react";
import { Link } from "react-router-dom";
import "./Favourites.scss";

const FavouritesPage = ({ favourites }) => {
  return (
    <div className="favourites-page">
      <h2 className="favourites-page__title">My Favourites</h2>

      {/* Message when no favourites are found */}
      {favourites.length === 0 ? (
        <p className="favourites-page__message">
          You have no favourites yet. Add some!
        </p>
      ) : (
        <div className="favourites-page__list">
          {favourites.map((item) => (
            <div className="favourites-page__card" key={item.id}>
              <Link to={`/recipe/${item.id}`} className="favourites-page__link">
                <img
                  src={item.image}
                  alt={item.title}
                  className="favourites-page__image"
                />
                <div className="favourites-page__content">
                  <h3 className="favourites-page__title">{item.title}</h3>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavouritesPage;
