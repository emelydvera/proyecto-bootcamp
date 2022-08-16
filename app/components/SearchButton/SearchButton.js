const React = require("react");

const SearchButton = (props) => {
  const { isActive, i18n } = props;

  return (
    <>
      <button
        aria-label={i18n.gettext("Boton buscar producto")}
        type="submit"
        disabled={isActive}
      >
        {i18n.gettext("Buscar")}
      </button>
    </>
  );
};

module.exports = SearchButton;
