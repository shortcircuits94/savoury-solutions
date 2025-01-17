import "./HomeHeader.scss";

const HomeHeader = ({
  searchTerm,
  onSearchChange,
  onSearch,
  selectedTags,
  onTagRemove,
  categories,
  onCategorySelect,
}) => {
  return (
    <div className="home-header">
      <div className="home-header__background">
        <h1 className="home-header__title">Welcome to Savoury Solutions</h1>

        <div className="home-header__search-bar">
          <input
            className="home-header__search-input"
            type="text"
            placeholder="Search by ingredient..."
            value={searchTerm}
            onChange={onSearchChange}
          />
          <button className="home-header__search-button" onClick={onSearch}>
            Search
          </button>
        </div>

        <div className="home-header__tags">
          {selectedTags.map((tag) => (
            <span key={tag} className="home-header__tag">
              {tag}{" "}
              <button
                className="home-header__tag-remove"
                onClick={() => onTagRemove(tag)}
              >
                x
              </button>
            </span>
          ))}
        </div>

        <div className="home-header__categories">
          {categories.map((cat) => (
            <button
              key={cat.strCategory}
              className="home-header__category-button"
              onClick={() => onCategorySelect(cat.strCategory)}
            >
              {cat.strCategory}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeHeader;
