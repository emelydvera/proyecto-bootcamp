const React = require("react");
const { useState } = React;
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

  const handleClick = (id, quantityToBuy) => {
    window.location.href = `/comprar?productId=${id}&quantityToBuy=${quantityToBuy}`;
  };

  return (
    <>
      <Image
        aria-label={i18n.gettext("imagen del producto")}
        src={pictures[0].secure_url}
        alt={title}
      />
      <h2 aria-label={i18n.gettext("nombre del producto")}>
        {i18n.gettext(title)}
      </h2>
      <p aria-label={i18n.gettext("precio del producto")}>
        {i18n.gettext(`precio: ${price}`)}
      </p>
      <p aria-label={i18n.gettext("tipo de envio")}>
        {i18n.gettext(`Tipo de envio:
        ${shipping.free_shipping ? "Envio gratis" : "No envio gratis"}`)}
      </p>
      <p aria-label={i18n.gettext("condicion del producto")}>
        {i18n.gettext(`
      condicion del producto:
      ${
        condition === "new"
          ? "Nuevo"
          : condition === "not_specified"
          ? "No Especifica"
          : condition === "used"
          ? "Usado"
          : ""
      }`)}
      </p>
      {!quantity || !amount ? null : (
        <p>{i18n.gettext(`cuotas: ${quantity} de ${amount} cada cuota`)}</p>
      )}
      <p aria-label={i18n.gettext("unidades vendidas")}>
        {i18n.gettext(`unidades vendidas: ${sold_quantity}`)}
      </p>
      <p aria-label={i18n.gettext("descripcion producto")}>
        {i18n.gettext(`descripcion: ${description.plain_text}`)}
      </p>
      <InputQuantity
        availableQuantity={available_quantity}
        setError={setError}
        setQuantityToBuy={setQuantityToBuy}
        quantityToBuy={quantityToBuy}
      />
      {error ? <span>{error}</span> : null}
      <button
        onClick={() => handleClick(id, quantityToBuy)}
        type="submit"
        disabled={error}
        aria-label={i18n.gettext("comprar producto")}
      >
        {i18n.gettext("Comprar")}
      </button>
    </>
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
