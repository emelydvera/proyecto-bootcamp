const React = require("react");

const SearchButton = (props) => {
  const { value, i18n } = props;

  return (
    <>
      <button
        aria-label={i18n.gettext("Boton buscar producto")}
        type="submit"
        disabled={value.length < 2}
      >
        {i18n.gettext("Buscar")}
      </button>
    </>
  );
};

module.exports = SearchButton;
