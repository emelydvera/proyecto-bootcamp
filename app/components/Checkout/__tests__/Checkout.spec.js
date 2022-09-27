const React = require('react');
const { screen, render, fireEvent } = require('@testing-library/react');
const Checkout = require('../Checkout');
const { data } = require('../../../../mocks/test/get/https/api.mercadolibre.com/items/MLA1104983845.json');

describe('Checkout component', () => {
    let component;
    const props = {
        product: data,
        quantity: '1',
    };

    beforeEach(() => {
        component = render(<Checkout {...props} />);
    })

    it('should render correctly', () => {
        const { asFragment } = component;
        expect(asFragment()).toMatchSnapshot()
    })

})