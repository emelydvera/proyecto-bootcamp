const React = require('react');
const { render, screen, fireEvent } = require('@testing-library/react');
const FiltersApplied = require('..');
const { data } = require('../../../../mocks/test/get/https/api.mercadolibre.com/sites/MCO/search?limit=10&offset=0&page=1&q=tablet.json')

const UrlGenerator = require('../../../utils/urlGenerator');
jest.mock('../../../utils/urlGenerator')

describe('FiltersApplied', () => {


  beforeEach(() => {
    UrlGenerator.mockClear();
  })

  const filters = [
    {
      "id": "shipping",
      "name": "Tipo de entrega",
      "type": "text",
      "values": [
        {
          "id": "fulfillment",
          "name": "Full"
        }
      ]
    }
  ]

  it('Should render correctly', () => {
    const urlGenerator = new UrlGenerator();
    const { asFragment } = render(<FiltersApplied filters={filters} urlGenerator={urlGenerator} />);
    expect(asFragment()).toMatchSnapshot();
  })

  it('Should render the tag of the filter applied', () => {
    const urlGenerator = new UrlGenerator();
    render(<FiltersApplied filters={filters} urlGenerator={urlGenerator} />);
    const tagFilter = screen.queryByText(/Full/);
    expect(tagFilter).toBeInTheDocument()
  })

  it('Should call the urlGenerator method to remove the filter when the tag delete button is clicked', () => {
    const urlGenerator = new UrlGenerator();
    render(<FiltersApplied filters={filters} urlGenerator={urlGenerator} />);
    const deleteButton = screen.queryByRole(/button/);
    expect(urlGenerator.removeFilter).toBeCalledTimes(0);
    fireEvent.click(deleteButton)
    expect(urlGenerator.removeFilter).toBeCalledTimes(1);
    expect(urlGenerator.removeFilter).toBeCalledWith("shipping");
  })

  it('Should set the filter category when the category is deleted ', () => {
    const urlGenerator = new UrlGenerator();
    render(<FiltersApplied filters={[data.filters[0]]} urlGenerator={urlGenerator} />);
    const deleteButton = screen.queryByRole(/button/);
    expect(urlGenerator.setFilter).toBeCalledTimes(0);
    fireEvent.click(deleteButton)
    expect(urlGenerator.setFilter).toBeCalledTimes(1);
    expect(urlGenerator.setFilter).toBeCalledWith("category", "MCO432947");
  })

  it('Should not call the urlGenerator method when the category path_from_root length is less than 2  ', () => {
    const urlGenerator = new UrlGenerator();

    const filterCategory = [
      {
        "id": "category",
        "name": "Categorías",
        "type": "text",
        "values": [
          {
            "id": "MCO82067",
            "name": "Tablets",
            "path_from_root": [
              {
                "id": "MCO1648",
                "name": "Computación"
              },
            ]
          }
        ]
      }
    ]

    render(<FiltersApplied filters={filterCategory} urlGenerator={urlGenerator} />);
    const deleteButton = screen.queryByRole(/button/);
    expect(urlGenerator.setFilter).toBeCalledTimes(0);
    fireEvent.click(deleteButton)
    expect(urlGenerator.setFilter).toBeCalledTimes(0);
  })

})