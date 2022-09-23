const React = require('react');
const { render, screen, fireEvent } = require('@testing-library/react');
const ProductView = require('../ProductView');
const { data } = require('../../../../mocks/test/get/https/api.mercadolibre.com/items/MLA1104983845.json')


describe(' Component <ProductView/>', () => {

    let component;

    const props = {
        i18n: { gettext: text => text },
        product: data,
        description: {
            plain_text: 'descripcion del producto'
        },
        quantity: '852',
        amount: '1200',
    }
    beforeEach(() => {

        component = render(<ProductView {...props} />)

    })

    it('should render the components', () => {

        const { asFragment } = component;
        expect(asFragment()).toMatchSnapshot();

    });
})