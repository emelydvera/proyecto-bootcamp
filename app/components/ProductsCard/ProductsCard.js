const React = require('react');
const Image = require("nordic/image");

const ProductsCard = ({ product }) => {

    const { id, title, price, address, thumbnail } = product

    return (
        <>
            <li
                key={id}
            >
                <figure>
                    <a href={`/product/${id}`}>
                        <Image src={thumbnail} alt='producto' />
                    </a>
                    <figcaption>{title}</figcaption>
                </figure>
                <p>{price}</p>
                <p>{title}</p>
                <span>{address?.state_name}</span>

            </li>

        </>
    )
}

module.exports = ProductsCard;