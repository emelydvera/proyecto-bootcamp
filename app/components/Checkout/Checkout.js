const React = require("react");
const Image = require("nordic/image");
const PropTypes = require("prop-types");
const { useState } = React;
const { useI18n } = require("nordic/i18n");
const InputQuantity = require("../InputQuantity");
const FastShipping24 = require("@andes/icons/FastShipping24");
const Shipping24 = require("@andes/icons/Shipping24");
const MoneyAmount = require("@andes/money-amount");
const amountFormater = require('../../utils/priceFormater');

const Checkout = ({ product, quantity }) => {
  const {
    price,
    shipping,
    seller_address,
    available_quantity,
    title,
    currency_id,
    pictures
  } = product;

  const { i18n } = useI18n();
  const [quantityToBuy, setQuantityToBuy] = useState(quantity);
  const [error, setError] = useState("");

  const priceCents = amountFormater(price);
  const totalPriceCents = (quantityToBuy > available_quantity ?
    amountFormater(available_quantity * price) :
    amountFormater(quantityToBuy * price)
  );

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
          src={pictures[0].url}
          alt={i18n.gettext(title)}
        />
        <div className="column">
          <div className="checkout__product__container">
            <h2 tabIndex={11}>
              {title.length > 70 ? i18n.gettext('{0}...', title.slice(0, 70 - 3)) : i18n.gettext(title)}
            </h2>
            <span
              className="checkout__product__unityprice"
              aria-label={i18n.gettext("precio producto")}
              tabIndex={13}
            >
              {quantityToBuy > available_quantity ?
                i18n.gettext("{0}x", available_quantity)
                :
                i18n.gettext("{0}x", quantityToBuy)}

              <MoneyAmount
                amount={{
                  fraction: i18n.gettext(priceCents.fraction),
                  currencyId: currency_id,
                  cents: i18n.gettext(priceCents.cents)
                }}
                centsType="superscript"
                size={16}
              />
            </span>

          </div>
          <div className="checkout__input__container">
            <InputQuantity
              className='checkout__input'
              tabIndex={12}
              error={error}
              quantityToBuy={quantityToBuy}
              setQuantityToBuy={setQuantityToBuy}
              availableQuantity={available_quantity}
              setError={setError}
            />
          </div>
        </div>
      </div>
      <p className="checkout__subtitle">{i18n.gettext("Env??o")}</p>
      <div
        aria-label={i18n.gettext("Costo de env??o")}
        className="row checkout__product__info envio"
      >
        {shipping.free_shipping ? (
          <div className="envio__gratis">
            <FastShipping24 color="green" />
            <p className="envio__gratis--true" tabIndex={14}>
              {i18n.gettext("Env??o gratis")}
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
              {i18n.gettext("Env??o con costo a determinar")}
            </p>
            {seller_address && (<p className='envio__costo__city' tabIndex={14} >{i18n.gettext("desde: {0}", seller_address.city.name)}</p>)}
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
            fraction: i18n.gettext(totalPriceCents.fraction),
            cents: i18n.gettext(totalPriceCents.cents)
          }}
          centsType="superscript"
          size={28}
        />
      </div>
    </div>
  );
};

Checkout.propTypes = {
  product: PropTypes.shape({
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    shipping: PropTypes.shape({}),
    available_quantity: PropTypes.number.isRequired,
    currency_id: PropTypes.string.isRequired,
    seller_address: PropTypes.shape({}).isRequired,
    pictures: PropTypes.array.isRequired

  }).isRequired,
  quantity: PropTypes.string.isRequired,
};

module.exports = Checkout;
