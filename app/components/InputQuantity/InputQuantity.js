const React = require("react");
const PropTypes = require("prop-types");
const { useI18n } = require('nordic/i18n');


const InputQuantity = ({
  className,
  availableQuantity,
  setError,
  setQuantityToBuy,
  quantityToBuy,
}) => {

  const { i18n } = useI18n();

  const handleChange = (e) => {
    const { value } = e.target;

    if (parseInt(value) <= 0 || value ==='') {
      
      setQuantityToBuy("1");

    } else {

      if (availableQuantity < parseInt(value)) {
        setError(i18n.gettext('Puedes comprar hasta {0} unidades', availableQuantity));
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
