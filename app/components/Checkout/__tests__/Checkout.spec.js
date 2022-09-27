const React = require('react');
const { screen, render } = require('@testing-library/react');
const { within } = require('@testing-library/dom');
const Checkout = require('..');
const { data } = require('../../../../mocks/test/get/https/api.mercadolibre.com/items/MLA1104983845.json');

describe('Checkout component', () => {

    it('should render correctly', () => {
        const props = {
            product: data,
            quantity: '1',
        };
        const { asFragment } = render(<Checkout {...props} />);
        expect(asFragment()).toMatchSnapshot();
    });

    it('total price should be unit price multiplied by stock quantity available when products quantity selected is higher than the stock quantity available', () => {
        const props = {
            product: data,
            quantity: '2',
        };
        render(<Checkout {...props} />);
        const moneyAmount = document.querySelector('#checkout > div:nth-child(6) > span');
        let result = within(moneyAmount).getByText('30.999');
        expect(result).toHaveTextContent('30.999');
    });

    it('must display a shortened version of the title if it is longer than 70 characters', () => {
        const props = {
            product: {
                ...data,
                title: 'Apple Macbook Air (13 Pulgadas, 2020, Chip M1, 256 Gb De Ssd, 8 Gb De Ram) - Gris Espacial',
            },
            quantity: '1',
        };

        render(<Checkout {...props} />);
        const title = screen.getByRole('heading', {
            name: /apple macbook air \(13 pulgadas, 2020, chip m1, 256 gb de ssd, 8 gb \.\.\./i
        });
        expect(title).toHaveTextContent(/apple macbook air \(13 pulgadas, 2020, chip m1, 256 gb de ssd, 8 gb \.\.\./i);
    });

    it('must show shipping with cost to calculate if the product does not have free shipping', () => {
        const props = {
            product: {
                ...data,
                shipping: { free_shipping: false },
            },
            quantity: '1',
        };
        render(<Checkout {...props} />);
        const shipping = screen.getByText(/envío con costo a determinar/i);
        expect(shipping).toHaveTextContent(/envío con costo a determinar/i);

    });
});