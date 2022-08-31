const React = require("react");
const { useState, useEffect } = React;
const Image = require("nordic/image");
const PropTypes = require("prop-types");
const InputQuantity = require("../InputQuantity");

const ProductView = ({ product, i18n, description, quantity, amount }) => {
  const {
    pictures,
    title,
    price,
    sold_quantity,
    condition,
    shipping,
    available_quantity,
    id,
  } = product;

  const [error, setError] = useState("");
  const [quantityToBuy, setQuantityToBuy] = useState("1");
  const [mainImage, setMainImage] = useState(0);

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
                      className={`image__container ${
                        mainImage === i ? "active" : ""
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

          <figure tabIndex={9} aria-label={i18n.gettext(` imagen de ${title}`)}>
            <Image
              src={pictures[mainImage].secure_url}
              alt={i18n.gettext("producto")}
              lazyload={true}
              className="product-img-main"
            />
            <figcaption>{i18n.gettext(title)}</figcaption>
          </figure>
        </div>

        <p tabIndex={18}>{i18n.gettext(description.plain_text)}</p>
      </div>

      <div className="info">
        <span tabIndex={10} aria-label={`${condition}`}>
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
          tabIndex={11}
          aria-label={i18n.gettext(`${sold_quantity} productos vendidos`)}
        >
          {" "}
          {i18n.gettext(`| ${sold_quantity} vendidos`)}
        </span>
        <h3 tabIndex={12} aria-label={i18n.gettext(`${title}`)}>
          {i18n.gettext(title)}
        </h3>
        <h2
          tabIndex={13}
          aria-label={i18n.gettext(`el producto tiene un precio de ${price}`)}
        >
          {i18n.gettext(`$ ${new Intl.NumberFormat().format(price)}`)}
        </h2>

        {!quantity || !amount ? null : (
          <p tabIndex={14}>
            {i18n.gettext(
              ` ${quantity} cuotas de $ ${new Intl.NumberFormat().format(
                amount
              )} cada una`
            )}
          </p>
        )}

        <p
          tabIndex={16}
          aria-label={i18n.gettext(
            `hay ${available_quantity} unidades disponibles`
          )}
        >{`Cantidad disponible: ${available_quantity}`}</p>
        <p
          tabIndex={17}
          aria-label={i18n.gettext(`el envio es ${shipping.free_shipping}`)}
        >
          {shipping.free_shipping ? "Envío gratis" : "No envío gratis"}
        </p>

        <div className="buy__container">
          <InputQuantity
            tabIndex={19}
            availableQuantity={available_quantity}
            setError={setError}
            setQuantityToBuy={setQuantityToBuy}
            quantityToBuy={quantityToBuy}
          />
          {<span className="error">{error && error}</span>}
          <button
            tabIndex={20}
            onClick={() => handleClick(id, quantityToBuy)}
            type="submit"
            disabled={error}
            aria-label={i18n.gettext("botón para comprar producto")}
          >
            {i18n.gettext("Comprar")}
          </button>
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
  }).isRequired,
  description: PropTypes.shape({
    plain_text: PropTypes.string.isRequired,
  }),
  quantity: PropTypes.string,
  amount: PropTypes.string,
};

module.exports = ProductView;
