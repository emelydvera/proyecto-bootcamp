const React = require('react');
const PropTypes = require("prop-types");
const { useI18n } = require("nordic/i18n");
const ProductInfoBuy = require('../ProductInfoBuy');


const ProductInfo = ({ product, quantity, amount }) => {

    const {
        title,
        sold_quantity,
        condition,
    } = product;

    const { i18n } = useI18n();

    return (
        <div className="info">
            <span
                className="info__use"
                tabIndex={10}
                aria-label={i18n.gettext(
                    condition === "new"
                        ? "Nuevo"
                        : condition === "not_specified"
                            ? "No Especifica"
                            : condition === "used"
                                ? "Usado"
                                : ""
                )}
            >
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
                aria-label={i18n.gettext("{0} productos vendidos", sold_quantity)}
            >
                {" "}
                {i18n.gettext("- {0} vendidos", sold_quantity)}
            </span>
            <h2 tabIndex={12} aria-label={i18n.gettext(title)}>
                {i18n.gettext(title)}
            </h2>
            <ProductInfoBuy product={product} quantity={quantity} amount={amount} />
        </div>
    )
}

ProductInfo.propTypes = {
    product: PropTypes.shape({
        title: PropTypes.string.isRequired,
        sold_quantity: PropTypes.number.isRequired,
        condition: PropTypes.string.isRequired,
    }).isRequired,
    quantity: PropTypes.string,
    amount: PropTypes.string,
};

module.exports = ProductInfo;