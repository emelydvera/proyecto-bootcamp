const React = require("react");
const { useState } = React;
const PropTypes = require("prop-types");
const Script = require("nordic/script");
const Styles = require("nordic/style");
const serialize = require("serialize-javascript");
const { injectI18n } = require("nordic/i18n");
const ProductsList = require("../../components/ProductsList");
const Filter = require("../../components/Filter");
const Pagination = require("../../components/Pagination/Pagination");
const UrlGenerator = require("../../utils/urlGenerator");
const SelectProductsPerPage = require("../../components/SelectProductsPerPage/SelectProductPerPage");

function View(props) {
  const {
    products,
    i18n,
    translations,
    baseUrl,
    query,
    filters,
    available_filters,
    totalProducts,
  } = props;
  const preloadedState = {
    products,
    i18n,
    translations,
    baseUrl,
    query,
    filters,
    available_filters,
    totalProducts,
  };

  const [data, setData] = useState(products);
  const [limit, setLimit] = useState(parseInt(query.limit) || 10);

  const urlGenerator = new UrlGenerator(
    baseUrl,
    { ...query, limit },
    filters,
    totalProducts
  );

  return (
    <div>
      <Styles href="products.css" />
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
        <div id="products-page">
          <Filter
            i18n={i18n}
            baseUrl={baseUrl}
            query={query}
            filters={filters}
            available_filters={available_filters}
            urlGenerator={urlGenerator}
            limit={parseInt(urlGenerator.getQueries().limit)}
          />
          <div className="products">
            <SelectProductsPerPage
              setLimit={setLimit}
              limit={parseInt(urlGenerator.getQueries().limit)}
            />
            <ProductsList products={data} i18n={i18n} query={query} />
            <Pagination
              // key={limit}
              totalProducts={totalProducts}
              urlGenerator={urlGenerator}
              setData={setData}
              productsInitial={products}
              i18n={i18n}
              limit={parseInt(urlGenerator.getQueries().limit)}
            />
          </div>
        </div>
      ) : (
        <p>{i18n.gettext("No se encontraron productos")}</p>
      )}
    </div>
  );
}

View.propTypes = {
  i18n: PropTypes.shape({
    gettext: PropTypes.func.isRequired,
  }).isRequired,
  translations: PropTypes.shape({}),
  products: PropTypes.array,
};

module.exports = injectI18n(View);
