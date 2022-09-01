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
        setError(`Puedes comprar hasta ${availableQuantity} unidades`);
      }
    } else if (name === "-" && newQuantityToBuy > 1) {
      newQuantityToBuy = newQuantityToBuy - 1;
      setQuantityToBuy(newQuantityToBuy.toString());
      setError("");
    }
  };

  return (
    <div className="input__quantity">
      <input
        className={className}
        type="number"
        min="1"
        onChange={handleChange}
        value={quantityToBuy}
      />
      <button className="buy__button__substract" name="-" onClick={handleClick}>
        -
      </button>
      <button className="buy__button__add" name="+" onClick={handleClick}>
        +
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
