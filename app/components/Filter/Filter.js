const React = require("react");
const { useState } = React;
const PropTypes = require('prop-types');

const Filter = ({ products, setProductsState, i18n }) => {
  const [error, setError] = useState("");

  const handleFilterProducts = (e) => {
    e.preventDefault();
    const [min, max] = e.target;

    if (!min.value && !max.value) {
      setError(() => "Diligencie alguno de los campos");
    } else if (min.value && max.value) {
      setError(() => "");
      setProductsState(() =>
        products.filter(
          (p) =>
            p.price >= parseInt(min.value) && p.price <= parseInt(max.value)
        )
      );
    } else if (min.value && !max.value) {
      console.log(min.value);
      setError(() => "");
      setProductsState(() =>
        products.filter((p) => p.price >= parseInt(min.value))
      );
    } else if (max.value && !min.value) {
      setError(() => "");
      setProductsState(() =>
        products.filter((p) => p.price <= parseInt(max.value))
      );
    }
  };

  return (
    <>
      <p>Precio</p>
      <form onSubmit={handleFilterProducts}>
        <input
          type="number"
          placeholder={i18n.gettext("mínimo")}
          aria-label={i18n.gettext("Escriba el precio")}
          min="0"
          tabIndex="10"
        />
        <input
          type="number"
          placeholder={i18n.gettext("máximo")}
          aria-label={i18n.gettext("Escriba el precio")}
          min="0"
          tabIndex="11"
        />
        <input type="submit" value={i18n.gettext("Filtrar")} tabIndex="12" />
      </form>
      <p>{error}</p>
    </>
  );
};

module.exports = Filter;

ProductsList.proptypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  setProducts: PropTypes.func.isRequired,
  i18n: PropTypes.shape({
      gettext: PropTypes.func.isRequired,
    }).isRequired,
}