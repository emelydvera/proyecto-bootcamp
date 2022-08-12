const React = require('react');
const ProductsCard = require('../ProductsCard/ProductsCard');

const ProductsList = (props) => {

    const { products } = props;

    return (
        <>
            <ul>
                {
                     products.length > 0 ?
                     products.map(product => {
                        return (
                            <ProductsCard key={product.id} product={product} />
                        )

                    })
                    :
                    <p>No se encontraron productos</p>
                }
            </ul>
        </>
    )
}

module.exports = ProductsList;