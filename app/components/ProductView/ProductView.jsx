const React = require("react");
const Image = require("nordic/image");

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
      <button aria-label="comprar producto">Comprar</button>
    </>
  );
};

module.exports = ProductView;
