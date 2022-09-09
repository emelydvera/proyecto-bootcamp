const React = require("react");
const PropTypes = require("prop-types");
const Image = require("nordic/image");
const Card = require("@andes/card");
const { CardContent } = require("@andes/card");
const MoneyAmount = require("@andes/money-amount");
const priceFormater = require("../../utils/priceFormater");

const ProductsCard = ({ product, i18n, index }) => {
  const {
    id,
    title,
    price,
    address,
    thumbnail,
    installments,
    currency_id,
    shipping: { free_shipping },
  } = product;

  const { fraction, cents } = priceFormater(price);

  const shippingString = free_shipping ? i18n.gettext("Envío gratis") : "";

  return (
    <>
      <Card component="article">
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
                  src={thumbnail.replace("http", "https")}
                  alt={i18n.gettext("imagen del producto")}
                  tabIndex={`${index + 1}5`}
                />
              </a>
            </figure>
          </div>
          <div className="card__description">
            <div className="card__description__main-info">
              <div
                className="money__and__shipping"
                aria-label={i18n.gettext(
                  "precio del producto: ${0}, {1}",
                  price,
                  shippingString
                )}
                tabIndex={`${index + 1}4`}
              >
                <MoneyAmount
                  className="price"
                  amount={{
                    currencyId: currency_id,
                    fraction,
                    cents,
                    symbol: "$",
                  }}
                  size={24}
                  centsType="superscript"
                ></MoneyAmount>
                {free_shipping && (
                  <span className="shipping">{i18n.gettext("Envío")}</span>
                )}
              </div>
              <h2 className="title" tabIndex={`${index + 1}3`}>
                {title}
              </h2>
            </div>
            <span
              className="card__description__location"
              aria-label={
                address.state_name
                  ? i18n.gettext(
                      "Ubicación del producto: {0}",
                      address.state_name
                    )
                  : i18n.gettext("Sin ubicación")
              }
              tabIndex={`${index + 1}4`}
            >
              {i18n.gettext(address?.state_name)}
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
    currency_id: PropTypes.string,
  }).isRequired,
  index: PropTypes.number,
};

module.exports = ProductsCard;
