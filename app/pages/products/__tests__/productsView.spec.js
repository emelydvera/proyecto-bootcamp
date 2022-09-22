const React = require('react');
const { render, screen } = require('@testing-library/react');
const { I18n, I18nProvider } = require('nordic/i18n');
const View = require('../view');


const { data } = require('../../../../mocks/test/get/https/api.mercadolibre.com/sites/MCO/search?limit=10&offset=0&page=1&q=tablet.json');

const i18n = new I18n({
  translations: {}
});


describe('Products View Tests', () => {

  const props = {
    products: data.results,
    i18n,
    translations: {},
    baseUrl: '/listado',
    query: { q: 'Macbook' },
    filters: data.filters,
    available_filters: data.available_filters,
    totalProducts: data.paging.primary_results,
  }

  it('Should render the view correctly', () => {
    const { asFragment } = render(
      <I18nProvider i18n={i18n}>
        <View {...props} />
      </I18nProvider>
    );
    expect(asFragment()).toMatchSnapshot();
  })

})