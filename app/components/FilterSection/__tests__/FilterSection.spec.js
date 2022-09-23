const React = require('react');
const { render, screen, fireEvent } = require('@testing-library/react');
const FilterSection = require('..');
const { data } = require('../../../../mocks/test/get/https/api.mercadolibre.com/sites/MCO/search?limit=10&offset=0&page=1&q=tablet.json')

const UrlGenerator = require('../../../utils/urlGenerator');
jest.mock('../../../utils/urlGenerator')

describe('FilterSection', () => {

  beforeEach(() => {
    UrlGenerator.mockClear();
  })

  const urlGenerator = new UrlGenerator();
  const filter = {
    "name": "Otras características",
    "values": [
      {
        "query": "accepts_mercadopago",
        "name": "Con MercadoPago",
        "id": "yes",
        "results": 737732
      },
    ]
  }

  it('Should render correctly', () => {
    const { asFragment } = render(<FilterSection filter={filter} urlGenerator={urlGenerator} />)
    expect(asFragment()).toMatchSnapshot();
  })

  it('Should render the section title name', () => {
    render(<FilterSection filter={filter} urlGenerator={urlGenerator} />)
    const sectionTitle = screen.getByText(filter.name);
    expect(sectionTitle).toBeInTheDocument();
  })

  it('Should not show "Show more" button if there are less than 4 filter options', () => {
    render(<FilterSection filter={filter} urlGenerator={urlGenerator} />)
    const showMoreButton = screen.queryByText(/Mostrar más/);
    expect(showMoreButton).not.toBeInTheDocument();
  })


  const filterWithSixOptions = {
    "id": "official_store",
    "name": "Tiendas oficiales",
    "type": "text",
    "values": [
      {
        "id": "all",
        "name": "Todas las tiendas oficiales",
        "results": 66
      },
      {
        "id": "72",
        "name": "Lenovo",
        "results": 18
      },
      {
        "id": "153",
        "name": "Samsung",
        "results": 8
      },
      {
        "id": "207",
        "name": "Huawei",
        "results": 3
      },
      {
        "id": "1555",
        "name": "Ultra Gamer",
        "results": 9
      },
      {
        "id": "957",
        "name": "Smart Buy",
        "results": 3
      }
    ]
  }

  it('Should show up to 4 options in the filter section', () => {
    render(<FilterSection filter={filterWithSixOptions} urlGenerator={urlGenerator} />)
    const optionFour = screen.queryByText(filterWithSixOptions.values[3].name);
    expect(optionFour).toBeInTheDocument();
    const optionFive = screen.queryByText(filterWithSixOptions.values[4].name);
    expect(optionFive).not.toBeInTheDocument();
  })

  it('Should show "Show more" button if there are more than 3 filter options', () => {
    render(<FilterSection filter={filterWithSixOptions} urlGenerator={urlGenerator} />)
    const showMoreButton = screen.queryByText(/Mostrar más/);
    expect(showMoreButton).toBeInTheDocument();
  })

})