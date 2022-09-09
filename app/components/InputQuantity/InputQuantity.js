const React = require("react");
const PropTypes = require("prop-types");
const { useI18n } = require("nordic/i18n");
const TextField = require("@andes/textfield");

const InputQuantity = ({
  className,
  error,
  availableQuantity,
  setError,
  setQuantityToBuy,
  quantityToBuy,
  tabIndex,
}) => {
  const { i18n } = useI18n();

  const handleChange = (e) => {
    const { value } = e.target;

    if (parseInt(value) < 0 || parseInt(value) === -0) {
      setQuantityToBuy("1");
      setError("");
    } else if (availableQuantity < parseInt(value)) {
      setError(`Puedes comprar hasta ${availableQuantity} unidades`);
      setQuantityToBuy(value);
    } else if (value === "" || parseInt(value) === 0) {
      setError(`Puedes comprar mínimo 1 unidad`);
      setQuantityToBuy("");
    } else {
      setError("");
      setQuantityToBuy(value);
    }
  };

  return (
    <div className="input__quantity">
      <TextField
        aria-label={i18n.gettext("Ingrese la cantidad de productos a comprar")}
        label={i18n.gettext("Cantidad")}
        type="number"
        message={error ? i18n.gettext(error) : ""}
        modifier={error ? "error" : "default"}
        centered={true}
        className={className}
        onChange={handleChange}
        value={quantityToBuy}
        tabIndex={tabIndex}
      />
    </div>
  );
};

InputQuantity.propTypes = {
  className: PropTypes.string,
  error: PropTypes.string.isRequired,
  availableQuantity: PropTypes.number.isRequired,
  setError: PropTypes.func.isRequired,
  setQuantityToBuy: PropTypes.func.isRequired,
  quantityToBuy: PropTypes.string.isRequired,
  tabIndex: PropTypes.number.isRequired,
};

module.exports = InputQuantity;
