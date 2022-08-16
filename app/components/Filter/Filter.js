const React = require("react");
const { useState } = React;

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
      <form onSubmit={handleFilterProducts}>
        <input
          type="number"
          placeholder={i18n.gettext("mínimo")}
          aria-label={i18n.gettext("Escriba el precio minimo")}
          min="0"
        />
        <input
          type="number"
          placeholder={i18n.gettext("máximo")}
          aria-label={i18n.gettext("Escriba el precio maximo")}
          min="0"
        />
        <input type="submit" value={i18n.gettext("Filtrar")} />
      </form>
      <p>{error}</p>
    </>
  );
};

module.exports = Filter;
