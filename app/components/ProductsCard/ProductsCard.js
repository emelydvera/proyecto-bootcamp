const React = require("react");
const PropTypes = require("prop-types");
const Image = require("nordic/image");

const ProductsCard = ({ product, i18n, index }) => {
  const { id, title, price, address, thumbnail, installments } = product;

  return (
    <>
      <li className="card" key={id} role="presentation">
        <div className="card__image">
          <figure>
            <a
              href={
                !installments?.quantity || !installments?.amount
                  ? `/product/${id}`
                  : `/product/${id}?quantity=${installments.quantity}&amount=${installments.amount}`
              }
            >
              <Image
                className="card__image__img"
                src={thumbnail}
                alt={i18n.gettext("imagen del producto")}
                tabIndex={`${index + 1}4`}
              />
            </a>
          </figure>
        </div>
        <div className="card__description">
          <h2 className="card__description__title" tabIndex={`${index + 1}3`}>
            {i18n.gettext(title)}
          </h2>
          <p
            className="card__description__price"
            aria-label={i18n.gettext(`precio del producto: $${price}`)}
            tabIndex={`${index + 1}5`}
          >
            ${price}
          </p>
          <span
            className="card__description__ubication"
            aria-label={`ubicación del producto ${
              address ? (address.state_name ? address.state_name : "") : ""
            }`}
            tabIndex={`${index + 1}6`}
          >
            {i18n.gettext(
              address ? (address.state_name ? address.state_name : "") : ""
            )}
          </span>
        </div>
      </li>
    </>
  );
};

ProductsCard.propTypes = {
  i18n: PropTypes.shape({
    gettext: PropTypes.func.isRequired,
  }).isRequired,
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    address: PropTypes.shape({
      state_name: PropTypes.string.isRequired,
    }).isRequired,
    thumbnail: PropTypes.string.isRequired,
    installments: PropTypes.shape({
      quantity: PropTypes.number,
      amount: PropTypes.number,
    }),
  }).isRequired,
  index: PropTypes.number,
};

module.exports = ProductsCard;
