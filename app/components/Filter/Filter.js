const React = require('react');

const Filter = ({products, setProductsState}) => {


	const handleFilterProducts = (e) => {
		e.preventDefault();
		const [min, max] = e.target
		setProductsState(() =>
			products.filter( p => p.price >= min.value && p.price <= max.value  )
		)
	}

    return (
        <form onSubmit={handleFilterProducts}>
					<input type="number" placeholder='minimo' aria-label='Escriba el precio minimo' />
					<input type="number" placeholder='maximo' aria-label='Escriba el precio maximo' />
					<input type="submit" value="Filtrar" />
        </form>
    )
}

module.exports = Filter