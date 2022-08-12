const React = require("react");
const SearchButton = require("../SearchButton");
const { useState, useRef, useEffect } = React;

const SearchInput = () => {
  const inputValue = useRef(null);
  const [value, setValue] = useState("");

  // useEffect(() => {
  //   value && (window.location.href = `listado?q=${value}`);
  // }, [value]);

  const handleChange = () => {
    setValue(inputValue.current.value);
    console.log(value);
  };

  return (
    <>
      <label htmlFor="searchInput">Buscar</label>
      <input
        aria-label="Ingrese producto a buscar"
        id="searchInput"
        type="text"
        minLength="2"
        placeholder="Ingresa tu busqueda..."
        ref={inputValue}
        onChange={handleChange}
        required
      />
      <SearchButton value={value} />
    </>
  );
};

module.exports = SearchInput;
