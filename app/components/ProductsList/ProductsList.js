const React = require("react");
const { useState } = React;
const Filter = require("../Filter");
const ProductsCard = require("../ProductsCard");
const PropTypes = require('prop-types');

const ProductsList = (props) => {
  const { products, i18n } = props;
  const [productsState, setProductsState] = useState(products);

  return (
    <>
      <Filter
        products={products}
        setProductsState={setProductsState}
        i18n={i18n}
      />
      <ul>
        {productsState.length > 0 ? (
          productsState.map((product, index) => {
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
      </ul>
    </>
  );
};

ProductsList.proptypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  i18n: PropTypes.shape({
      gettext: PropTypes.func.isRequired,
    }).isRequired,
}

module.exports = ProductsList;

