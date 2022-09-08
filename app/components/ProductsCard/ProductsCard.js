const React = require("react");
const PropTypes = require("prop-types");
const Image = require("nordic/image");
const Card = require("@andes/card");
const { CardContent } = require("@andes/card");

const ProductsCard = ({ product, i18n, index }) => {
  const { id, title, price, address, thumbnail, installments } = product;

  return (
    <>
      <Card>
        <CardContent className="card" role="presentation">
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
            <div className="card__description__main-info">
              <p
                className="price"
                aria-label={i18n.gettext(`precio del producto: $${price}`)}
                tabIndex={`${index + 1}5`}
              >
                ${price}
              </p>
              <h2 className="title" tabIndex={`${index + 1}3`}>
                {title}
              </h2>
            </div>
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
        </CardContent>
      </Card>
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
