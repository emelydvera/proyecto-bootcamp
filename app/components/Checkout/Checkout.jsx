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
    <div className="checkout" id="checkout">
      <h2 className="checkout__title">{`Carrito de compras (${quantityToBuy})`}</h2>
      <div className="checkout__product">
        <Image className="image" src={thumbnail} alt={title} />
        <div className="column">

          <div className="row checkout__product__title">
            <h2>{
              title.length > 70 ? title.slice(0, 70-3) + '...' : title  
            }</h2>
            <InputQuantity
              className="checkout__product__input"
              quantityToBuy={quantityToBuy}
              setQuantityToBuy={setQuantityToBuy}
              availableQuantity={available_quantity}
              setError={setError}
            />
            <p>${price * quantityToBuy}</p>
          </div>

          <div className="row checkout__product__info">
              {
                (shipping.free_shipping)
                  ? 
                    <p
                      className="envio__gratis"
                    >{`Envío gratis ${ seller_address && "desde: " + seller_address.city.name}`}</p>
                  : 
                    <p>{`Envío con costo a determinar ${ seller_address && "desde: " + seller_address.city.name}`}</p>
              }
            <p className="checkout__alert">{error}</p>
          </div>

        </div>
      </div>
      <p className="checkout__total">Total: ${price * quantityToBuy}</p>
    </div>
  );
};

module.exports = Checkout;
