const React = require('react');
const ProductsList = require('..');
const { render, screen } = require('@testing-library/react');
const { I18n } = require('nordic/i18n');
const { data } = require('../../../../mocks/test/get/https/api.mercadolibre.com/sites/MCO/search?limit=10&offset=0&page=1&q=tablet.json')


describe('ProductsList', () => {

  const i18n = new I18n({
    translations: {}
  })

  let component;
  beforeEach(() => {
    component = render(<ProductsList products={data.results} i18n={i18n} />);
  })

  it('Should render correctly', () => {
    const { asFragment } = component;
    expect(asFragment()).toMatchSnapshot();
  })

  it('Should render all the products cards', () => {
    const productsCard = document.querySelectorAll(".card")
    expect(productsCard.length).toBeGreaterThan(0)
  })

  it('Should show not products found message, ', () => {
    component = render(<ProductsList products={[]} i18n={i18n} />);
    const message = screen.queryByText(/No se encontraron productos/);
    expect(message).toBeInTheDocument();
  })

})