const React = require("react");

const SearchButton = (props) => {
  const { value } = props;

  const handleClick = () => {
    window.location.href = `listado?q=${value}`;
  };

  console.log(value);

  return (
    <>
      {value.length < 2 ? (
        <button
          aria-label="Boton buscar producto"
          type="submit"
          disabled
          onClick={handleClick}
        >
          Buscar
        </button>
      ) : (
        <button type="submit" onClick={handleClick}>
          Buscar
        </button>
      )}
    </>
  );
};

module.exports = SearchButton;
