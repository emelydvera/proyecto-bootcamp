const React = require('react');
const FilterValue = require("../FilterValue");
const { render, screen, fireEvent } = require('@testing-library/react');
const { getByText } = screen;
const { data } = require('../../../../mocks/test/get/https/api.mercadolibre.com/sites/MCO/search?limit=10&offset=0&page=1&q=tablet.json');
const UrlGenerator = require('../../../utils/urlGenerator');
jest.mock('../../../utils/urlGenerator')

describe('Component <FilterValue/>', () => {

    let component;
    const urlGenerator= new UrlGenerator()
    const props = {
        id: data.available_filters.id,
        value: data.available_filters[0].values[0],
        urlGenerator: urlGenerator
    }

    beforeEach(() => {

        component = render(<FilterValue {...props} />)

    })

    it('should render the components', () => {
        
        const { asFragment } = component;
        expect(asFragment()).toMatchSnapshot();

    });

    it('should call setFilter function on click', () => {

        const p = getByText(/Todas las tiendas oficiales/i);
        fireEvent.click(p);
        expect(urlGenerator.setFilter).toHaveBeenCalled();

    });

})