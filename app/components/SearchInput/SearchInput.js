const React = require("react");
const PropTypes = require("prop-types");

const SearchButton = require("../SearchButton");

const { useState, useRef } = React;

const SearchInput = ({ i18n }) => {
  const [value, setValue] = useState("");
  const isMounted = useRef(false);

  const handleChange = (e) => {
    isMounted.current = true;
    setValue(() => e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.href = `listado?q=${value}`;
    setTimeout(() => setValue(() => ""), 1000);
  };

  return (
    <div className="search">
      <form
        className="search__form"
        onSubmit={handleSubmit}
        role={i18n.gettext("search")}
      >
        <label className="search__label" htmlFor="searchInput">
          {i18n.gettext("Buscar")}
        </label>
        <div className="search__container">
          <input
            className="search__input"
            aria-label={i18n.gettext("Ingrese producto a buscar")}
            id="searchInput"
            type="text"
            minLength="2"
            placeholder={i18n.gettext("Ingresa tu busqueda...")}
            value={value}
            onChange={handleChange}
            required
            tabIndex="11"
          />
          <SearchButton
            isActive={value.length < 2}
            i18n={i18n}
            setValue={setValue}
          />
        </div>
        {!isMounted.current ? (
          <p className="search__alert"> </p>
        ) : value.length >= 2 ? (
          <p className="search__alert"> </p>
        ) : (
          <p
            className="search__alert"
            aria-label={i18n.gettext("Escriba al menos 2 carácteres")}
            tabIndex="12"
          >
            {i18n.gettext("* Escriba al menos 2 carácteres")}
          </p>
        )}
      </form>
    </div>
  );
};

SearchInput.propTypes = {
  i18n: PropTypes.shape({
    gettext: PropTypes.func.isRequired,
  }).isRequired,
};

module.exports = SearchInput;
