const React = require("react");
const Image = require("nordic/image");
const PropTypes = require("prop-types");

const ProductView = ({ product, i18n, description, quantity, amount }) => {
  const { thumbnail, title, price, sold_quantity, condition, shipping } =
    product;

  return (
    <>
      <Image aria-label="imagen del producto" src={thumbnail} alt={title} />
      <h2 aria-label="nombre del producto">{title}</h2>
      <p aria-label="precio del producto">precio: ${price}</p>
      <p aria-label="tipo de envio">
        {i18n.gettext(`Tipo de envio:
        ${shipping.free_shipping ? "Envio gratis" : "No envio gratis"}`)}
      </p>
      <p aria-label="condicion del producto">
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
      <p>{i18n.gettext(`cuotas: ${quantity} de ${amount} cada cuota`)}</p>
      <p aria-label="unidades vendidas">
        {i18n.gettext(`unidades vendidas: ${sold_quantity}`)}
      </p>
      <p aria-label="descripcion producto">
        {i18n.gettext(`descripcion: ${description.plain_text}`)}
      </p>
      <button aria-label={i18n.gettext("comprar producto")}>
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
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    thumbnail: PropTypes.string.isRequired,
    installments: PropTypes.shape({}),
    shipping: PropTypes.shape({}),
    description: PropTypes.shape({}),
  }).isRequired,
  index: PropTypes.number,
};

module.exports = ProductView;
