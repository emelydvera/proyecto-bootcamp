const React = require("react");
const { useState } = React;
const Image = require("nordic/image");
const PropTypes = require("prop-types");
const Button = require("@andes/button");
const MoneyAmount = require("@andes/money-amount");
const Shipping24 = require("@andes/icons/Shipping24");
const InputQuantity = require("../InputQuantity");
const ProductAttributes = require("../ProductAttributes");

const ProductView = ({ product, i18n, description, quantity, amount }) => {
  const {
    pictures,
    title,
    price,
    sold_quantity,
    condition,
    shipping,
    available_quantity,
    attributes,
    id,
    currency_id,
  } = product;

  const [error, setError] = useState("");
  const [quantityToBuy, setQuantityToBuy] = useState('1');
  const [mainImage, setMainImage] = useState(0);

  const amountCents = amount?.toString().split(".");
  const priceCents = price.toLocaleString("de-DE").split(",");

  const handleClick = (id, quantityToBuy) => {
    window.location.href = `/comprar?productId=${id}&quantityToBuy=${quantityToBuy}`;
  };

  const handleOver = (i) => {
    setMainImage(i);
  };

  return (
    <section>
      <div className="product">
        <div className="product__img">
          <div className="product__img__carousel">
            {pictures.length > 0 &&
              pictures.map((p, i) => {
                return (
                  i <= 6 && (
                    <div
                      key={p.id}
                      className={`image__container ${mainImage === i ? "active" : ""
                        }`}
                    >
                      <Image
                        className="product__image "
                        onMouseOver={() => {
                          handleOver(i);
                        }}
                        aria-label={i18n.gettext("imagen del producto")}
                        src={p.secure_url}
                        alt={title}
                      />
                    </div>
                  )
                );
              })}
          </div>

          <figure tabIndex={9} aria-label={i18n.gettext('Imagen de {0}', title)}>
            <Image
              src={pictures[mainImage].secure_url}
              alt={i18n.gettext("producto")}
              lazyload={true}
              className="product-img-main"
            />
            <figcaption>{i18n.gettext(title)}</figcaption>
          </figure>
        </div>
        <h2>{i18n.gettext("Descripción del producto")}</h2>
        <p tabIndex={19}>{i18n.gettext(description.plain_text)}</p>
        <ProductAttributes i18n={i18n} attributes={attributes} />
      </div>

      <div className="info">
        <span className="info__use" tabIndex={10} aria-label={i18n.gettext(
          condition === "new"
            ? "Nuevo"
            : condition === "not_specified"
              ? "No Especifica"
              : condition === "used"
                ? "Usado"
                : ""
        )}>
          {i18n.gettext(
            condition === "new"
              ? "Nuevo"
              : condition === "not_specified"
                ? "No Especifica"
                : condition === "used"
                  ? "Usado"
                  : ""
          )}
        </span>
        <span
          className="info__use"
          tabIndex={11}
          aria-label={i18n.gettext('{0} productos vendidos', sold_quantity)}
        >
          {" "}
          {i18n.gettext('- ${0} vendidos', sold_quantity)}
        </span>

        <h2 tabIndex={12} aria-label={i18n.gettext(title)}>
          {i18n.gettext(title)}
        </h2>

        <div
          tabIndex={13}>
          <MoneyAmount
            className="info__price"
            aria-label={i18n.gettext('el producto tiene un precio de ${0}', price)}
            amount={{
              fraction: i18n.gettext(priceCents[0]),
              currencyId: currency_id,
              cents: priceCents[1]
                ? i18n.gettext(priceCents[1])
                : i18n.gettext("00"),
            }}
            centsType="superscript"
            size={48}
          />
        </div>

        {!quantity || !amount ? null : (
          <div
            className="info__quantity-amount"
            tabIndex={14}
            aria-label={i18n.gettext(
              'Pagalo en ${0} cuotas, cada una de  ${1}', quantity, amount
            )}
          >
            {quantity} cuotas de{" "}
            {
              <MoneyAmount
                className="info__amount"
                amount={{
                  currencyId: currency_id,
                  fraction: i18n.gettext(
                    parseInt(amountCents[0]).toLocaleString("de-DE")
                  ),
                  symbol: "$",
                  cents: amountCents[1]
                    ? i18n.gettext(amountCents[1])
                    : i18n.gettext("00"),
                }}
                centsType="superscript"
                size={16}
              />
            }{" "}
            cada una
          </div>
        )}
        <p
          className="info__available"
          tabIndex={16}
          aria-label={i18n.gettext(
            'hay ${0} unidades disponibles', available_quantity
          )}
        >
          {i18n.gettext('Cantidad disponible: {0}', available_quantity)}
        </p>

        {shipping.free_shipping ? (
          <div className="info__shipping">
            <Shipping24 color=" #00A650" />
            <p
              tabIndex={17}
              aria-label={i18n.gettext(`el envio es gratis`)}
            >
              {i18n.gettext("Envío gratis")}
            </p>
          </div>
        ) : (
          ""
        )}
        <div className="buy__container">
          <InputQuantity
            className="buy__input"
            tabIndex={18}
            availableQuantity={available_quantity}
            error={error}
            setError={setError}
            setQuantityToBuy={setQuantityToBuy}
            quantityToBuy={quantityToBuy}
          />
          <Button
            className="buy__button"
            tabIndex={18}
            onClick={() => handleClick(id, quantityToBuy)}
            type="submit"
            disabled={error ? true : false}
            fullWidth={true}
            aria-label={i18n.gettext("botón para comprar producto")}
          >
            {i18n.gettext("Comprar")}
          </Button>
        </div>
      </div>
    </section>
  );
};

ProductView.propTypes = {
  i18n: PropTypes.shape({
    gettext: PropTypes.func.isRequired,
  }).isRequired,
  product: PropTypes.shape({
    pictures: PropTypes.arrayOf(
      PropTypes.shape({
        secure_url: PropTypes.string,
      })
    ).isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    sold_quantity: PropTypes.number.isRequired,
    condition: PropTypes.string.isRequired,
    shipping: PropTypes.shape({}),
    available_quantity: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
    currency_id: PropTypes.string.isRequired,
  }).isRequired,
  description: PropTypes.shape({
    plain_text: PropTypes.string.isRequired,
  }),
  quantity: PropTypes.string,
  amount: PropTypes.string,
};

module.exports = ProductView;
