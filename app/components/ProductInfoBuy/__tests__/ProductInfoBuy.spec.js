const React = require('react');
const { render, screen, fireEvent } = require('@testing-library/react');
const { getByRole, getByText, queryByText } = screen
const ProductInfoBuy = require('../ProductInfoBuy');

describe('Component <ProductInfoBuy', () => {

    let originalLocation;

    beforeAll(() => {
        originalLocation = window.location;
        delete window.location;
        window.location = { href: '/' }
    });

    afterAll(() => {
        window.location = originalLocation;
    });

    const props = {
        product: {
            price: 1500,
            shipping: {
                free_shipping: true
            },
            available_quantity: 5,
            id: "MLA1104983845",
            currency_id: "ARS",
        },
        quantity: '2',
        amount: '1200',

    }

    it('should render the components', () => {

        let component = render(<ProductInfoBuy {...props} />)
        const { asFragment } = component;
        expect(asFragment()).toMatchSnapshot();

    });

    it('when clicking you should redirect to the checkout page', () => {

        render(<ProductInfoBuy {...props} />)
        const button = getByRole('button', { name: /botón para comprar producto/i })
        fireEvent.click(button);
        expect(window.location.href).toBe('/comprar?productId=MLA1104983845&quantityToBuy=1')

    })

    it('should render quantity and quantity if they have valid values', () => {

        render(<ProductInfoBuy {...props} />)
        const div = getByText(/cuotas de cada una/i);
        expect(div).toBeInTheDocument()

    })

    it('should not render quantity and quantity if they have invalid values', () => {

        const newProps = {
            product: {
                price: 1500,
                shipping: {
                    free_shipping: true
                },
                available_quantity: 5,
                id: "MLA1104983845",
                currency_id: "ARS",
            },
            quantity: undefined,
            amount: undefined,

        }

        render(<ProductInfoBuy {...newProps} />)
        expect(queryByText(/cuotas de cada una/i)).not.toBeInTheDocument();

    })


    it('should disable the button when there is an error', () => {

        render(<ProductInfoBuy {...props} />)
        const input = getByRole('spinbutton', { name: /ingrese la cantidad de productos a comprar/i })
        fireEvent.change(input, { target: { value: '8' } })
        const button = getByRole('button', { name: /botón para comprar producto/i })
        expect(button).toHaveAttribute('disabled');

    })

    it('should render a <div></div> if free shipping', () => {

        render(<ProductInfoBuy {...props} />)
        const div = getByRole('envio')
        expect(div).toBeInTheDocument()
    })

    it('should not render a <div></div> if not free shipping', () => {

        const newProps = {
            product: {
                price: 1500,
                shipping: {
                    free_shipping: false
                },
                available_quantity: 5,
                id: "MLA1104983845",
                currency_id: "ARS",
            },
            quantity: '2',
            amount: '1200',

        }

        render(<ProductInfoBuy {...newProps} />)
        expect(queryByText('envio')).not.toBeInTheDocument();

    })


})
