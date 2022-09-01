const React = require("react");
const Image = require("nordic/image");
const PropTypes = require("prop-types");
const { useState } = React;
const InputQuantity = require("../InputQuantity");

const Checkout = ({ i18n, product, quantity }) => {
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
      <h2
        aria-label={i18n.gettext("Carrito de compras")}
        className="checkout__title"
      >
        {i18n.gettext(`Carrito de compras (${quantityToBuy})`)}
      </h2>
      <div className="checkout__product">
        <Image className="image" src={thumbnail} alt={i18n.gettext(title)} />
        <div className="column">
          <div className="row checkout__product__title">
            <h2>
              {i18n.gettext(
                title.length > 70 ? title.slice(0, 70 - 3) + "..." : title
              )}
            </h2>
            <InputQuantity
              className="checkout__product__input"
              quantityToBuy={quantityToBuy}
              setQuantityToBuy={setQuantityToBuy}
              availableQuantity={available_quantity}
              setError={setError}
            />
            <p aria-label={i18n.gettext("precio producto")}>
              {i18n.gettext(`Precio unitario: $${price}`)}
            </p>
          </div>

          <div
            aria-label={i18n.gettext("Costo de envío")}
            className="row checkout__product__info"
          >
            {shipping.free_shipping ? (
              <p className="envio__gratis">
                {i18n.gettext(
                  `Envío gratis ${
                    seller_address && "desde: " + seller_address.city.name
                  }`
                )}
              </p>
            ) : (
              <p>
                {i18n.gettext(
                  `Envío con costo a determinar ${
                    seller_address && "desde: " + seller_address.city.name
                  }`
                )}
              </p>
            )}
            <p className="checkout__alert">{error}</p>
          </div>
        </div>
      </div>
      <p aria-label={i18n.gettext("Precio total")} className="checkout__total">
        {i18n.gettext(`Total: ${price * quantityToBuy}`)}
      </p>
    </div>
  );
};

Checkout.propTypes = {
  product: PropTypes.shape({}).isRequired,
  quantity: PropTypes.string.isRequired,
  i18n: PropTypes.shape({
    gettext: PropTypes.func.isRequired,
  }).isRequired,
};

module.exports = Checkout;
