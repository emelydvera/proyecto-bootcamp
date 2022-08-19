const React = require("react");
const PropTypes = require('prop-types');
const Script = require("nordic/script");
const Styles = require('nordic/style')
const serialize = require("serialize-javascript");
const { injectI18n } = require("nordic/i18n");

const ProductsList = require("../../components/ProductsList");
const Filter = require('../../components/Filter');

function View(props) {
  const { products, i18n, translations, query, available_filters } = props;
  const preloadedState = {
    products,
    i18n,
    translations,
    query,
    available_filters
  };

  return (
    <>
      <Styles href='products.css' />
      <Script>
        {`
          window.__PRELOADED_STATE__ = ${serialize(preloadedState, {
            isJSON: true,
          })};
        `}
      </Script>
      <Script src="vendor.js" />
      <Script src="products.js" />

      {products.length > 0 ? (
        <>
          <Filter
            i18n={i18n}
            query={query}
            available_filters={available_filters}
          />
          <ProductsList 
            products={products} 
            i18n={i18n}
            query={query}
          />
        </>
      ) : (
        <p>{i18n.gettext("No se encontraron productos")}</p>
      )}
    </>
  );
}

View.propTypes = {
  i18n: PropTypes.shape({
    gettext: PropTypes.func.isRequired,
  }).isRequired,
  translations: PropTypes.shape({}),
  products: PropTypes.array
};

module.exports = injectI18n(View);
