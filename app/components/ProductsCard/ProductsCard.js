const React = require("react");
const Image = require("nordic/image");

const ProductsCard = ({ product, i18n }) => {
  const { id, title, price, address, thumbnail, installments } = product;
  const { quantity, amount } = installments;

  return (
    <>
      <li key={id} role={i18n.gettext("presentation")}>
        <figure>
          <a href={`/product/${id}?quantity=${quantity}&amount=${amount}`}>
            <Image src={thumbnail} alt={i18n.gettext("producto")} />
          </a>
          <figcaption>{i18n.gettext(title)}</figcaption>
        </figure>
        <p aria-label={i18n.gettext("precio del producto")}>${price}</p>
        <p aria-label={i18n.gettext("título del producto")}>
          {i18n.gettext(title)}
        </p>
        <span aria-label={i18n.gettext("ubicación del producto")}>
          {i18n.gettext(
            address ? (address.state_name ? address.state_name : "") : ""
          )}
        </span>
      </li>
    </>
  );
};

module.exports = ProductsCard;
