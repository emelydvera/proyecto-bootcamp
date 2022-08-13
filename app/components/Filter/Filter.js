const React = require("react");

const Filter = ({ products, setProductsState, i18n }) => {
  const handleFilterProducts = (e) => {
    e.preventDefault();
    const [min, max] = e.target;
    setProductsState(() =>
      products.filter((p) => p.price >= min.value && p.price <= max.value)
    );
  };

  return (
    <form onSubmit={handleFilterProducts}>
      <input
        type="number"
        placeholder={i18n.gettext("minimo")}
        aria-label={i18n.gettext("Escriba el precio minimo")}
      />
      <input
        type="number"
        placeholder={i18n.gettext("maximo")}
        aria-label={i18n.gettext("Escriba el precio maximo")}
      />
      <input type="submit" value={i18n.gettext("Filtrar")} />
    </form>
  );
};

module.exports = Filter;
