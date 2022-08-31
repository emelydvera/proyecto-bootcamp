const React = require("react");
const PropTypes = require("prop-types");
const Image = require("nordic/image");

const Component404 = ({ i18n }) => {
  return (
    <div className="error">
      <Image src="error-image.svg" alt={i18n.gettext("error image")} />
      <h4
        className="error__title"
        aria-label={i18n.gettext("Parece que esta página no existe")}
      >
        {i18n.gettext("Parece que esta página no existe")}
      </h4>
      <a href="/" className="error__link">
        <button aria-label={i18n.gettext("volver a home")}>
          {i18n.gettext("Ir a la página principal")}
        </button>
      </a>
    </div>
  );
};

Component404.propTypes = {
  i18n: PropTypes.shape({
    gettext: PropTypes.func.isRequired,
  }).isRequired,
};

module.exports = Component404;
