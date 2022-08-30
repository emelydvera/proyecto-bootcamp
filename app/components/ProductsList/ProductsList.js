const React = require("react");
const ProductsCard = require("../ProductsCard");
const PropTypes = require('prop-types');
const Pagination = require("../Pagination/Pagination");

const ProductsList = (props) => {
  const { products, i18n } = props;

  return (
    <section>
      {products.length > 0 ? (

        products.map((product, index) => {
          return (
            <ProductsCard
              key={product.id}
              index={index}
              product={product}
              i18n={i18n}
            />
          );
        })
      ) : (
        <p>{i18n.gettext("No se encontraron productos")}</p>
      )}
    </section>
  );
};

ProductsList.proptypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  i18n: PropTypes.shape({
    gettext: PropTypes.func.isRequired,
  }).isRequired,
}

module.exports = ProductsList;

