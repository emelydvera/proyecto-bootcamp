const React = require("react");

const SearchButton = (props) => {
  const { value, i18n, inputValue } = props;

  const handleClick = () => {
    window.location.href = `listado?q=${value}`;
    setTimeout(() => {
      inputValue.current.value = "";
    }, 0);
  };

  return (
    <>
      <button
        aria-label={i18n.gettext("Boton buscar producto")}
        type="submit"
        disabled={value.length < 1}
        onClick={handleClick}
      >
        {i18n.gettext("Buscar")}
      </button>
    </>
  );
};

module.exports = SearchButton;
