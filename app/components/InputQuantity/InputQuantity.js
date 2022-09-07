const React = require("react");
const PropTypes = require("prop-types");
const { useI18n } = require("nordic/i18n");
const Dropdown = require('@andes/dropdown');
const { DropdownItem } = Dropdown;
const TextField = require('@andes/textfield');
const { CodeInput } = require('@andes/textfield');

const InputQuantity = ({
  className,
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
      setQuantityToBuy(value);
    } else {
      setError("");
      setQuantityToBuy(value);
    }
  };

  const handleClick = (e) => {
    const { name } = e.target;
    let newQuantityToBuy = parseInt(quantityToBuy);
    if (name === "+") {
      if (quantityToBuy === "") {
        newQuantityToBuy = 0;
        setError("");
      }
      newQuantityToBuy = newQuantityToBuy + 1;
      setQuantityToBuy(newQuantityToBuy.toString());
      if (availableQuantity < parseInt(newQuantityToBuy)) {
        setError(i18n.ngettext('Puedes comprar hasta {0} unidad', 'Puedes comprar hasta {0} unidades', availableQuantity, [availableQuantity]));
      }
    } else if (name === "-" && newQuantityToBuy > 1) {
      newQuantityToBuy = newQuantityToBuy - 1;
      setQuantityToBuy(newQuantityToBuy.toString());
      setError(i18n.ngettext('Puedes comprar hasta {0} unidad', 'Puedes comprar hasta {0} unidades', availableQuantity, [availableQuantity]));
      if (newQuantityToBuy <= availableQuantity) {
        setError("");
      }
    }
  };

  return (
    <div className="input__quantity">

      {/* <TextField 
      label="Cantidad" 
      type='number'
      min="1"
      /> */}

      <input
        className={className}
        type="number"
        min="1"
        onChange={handleChange}
        value={quantityToBuy}
        tabIndex={tabIndex}
      />
      <button
        className="buy__button__add"
        tabIndex={tabIndex}
        name="+"
        onClick={handleClick}
        aria-label={i18n.gettext('Agregar producto')}
      >
        +
      </button>
      <button
        className="buy__button__substract"
        tabIndex={tabIndex}
        name="-"
        onClick={handleClick}
        aria-label={i18n.gettext('Eliminar producto')}
      >
        -
      </button>
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
