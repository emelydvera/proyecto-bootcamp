const React = require("react");
const Script = require("nordic/script");
const Styles = require("nordic/style");
const serialize = require("serialize-javascript");
const { injectI18n } = require("nordic/i18n");
const Checkout = require("../../components/Checkout");

function View(props) {
  const { product, quantityToBuy } = props;
  const preloadedState = {
    product,
    quantityToBuy,
  };
  return (
    <>
      <Styles href="comprar.css" />
      <Script>
        {`
          window.__PRELOADED_STATE__ = ${serialize(preloadedState, {
            isJSON: true,
          })};
        `}
      </Script>
      <Script src="vendor.js" />
      <Script src="comprar.js" />

      <div className="container">
        <Checkout product={product} quantity={quantityToBuy} />
      </div>
    </>
  );
}

module.exports = View;
