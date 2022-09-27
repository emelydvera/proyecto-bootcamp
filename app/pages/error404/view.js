const React = require("react");
const Script = require("nordic/script");
const Style = require("nordic/style");
const Head = require("nordic/head");
const serialize = require("serialize-javascript");
const { injectI18n } = require("nordic/i18n");
const Component404 = require("../../components/Component404");
const PropTypes = require("prop-types");

function View(props) {
  const { i18n, translations, imagesPrefix } = props;
  const preloadedState = {
    translations,
    imagesPrefix,
  };

  return (
    <>
      <Head>
        <title>{i18n.gettext("Producto no encontrado")}</title>
        <meta
          name="description"
          content={i18n.gettext(
            "Esta página se renderiza cuando un producto no fue encontrado - Página de error 404"
          )}
        ></meta>
      </Head>
      <Style href="error404.css" />
      <Script>
        {`
          window.__PRELOADED_STATE__ = ${serialize(preloadedState, {
            isJSON: true,
          })};
        `}
      </Script>
      <Script src="vendor.js" />
      <Script src="error404.js" />
      <Component404 i18n={i18n} />
    </>
  );
}

View.propTypes = {
  i18n: PropTypes.shape({
    gettext: PropTypes.func.isRequired,
  }).isRequired,
  translations: PropTypes.shape({}),
  imagesPrefix: PropTypes.string,
};

module.exports = injectI18n(View);
