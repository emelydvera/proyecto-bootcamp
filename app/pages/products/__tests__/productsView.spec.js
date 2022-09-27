const React = require('react');
const { render, screen } = require('@testing-library/react');
const { I18n } = require('nordic/i18n');
const View = require('../view');


const { data } = require('../../../../mocks/test/get/https/api.mercadolibre.com/sites/MCO/search?limit=10&offset=0&page=1&q=tablet.json');

const i18n = new I18n({
  translations: []
});


describe('Products View Tests', () => {

  const props = {
    products: data.results,
    i18n,
    translations: {},
    baseUrl: '/listado',
    query: { q: 'tablet' },
    filters: data.filters,
    available_filters: data.available_filters,
    totalProducts: data.paging.primary_results,
  }

  it('Should render the view correctly', () => {

    const { asFragment } = render(
      <View {...props} />
    );
    expect(asFragment()).toMatchSnapshot();
  })

  it('Should show the breadcrumb if there is a path', () => {

    render(
      <View {...props} />
    );

    const breadcrumb = screen.queryByLabelText(/lista de páginas/i)
    expect(breadcrumb).not.toBe(null);
  })

  it('Should not show the breadcrumb if there is not a path', () => {

    render(
      <View {...props} filters={[]} />
    );
    const breadcrumb = screen.queryByLabelText(/lista de páginas/i)
    expect(breadcrumb).toBe(null);
  })

})