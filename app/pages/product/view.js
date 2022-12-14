const React = require("react");
const Styles = require("nordic/style");
const Script = require("nordic/script");
const Head = require("nordic/head");
const serialize = require("serialize-javascript");
const { injectI18n } = require("nordic/i18n");
const ProductView = require("../../components/ProductView");
const BreadCrumb = require("../../components/BreadCrumb");
const PropTypes = require("prop-types");

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
      <Head>
        <title>{i18n.gettext("Detalle del producto")}</title>
        <meta
          name="description"
          content={i18n.gettext("Esta es la página del producto seleccionado")}
        ></meta>
      </Head>
      <Styles href="product.css" />
      <Script>
        {`
          window.__PRELOADED_STATE__ = ${serialize(preloadedState, {
            isJSON: true,
          })};
        `}
      </Script>
      <Script src="vendor.js" />
      <Script src="product.js" />
      {product.path.length > 0 && (
        <div className={"breadcrumb_container"}>
          <BreadCrumb path={product.path} productTitle={product.title} />
        </div>
      )}
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
  amount: PropTypes.string,
  path: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
};

module.exports = injectI18n(View);
