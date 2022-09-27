const React = require("react");
const Script = require("nordic/script");
const Styles = require("nordic/style");
const serialize = require("serialize-javascript");
const PropTypes = require("prop-types");
const { injectI18n } = require("nordic/i18n");
const Checkout = require("../../components/Checkout");

function View(props) {
  const { product, quantityToBuy, i18n, translations } = props;
  const preloadedState = {
    product,
    quantityToBuy,
    i18n,
    translations,
  };
  return (
    <>
      <Styles href="buy.css" />
      <Script>
        {`
          window.__PRELOADED_STATE__ = ${serialize(preloadedState, {
          isJSON: true,
        })};
        `}
      </Script>
      <Script src="vendor.js" />
      <Script src="buy.js" />

      <div className="container">
        <Checkout product={product} quantity={quantityToBuy} />
      </div>
    </>
  );
}

View.propTypes = {
  quantityToBuy: PropTypes.string.isRequired,
  product: PropTypes.shape({}).isRequired,
  i18n: PropTypes.shape({
    gettext: PropTypes.func.isRequired,
  }).isRequired,
  translations: PropTypes.object,
};

module.exports = injectI18n(View);
