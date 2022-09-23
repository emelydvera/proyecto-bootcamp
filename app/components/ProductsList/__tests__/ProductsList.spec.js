const React = require('react');
const ProductsList = require('..');
const { render, screen } = require('@testing-library/react');
const { I18n } = require('nordic/i18n');
const { data } = require('../../../../mocks/test/get/https/api.mercadolibre.com/sites/MCO/search?limit=10&offset=0&page=1&q=tablet.json')


describe('ProductsList', () => {

  const i18n = new I18n({
    translations: []
  })

  it('Should render correctly', () => {
    const { asFragment } = render(<ProductsList products={data.results} i18n={i18n} />);;
    expect(asFragment()).toMatchSnapshot();
  })

  describe('Tests when the products are found', () => {

    it('Should render all the products cards', () => {
      render(<ProductsList products={data.results} i18n={i18n} />);
      const productsCard = document.querySelectorAll(".card")
      expect(productsCard.length).toBe(10)
    })

    it('Should not render "not products found" message when products are found', () => {
      render(<ProductsList products={data.results} i18n={i18n} />);
      const message = screen.queryByText(/No se encontraron productos/);
      expect(message).toBe(null);
    })

  })

  describe('tests when products are not found', () => {

    it('Should not render products cards when products are not found', () => {
      render(<ProductsList products={[]} i18n={i18n} />);
      const productsCard = document.querySelectorAll(".card")
      expect(productsCard.length).toBe(0)
    })

    it('Should render "not products found" message when products are not found', () => {
      render(<ProductsList products={[]} i18n={i18n} />);
      const message = screen.queryByText(/No se encontraron productos/);
      expect(message).toBeInTheDocument();
    })

  })



})