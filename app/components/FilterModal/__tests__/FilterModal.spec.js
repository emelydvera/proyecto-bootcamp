const React = require('react');
const FilterModal = require('..');
const { render, fireEvent, screen, waitFor } = require('@testing-library/react');
const { data } = require('../../../../mocks/test/get/https/api.mercadolibre.com/sites/MCO/search?limit=10&offset=0&page=1&q=tablet.json');
const UrlGenerator = require('../../../utils/urlGenerator');
jest.mock('../../../utils/urlGenerator');

const filter = data.available_filters[0];

describe('FilterModal', () => {

  beforeEach(() => {
    UrlGenerator.mockClear();
  });

  it('Should render correctly', () => {
    const urlGenerator = new UrlGenerator();
    const { asFragment } = render(<FilterModal filter={filter} urlGenerator={urlGenerator} />);
    expect(asFragment()).toMatchSnapshot();
  })

  it('Should open the modal and show their elements when "show more" button is clicked', () => {
    const urlGenerator = new UrlGenerator();
    render(<FilterModal filter={filter} urlGenerator={urlGenerator} />);

    const showMoreButton = screen.getByText(/Mostrar más/);
    fireEvent.click(showMoreButton);
    const modalElementChild = screen.queryByText(/Todas las tiendas oficiales/);
    expect(modalElementChild).toBeInTheDocument();

  })

  it('Should call setFilter method when a filter is clicked', () => {

    const urlGenerator = new UrlGenerator();
    render(<FilterModal filter={filter} urlGenerator={urlGenerator} />);

    const showMoreButton = screen.getByText(/Mostrar más/);
    fireEvent.click(showMoreButton);

    const modalElementChild = screen.queryByText(/Todas las tiendas oficiales/);
    expect(urlGenerator.setFilter).toHaveBeenCalledTimes(0);

    fireEvent.click(modalElementChild);

    expect(urlGenerator.setFilter).toHaveBeenCalledTimes(1);
    expect(urlGenerator.setFilter).toHaveBeenCalledWith("official_store", "all");

  })

  it('Should close the modal if close button is clicked', async () => {

    const urlGenerator = new UrlGenerator();
    render(<FilterModal filter={filter} urlGenerator={urlGenerator} />);

    const showMoreButton = screen.getByText(/Mostrar más/);
    fireEvent.click(showMoreButton);

    const modalElementChild = screen.queryByText(/Todas las tiendas oficiales/);
    expect(modalElementChild).toBeInTheDocument();

    const closeButton = screen.getByRole('button', { name: "Cerrar Tiendas oficiales" })

    fireEvent.click(closeButton);
    await waitFor(() => {
      expect(modalElementChild).not.toBeInTheDocument();
    });
  });


  it('should render other features', () => {

    const urlGenerator = new UrlGenerator();

    const filter = {
      "name": "Otras características",
      "values": [
        {
          "query": "has_pictures",
          "id": "yes",
          "name": "Con fotos",
          "results": 36012
        },
      ]
    }
    const { asFragment } = render(<FilterModal filter={filter} urlGenerator={urlGenerator} />);
    expect(asFragment()).toMatchSnapshot();

  })


})


