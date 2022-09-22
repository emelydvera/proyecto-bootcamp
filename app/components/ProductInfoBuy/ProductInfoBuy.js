const React = require("react");
const { useState } = React;
const { useI18n } = require("nordic/i18n");
const PropTypes = require("prop-types");
const Button = require("@andes/button");
const MoneyAmount = require("@andes/money-amount");
const Shipping24 = require("@andes/icons/Shipping24");
const InputQuantity = require("../InputQuantity");
const amountFormater = require("../../utils/priceFormater");


const ProductInfoBuy = ({ product, quantity, amount }) => {

    const {
        price,
        shipping,
        available_quantity,
        id,
        currency_id,
    } = product;

    const { i18n } = useI18n();
    const [error, setError] = useState("");
    const [quantityToBuy, setQuantityToBuy] = useState("1");

    const { fraction, cents } = amountFormater(price);

    const amountCents = amountFormater(amount);

    const handleClick = (id, quantityToBuy) => {
        window.location.href = `/comprar?productId=${id}&quantityToBuy=${quantityToBuy}`;
    };


    return (
        <>
            <div tabIndex={13}>
                <MoneyAmount
                    className="info__buy__price"
                    aria-label={i18n.gettext(
                        "el producto tiene un precio de ${0}",
                        price
                    )}
                    amount={{
                        fraction: i18n.gettext(fraction),
                        currencyId: currency_id,
                        cents: cents
                    }}
                    centsType="superscript"
                    size={48}
                />
            </div>
            {!quantity || !amount ? null : (
                <div
                    className="info__buy__quantity-amount"
                    tabIndex={14}
                    aria-label={i18n.gettext(
                        "Pagalo en ${0} cuotas, cada una de  ${1}",
                        quantity,
                        amount
                    )}
                >
                    {quantity} cuotas de{" "}
                    {
                        <MoneyAmount
                            className="info__buy__amount"
                            amount={{
                                currencyId: currency_id,
                                fraction: i18n.gettext(amountCents.fraction),
                                symbol: "$",
                                cents: i18n.gettext(amountCents.cents),
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
                    "hay ${0} unidades disponibles",
                    available_quantity
                )}
            >
                {i18n.gettext("Cantidad disponible: {0}", available_quantity)}
            </p>
            {shipping.free_shipping ? (
                <div className="info__shipping">
                    <Shipping24 color=" #00A650" />
                    <p tabIndex={17} aria-label={i18n.gettext(`el envio es gratis`)}>
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
        </>
    )

}

ProductInfoBuy.propTypes = {
    product: PropTypes.shape({
      price: PropTypes.number.isRequired,
      shipping: PropTypes.shape({}),
      available_quantity: PropTypes.number.isRequired,
      id: PropTypes.string.isRequired,
      currency_id: PropTypes.string.isRequired,
    }).isRequired,
    quantity: PropTypes.string,
    amount: PropTypes.string,
  };

module.exports = ProductInfoBuy