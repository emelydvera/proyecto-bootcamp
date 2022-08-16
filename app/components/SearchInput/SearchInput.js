const React = require("react");
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
    <>
      <form onSubmit={handleSubmit} role={i18n.gettext("search")}>
        <label htmlFor="searchInput">{i18n.gettext("Buscar")}</label>
        <input
          aria-label={i18n.gettext("Ingrese producto a buscar")}
          id="searchInput"
          type="text"
          minLength="2"
          placeholder={i18n.gettext("Ingresa tu busqueda...")}
          value={value}
          onChange={handleChange}
          required
        />
        <SearchButton
          isActive={value.length < 2}
          i18n={i18n}
          setValue={setValue}
        />
      </form>
      {!isMounted.current ? (
        ""
      ) : value.length >= 2 ? (
        ""
      ) : (
        <p aria-label={i18n.gettext("Escriba al menos 2 carácteres")}>
          {i18n.gettext("Escriba al menos 2 carácteres")}
        </p>
      )}
    </>
  );
};

module.exports = SearchInput;
