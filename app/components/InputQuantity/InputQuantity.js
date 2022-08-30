const React = require("react");
const { useState, useEffect } = React;

const InputQuantity = ({
  availableQuantity,
  setError,
  setQuantityToBuy,
  quantityToBuy,
}) => {
  const handleChange = (e) => {
    const { value } = e.target;

    if (parseInt(value) <= 0) {
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
        type="number"
        min="1"
        onChange={handleChange}
        value={quantityToBuy}
      />
    </>
  );
};

module.exports = InputQuantity;
