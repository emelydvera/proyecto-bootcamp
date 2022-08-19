const React = require("react");
const PropTypes = require("prop-types");
const Image = require("nordic/image");

const ProductsCard = ({ product, i18n, index }) => {
  const { id, title, price, address, thumbnail, installments } = product;

  return (
    <>
      <li key={id} role="presentation">
      <figure>
          {!installments?.quantity || !installments?.amount ? (
            <a href={`/product/${id}`}>
              <Image
                src={thumbnail}
                alt={i18n.gettext("imagen del producto")}
                tabIndex={`${index + 1}4`}
              />
            </a>
          ) : (
            <a
              href={`/product/${id}?quantity=${installments.quantity}&amount=${installments.amount}`}
            >
              <Image
                src={thumbnail}
                alt={i18n.gettext("imagen del producto")}
                tabIndex={`${index + 1}4`}
              />
            </a>
          )}
          <figcaption>{i18n.gettext(title)}</figcaption>
        </figure>
        <p
          aria-label={i18n.gettext(`precio del producto: $${price}`)}
          tabIndex={`${index + 1}5`}
        >
          ${price}
        </p>
        <p tabIndex={`${index + 1}3`}>{i18n.gettext(title)}</p>
        <span
          aria-label={`ubicación del producto ${
            address ? (address.state_name ? address.state_name : "") : ""
          }`}
          tabIndex={`${index + 1}6`}
        >
          {i18n.gettext(
            address ? (address.state_name ? address.state_name : "") : ""
          )}
        </span>
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
    address: PropTypes.shape({}).isRequired,
    thumbnail: PropTypes.string.isRequired,
    installments: PropTypes.shape({}),
  }).isRequired,
  index: PropTypes.number,
};

module.exports = ProductsCard;
