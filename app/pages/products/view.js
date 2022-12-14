const React = require("react");
const { useState } = React;
const PropTypes = require("prop-types");
const Script = require("nordic/script");
const Styles = require("nordic/style");
const Head = require("nordic/head");
const serialize = require("serialize-javascript");
const { injectI18n } = require("nordic/i18n");
const ProductsList = require("../../components/ProductsList");
const Filter = require("../../components/Filter");
const Pagination = require("../../components/Pagination/Pagination");
const UrlGenerator = require("../../utils/urlGenerator");
const SelectProductsPerPage = require("../../components/SelectProductsPerPage/SelectProductPerPage");
const BreadCrumb = require("../../components/BreadCrumb");

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
  const urlGenerator = new UrlGenerator(baseUrl, query, filters, totalProducts);
  const path = filters
    .find((filter) => filter.id === "category")
    ?.values.find((value) => value.path_from_root)?.path_from_root;

  return (
    <div>
      <Head>
        <title>{i18n.gettext("Listado de productos")}</title>
        <meta
          name="description"
          content={i18n.gettext(
            "Esta es la página del listado de productos encontrados con la búsqueda realizada"
          )}
        ></meta>
      </Head>
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

      <div id="products-page">
        <Filter
          totalProducts={totalProducts}
          filters={filters}
          available_filters={available_filters}
          urlGenerator={urlGenerator}
        />
        <div className="products">
          <div className={path ? "products__info" : "products__select"}>
            {path && <BreadCrumb path={path} />}
            <SelectProductsPerPage urlGenerator={urlGenerator} />
          </div>
          <ProductsList products={data} i18n={i18n} query={query} />
          <Pagination
            totalProducts={totalProducts}
            urlGenerator={urlGenerator}
            setData={setData}
            productsInitial={products}
            i18n={i18n}
          />
        </div>
      </div>
    </div>
  );
}

View.propTypes = {
  i18n: PropTypes.shape({
    gettext: PropTypes.func.isRequired,
  }).isRequired,
  translations: PropTypes.shape({}),
  products: PropTypes.array,
  baseUrl: PropTypes.string,
  query: PropTypes.object,
  filters: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  available_filters: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  totalProducts: PropTypes.number.isRequired,
};

module.exports = injectI18n(View);
