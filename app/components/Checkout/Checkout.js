const React = require("react");
const Image = require("nordic/image");
const PropTypes = require("prop-types");
const { useState } = React;
const InputQuantity = require("../InputQuantity");
const FastShipping24 = require("@andes/icons/FastShipping24");
const Shipping24 = require("@andes/icons/Shipping24");
const MoneyAmount = require("@andes/money-amount");

const Checkout = ({ i18n, product, quantity }) => {
  const {
    price,
    shipping,
    seller_address,
    available_quantity,
    thumbnail,
    title,
    currency_id
  } = product;
  const [quantityToBuy, setQuantityToBuy] = useState(quantity);
  const [error, setError] = useState("");

  const totalPriceCents = (price * quantity).toLocaleString('de-DE').split(',')
  const priceCents = price.toLocaleString('de-DE').split(',')

  return (
    <div className="checkout" id="checkout">
      <h2
        aria-label={i18n.gettext("Resumen de compra")}
        tabIndex={9}
        className="checkout__title"
      >
        {i18n.gettext("Resumen de compra")}
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
          <h2 tabIndex={11}>
            {i18n.gettext(
              title.length > 70 ? title.slice(0, 70 - 3) + "..." : title
            )}
          </h2>
          <div className="checkout__product__container">
            <span
              className="checkout__product__unityprice"
              aria-label={i18n.gettext("precio producto")}
              tabIndex={13}
            >
              {i18n.gettext(`${quantityToBuy}x`)}
              <MoneyAmount
                amount={{
                  fraction: i18n.gettext("{0}", priceCents[0]),
                  currencyId: currency_id,
                  cents: priceCents[1] ? i18n.gettext("{0}", priceCents[1]) : i18n.gettext('00')
                }}
                centsType="superscript"
                size={16}
              />
            </span>
            <InputQuantity
              className="checkout__product__input"
              tabIndex={12}
              quantityToBuy={quantityToBuy}
              setQuantityToBuy={setQuantityToBuy}
              availableQuantity={available_quantity}
              setError={setError}
            />
          </div>
          <p className="checkout__alert">{i18n.gettext(error)}</p>
        </div>
      </div>
      <p className="checkout__subtitle">{i18n.gettext("Envío")}</p>
      <div
        aria-label={i18n.gettext("Costo de envío")}
        className="row checkout__product__info envio"
      >
        {shipping.free_shipping ? (
          <div className="envio__gratis">
            <FastShipping24 color="green" />
            <p className="envio__gratis--true" tabIndex={14}>
              {i18n.gettext("Envío gratis")}
            </p>
            {seller_address && (
              <p className="envio__gratis__city " tabIndex={14}>
                {i18n.gettext("desde {0}", seller_address.city.name)}
              </p>
            )}
          </div>
        ) : (
          <div className="envio__costo">
            <Shipping24 />
            <p className='envio__costo--false' tabIndex={14}>
              {i18n.gettext("Envío con costo a determinar")}
            </p>
            {seller_address && (<p className='envio__costo__city' >{i18n.gettext("desde: {0}", seller_address.city.name)}</p>)}
          </div>
        )}
      </div>
      <div
        tabIndex={15}
        aria-label={i18n.gettext("Precio total")}
        className="checkout__total"
      >
        <p className="checkout__total__price">{i18n.gettext("Total")}</p>
        <MoneyAmount
          amount={{
            fraction: i18n.gettext("{0}", totalPriceCents[0]),
            cents: totalPriceCents[1] ? i18n.gettext("{0}", totalPriceCents[1]) : i18n.gettext('00')
          }}
          centsType="superscript"
          size={28}
        />
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
