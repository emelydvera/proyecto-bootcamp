const React = require("react");
const Image = require("nordic/image");

const ProductsCard = ({ product, i18n }) => {
  const { id, title, price, address, thumbnail } = product;

  return (
    <>
      <li key={id}>
        <figure>
          <a href={`/product/${id}`}>
            <Image src={thumbnail} alt={i18n.gettext("producto")} />
          </a>
          <figcaption>{i18n.gettext(title)}</figcaption>
        </figure>
        <p>${price}</p>
        <p>{i18n.gettext(title)}</p>
        <span>
          {i18n.gettext(
            address ? (address.state_name ? address.state_name : "") : ""
          )}
        </span>
      </li>
    </>
  );
};

module.exports = ProductsCard;
