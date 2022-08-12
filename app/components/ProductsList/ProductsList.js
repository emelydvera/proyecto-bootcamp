const React = require('react');
const {useState} = React
const Filter = require('../Filter');
const ProductsCard = require('../ProductsCard');

const ProductsList = (props) => {

    const { products } = props;
    const [productsState, setProductsState] = useState(products);

    return (
        <>
            <Filter products={products} setProductsState={setProductsState}/>
            <ul>
                {
                     productsState.length > 0 ?
                     productsState.map(product => {
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