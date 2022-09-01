const React = require("react");
const PropTypes = require("prop-types");

const SearchButton = (props) => {
  const { isActive, i18n } = props;

  return (
    <>
      <button
        className="search__button"
        aria-label={i18n.gettext("Boton buscar producto")}
        type="submit"
        disabled={isActive}
      >
        {i18n.gettext("Buscar")}
      </button>
    </>
  );
};

SearchButton.propTypes = {
  isActive: PropTypes.bool.isRequired,
  i18n: PropTypes.shape({
    gettext: PropTypes.func.isRequired,
  }).isRequired,
};

module.exports = SearchButton;
