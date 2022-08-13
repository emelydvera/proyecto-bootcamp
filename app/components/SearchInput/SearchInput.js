const React = require("react");
const SearchButton = require("../SearchButton");
const { useState } = React;

const SearchInput = ({ i18n }) => {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(() => e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.href = `listado?q=${value}`;
    setTimeout(() => setValue(() => ""), 1000);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
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
        <SearchButton value={value} i18n={i18n} setValue={setValue} />
      </form>
      <p>
        {i18n.gettext(value.length >= 2 ? "" : "Escriba al menos 2 carácteres")}
      </p>
    </>
  );
};

module.exports = SearchInput;
