const React = require("react");
const PropTypes = require("prop-types");
const ProductAttributes = require("../ProductAttributes");
const ProductSlider = require('../ProductSlider');
const ProductInfo = require("../ProductInfo");

const ProductView = ({ product, i18n, description, quantity, amount }) => {
  const {
    attributes,
  } = product;

  return (
    <section>

      <div className="product">
        <ProductSlider product={product} />
        <h2>{i18n.gettext("Descripción del producto")}</h2>
        <p tabIndex={19}>{i18n.gettext(description.plain_text)}</p>
        <ProductAttributes i18n={i18n} attributes={attributes} />
      </div>
      <ProductInfo product={product} quantity={quantity} amount={amount} />

    </section>
  );
};

ProductView.propTypes = {
  i18n: PropTypes.shape({
    gettext: PropTypes.func.isRequired,
  }).isRequired,
  product: PropTypes.shape({
    attributes: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
      })
    ).isRequired
  
  }).isRequired,
  description: PropTypes.shape({
    plain_text: PropTypes.string.isRequired,
  }),
  quantity: PropTypes.string,
  amount: PropTypes.string,
};

module.exports = ProductView;
