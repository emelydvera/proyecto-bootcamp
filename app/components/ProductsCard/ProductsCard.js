const React = require("react");
const PropTypes = require("prop-types");
const Image = require("nordic/image");
const Card = require("@andes/card");
const { CardContent } = require("@andes/card");
const MoneyAmount = require("@andes/money-amount");

const ProductsCard = ({ product, i18n, index }) => {
  const {
    id,
    title,
    price,
    address,
    thumbnail,
    installments,
    shipping: { free_shipping },
  } = product;

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
                  tabIndex={`${index + 1}5`}
                />
              </a>
            </figure>
          </div>
          <div className="card__description">
            <div className="card__description__main-info">
              <div
                class="money__and__shipping"
                aria-label={i18n.gettext(
                  `precio del producto: $${price} ${
                    free_shipping ? "Envío gratis" : ""
                  }`
                )}
                tabIndex={`${index + 1}4`}
              >
                <MoneyAmount
                  className="price"
                  amount={{
                    currencyId: undefined,
                    fraction: `${price.toLocaleString().replace(/,/g, ".")}`,
                    symbol: "$",
                  }}
                  size={24}
                ></MoneyAmount>

                {free_shipping ? (
                  <span className="shipping">{i18n.gettext("Envío")}</span>
                ) : (
                  ""
                )}
              </div>
              <h2 className="title" tabIndex={`${index + 1}3`}>
                {title}
              </h2>
            </div>
            <span
              className="card__description__ubication"
              aria-label={
                ("ubicación del producto ${0}",
                address &&
                  i18n.gettext(
                    "{0}",
                    address.state_name ? address.state_name : ""
                  ))
              }
              tabIndex={`${index + 1}4`}
            >
              {address &&
                i18n.gettext(
                  "{0}",
                  address.state_name ? address.state_name : ""
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
    shipping: PropTypes.shape({
      free_shipping: PropTypes.bool,
    }),
  }).isRequired,
  index: PropTypes.number,
};

module.exports = ProductsCard;
