const React = require('react');
const FilterValue = require("../FilterValue");
const { render, screen, fireEvent } = require('@testing-library/react');
const { I18n, I18nProvider } = require("nordic/i18n");
const { getByText } = screen;
const { data } = require('../../../../mocks/test/get/https/api.mercadolibre.com/sites/MCO/search?limit=10&offset=0&page=1&q=tablet.json');
const UrlGenerator = require('../../../utils/urlGenerator');


const i18n = new I18n({
    translations: {}
})

describe('Component <FilterValue/>', () => {

    let component;
    const props = {
        id: data.available_filters.id,
        value: data.available_filters[0].values[0],
        urlGenerator: new UrlGenerator()
    }

    beforeEach(() => {

        component = render(
            <I18nProvider i18n={i18n}>
                <FilterValue {...props} />
            </I18nProvider>
        )

    })

    it('should render the components', () => {

        const { asFragment } = component;
        expect(asFragment()).toMatchSnapshot();

    });

    it('should call setFilter function on click', () => {

        const urlGenerator= new UrlGenerator();
        const {setFilter } = urlGenerator
        console.log(urlGenerator);
        const p = getByText(/Todas las tiendas oficiales/i);
        fireEvent.click(p);
        expect(setFilter).toBeInstanceOf(Function);

    });

})