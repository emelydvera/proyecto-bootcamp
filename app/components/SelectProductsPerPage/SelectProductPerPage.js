const React = require("react");
const PropTypes = require("prop-types");
const { useI18n } = require("nordic/i18n");

const options = [{ value: 5 }, { value: 10 }, { value: 15 }, { value: 20 }];

const SelectProductsPerPage = ({ setLimit, limit }) => {
  const { i18n } = useI18n();
  const handleChange = (e) => {
    setLimit(parseInt(e.target.value));
  };
  return (
    <div className="products__per-page">
      <label
        aria-label={i18n.gettext(
          "Está página está mostrando {0} productos",
          limit
        )}
        tabIndex={9}
      >
        Productos por página
      </label>
      <select
        aria-label={i18n.gettext(
          "Cambia el número de productos mostrados por la página"
        )}
        tabIndex={9}
        className="products__per-page__select"
        onChange={handleChange}
        defaultValue={limit.toString()}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.value}
          </option>
        ))}
      </select>
    </div>
  );
};

SelectProductsPerPage.propTypes = {
  setLimit: PropTypes.func.isRequired,
  limit: PropTypes.number.isRequired,
};

module.exports = SelectProductsPerPage;
