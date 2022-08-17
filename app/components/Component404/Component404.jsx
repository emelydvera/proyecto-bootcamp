const { i18nMiddleware } = require("nordic/i18n");
const React = require("react");

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

module.exports = Component404;
