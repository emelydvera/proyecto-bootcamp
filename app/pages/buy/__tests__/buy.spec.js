const React = require('react');
const { render } = require('@testing-library/react');
const BuyView = require('../view');
const { data } = require('../../../../mocks/test/get/https/api.mercadolibre.com/items/MLA1104983845.json');

describe('Buy page view', () => {
    let component;
    const props = {
        product: data,
        quantityToBuy: '1',
        i18n: { gettext: text => text },
        translations: {},
    };
    beforeEach(() => {
        component = render(<BuyView {...props} />);
    });

    it('should render correctly', () => {
        const { asFragment } = component;
        expect(asFragment()).toMatchSnapshot()
    });

});