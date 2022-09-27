const React = require('react');
const Filter = require('..')
const { render, screen } = require('@testing-library/react');
const { data } = require('../../../../mocks/test/get/https/api.mercadolibre.com/sites/MCO/search?limit=10&offset=0&page=1&q=tablet.json')
const UrlGenerator = require('../../../utils/urlGenerator');
jest.mock('../../../utils/urlGenerator')

describe('Filter', () => {

  const props = {
    filters: data.filters,
    available_filters: data.available_filters,
    urlGenerator: new UrlGenerator(),
    totalProducts: data.paging.primary_results,
  }

  it('Should render correctly', () => {
    const { asFragment } = render(<Filter {...props} />);
    expect(asFragment()).toMatchSnapshot();
  })

})