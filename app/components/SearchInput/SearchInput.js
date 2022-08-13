const React = require("react");
const SearchButton = require("../SearchButton");
const { useState, useRef, useEffect } = React;

const SearchInput = ({ i18n }) => {
  const inputValue = useRef("");
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setValue(() => inputValue.current.value);
    // setValue((value) => value);

    if (inputValue.current.value.length >= 2) {
      setError("");
      if (e.key === "Enter") {
        window.location.href = `listado?q=${inputValue.current.value}`;
        setTimeout(() => {
          inputValue.current.value = "";
        }, 0);
      }
    }
    if (inputValue.current.value.length < 2) {
      setError("Escriba mínimo 2 caracteres en la búsqueda");
    }
  };

  return (
    <>
      <label htmlFor="searchInput">{i18n.gettext("Buscar")}</label>
      <input
        aria-label={i18n.gettext("Ingrese producto a buscar")}
        id="searchInput"
        type="text"
        minLength="2"
        placeholder={i18n.gettext("Ingresa tu busqueda...")}
        ref={inputValue}
        onKeyDown={handleChange}
        required
      />
      <SearchButton value={value} i18n={i18n} inputValue={inputValue} />
      <p>{i18n.gettext(error)}</p>
    </>
  );
};

module.exports = SearchInput;
