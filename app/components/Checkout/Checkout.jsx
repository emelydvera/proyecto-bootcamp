const React = require("react");
const Image = require("nordic/image");
const { useState } = React;
const InputQuantity = require("../InputQuantity");

const Checkout = ({ product, quantity }) => {
  const {
    price,
    shipping,
    seller_address,
    available_quantity,
    thumbnail,
    title,
  } = product;
  const [quantityToBuy, setQuantityToBuy] = useState(quantity);
  const [error, setError] = useState("");

  return (
    <div>
      <h2>{`Carrito de compras (${quantityToBuy})`}</h2>
      <Image src={thumbnail} alt={title} />
      <h2>{title}</h2>
      <p>Precio untario: ${price}</p>
      <p>
        {shipping.free_shipping
          ? `Envío gratis ${
              seller_address && `desde: ${seller_address.city.name}`
            }`
          : `Envío con costo a determinar ${
              seller_address && `desde: ${seller_address.city.name}`
            }`}
      </p>
      <InputQuantity
        quantityToBuy={quantityToBuy}
        setQuantityToBuy={setQuantityToBuy}
        availableQuantity={available_quantity}
        setError={setError}
      />
      <p>{error}</p>
      <p>Total: ${price * quantityToBuy}</p>
    </div>
  );
};

module.exports = Checkout;
