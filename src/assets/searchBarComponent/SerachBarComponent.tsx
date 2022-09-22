import "./SearchBarComponent.css";
const SearchBarComponent = ({ searchQuery, setSearchQuery }: any) => (
  <form action="/" method="get" className="search-form-container">
    <label htmlFor="header-search">
      <span className="visually-hidden">Search Products</span>
    </label>
    <input
      value={searchQuery}
      onInput={(e: any) => {
        setSearchQuery(e.target.value);
      }}
      type="text"
      id="header-search"
      placeholder="Search Products"
      name="s"
      className="search-input"
    />
    <button type="submit" className="search-submit-button">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      />
      <i className="fa fa-search"></i>
    </button>
  </form>
);

export default SearchBarComponent;
