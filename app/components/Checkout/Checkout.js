const React = require("react");
const Image = require("nordic/image");
const PropTypes = require("prop-types");
const { useState } = React;
const InputQuantity = require("../InputQuantity");
const FastShipping24 = require("@andes/icons/FastShipping24");
const MoneyAmount = require("@andes/money-amount");

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
        aria-label={i18n.gettext("Resumen de compra")}
        tabIndex={9}
        className="checkout__title"
      >
        {i18n.gettext(`Resumen de compra (${quantityToBuy})`)}
      </h2>
      <p className="checkout__subtitle">{i18n.gettext("Producto")}</p>
      <div className="checkout__product">
        <Image
          className="image"
          tabIndex={10}
          src={thumbnail}
          alt={i18n.gettext(title)}
        />
        <div className="column">
          <div className="row checkout__product__title">
            <h2 tabIndex={11}>
              {i18n.gettext(
                title.length > 70 ? title.slice(0, 70 - 3) + "..." : title
              )}
            </h2>
            <InputQuantity
              className="checkout__product__input"
              tabIndex={12}
              quantityToBuy={quantityToBuy}
              setQuantityToBuy={setQuantityToBuy}
              availableQuantity={available_quantity}
              setError={setError}
            />
            <p
              className="checkout__product__unityprice"
              aria-label={i18n.gettext("precio producto")}
              tabIndex={13}
            >
              {i18n.gettext(`${quantityToBuy}x\n`)}
              <MoneyAmount amount={{ fraction: price }} size="14" />
            </p>
          </div>
        </div>
      </div>
      <p className="checkout__subtitle">{i18n.gettext("Envío")}</p>
      <div
        aria-label={i18n.gettext("Costo de envío")}
        className="row checkout__product__info"
      >
        {shipping.free_shipping ? (
          <div className="envio__gratis">
            <FastShipping24 color="green" />
            <p className="envio__gratis__p" tabIndex={14}>
              {i18n.gettext(
                `Envío gratis ${
                  seller_address && "desde: " + seller_address.city.name
                }`
              )}
            </p>
          </div>
        ) : (
          <p tabIndex={14}>
            {i18n.gettext(
              `Envío con costo a determinar ${
                seller_address && "desde: " + seller_address.city.name
              }`
            )}
          </p>
        )}
        <p className="checkout__alert">{i18n.gettext(error)}</p>
      </div>
      <div
        tabIndex={15}
        aria-label={i18n.gettext("Precio total")}
        className="checkout__total"
      >
        <p className="checkout__total__price">{i18n.gettext("Total")}</p>
        <MoneyAmount amount={{ fraction: price * quantityToBuy }} size={28} />
      </div>
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
