const React = require("react");
const PropTypes = require("prop-types");

const Component404 = ({ i18n }) => {
  return (
    <>
      <h1 aria-label={i18n.gettext("texto de error")}>
        {i18n.gettext("UPS! el producto que buscas no existe! :'c")}
      </h1>
      <a href="/">
        <button aria-label={i18n.gettext("volver a home")}>
          {i18n.gettext("Volver a home")}
        </button>
      </a>
    </>
  );
};

Component404.propTypes = {
  i18n: PropTypes.shape({
    gettext: PropTypes.func.isRequired,
  }).isRequired,
};

module.exports = Component404;
