const React = require("react");
const PropTypes = require("prop-types");

const InputQuantity = ({
  className,
  availableQuantity,
  setError,
  setQuantityToBuy,
  quantityToBuy,
}) => {
  const handleChange = (e) => {
    const { value } = e.target;

    if (parseInt(value) <= 0 || value ==='') {
      setQuantityToBuy("1");
    } else {
      if (availableQuantity < parseInt(value)) {
        setError(`Puedes comprar hasta ${availableQuantity} unidades`);
      } else {
        setError("");
      }
      setQuantityToBuy(value);
    }
  };

  return (
    <>
      <input
        className={className}
        type="number"
        min="1"
        onChange={handleChange}
        value={quantityToBuy}
      />
    </>
  );
};

InputQuantity.propTypes = {
  availableQuantity: PropTypes.number.isRequired,
  setError: PropTypes.func.isRequired,
  setQuantityToBuy: PropTypes.func.isRequired,
  quantityToBuy: PropTypes.string.isRequired,
};

module.exports = InputQuantity;
