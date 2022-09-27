const React = require("react");
const FiltersAvailables = require("../FiltersAvailables");
const { render, screen, fireEvent } = require("@testing-library/react");
const { getByText, getByRole, getByPlaceholderText } = screen;
const {
  data,
} = require("../../../../mocks/development/get/https/internal-api.mercadolibre.com/sites/MLC/search?limit=10&offset=0&page=1&q=mac.json");

const UrlGenerator = require("../../../utils/urlGenerator");

describe("Component FiltersAvailables", () => {
  const urlGenerator = new UrlGenerator();
  let component;

  beforeEach(() => {
    component = render(
      <FiltersAvailables
        urlGenerator={urlGenerator}
        available_filters={data.available_filters}
      />
    );
  });

  it("Should render correctly", () => {
    const { asFragment } = component;
    expect(asFragment()).toMatchSnapshot();
    screen.debug();
  });
});
