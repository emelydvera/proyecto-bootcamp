const React = require("react");
const Script = require("nordic/script");
const serialize = require("serialize-javascript");
const { injectI18n } = require("nordic/i18n");
const ProductView = require("../../components/ProductView");
const PropTypes = require('prop-types');

function View(props) {
  const { product, i18n, translations, description, quantity, amount } = props;
  const preloadedState = {
    product,
    i18n,
    translations,
    description,
    quantity,
    amount,
  };

  return (
    <>
      <Script>
        {`
          window.__PRELOADED_STATE__ = ${serialize(preloadedState, {
            isJSON: true,
          })};
        `}
      </Script>
      <Script src="vendor.js" />
      <Script src="product.js" />
      <ProductView
        product={product}
        description={description}
        quantity={quantity}
        amount={amount}
        i18n={i18n}
      />
    </>
  );
}

View.propTypes = {
  i18n: PropTypes.shape({
    gettext: PropTypes.func.isRequired,
  }).isRequired,
  translations: PropTypes.shape({}),
  product: PropTypes.shape({}).isRequired,
  description: PropTypes.shape({}).isRequired,
  quantity: PropTypes.string,
  amount: PropTypes.string
}

module.exports = injectI18n(View);
