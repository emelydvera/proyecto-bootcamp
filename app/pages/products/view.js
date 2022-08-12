const React = require("react");
const Script = require("nordic/script");
const serialize = require("serialize-javascript");
const { injectI18n } = require("nordic/i18n");
const ProductsList = require("../../components/ProductsList");

function View(props) {
  const { products, i18n, translations } = props;
  const preloadedState = {
    products,
    i18n,
    translations,
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
      <Script src="products.js" />

      {
        products.length > 0 ?

          <ProductsList products={products} />
          :
          <p>No se encontraron productos</p>
      }

    </>
  );
}

module.exports = injectI18n(View);