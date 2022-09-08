const React = require("react");
const PropTypes = require("prop-types");
const { useI18n } = require("nordic/i18n");
const Button = require("@andes/button");
const TextField = require("@andes/textfield");
const { useRef, useState } = React;

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
      setQuantityToBuy(1);
      setError("");
    } else if (availableQuantity < parseInt(value)) {
      setError(`Puedes comprar hasta ${availableQuantity} unidades`);
      setQuantityToBuy(parseInt(value));
    } else if (value === "" || parseInt(value) === 0) {
      setError(`Puedes comprar mínimo 1 unidad`);
      setQuantityToBuy(parseInt(value));
    } else {
      setError("");
      setQuantityToBuy(parseInt(value));
    }
  };

  const getItemn =(param)=>{
for (let index = 0; index < param; index++) {
  const element = array[index];
  
}
  }

  return (
    <div className="input__quantity">
      <TextField
        label={i18n.gettext("Cantidad")}
        type="number"
        min="1"
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
  availableQuantity: PropTypes.number.isRequired,
  setError: PropTypes.func.isRequired,
  setQuantityToBuy: PropTypes.func.isRequired,
  quantityToBuy: PropTypes.string.isRequired,
};

module.exports = InputQuantity;
