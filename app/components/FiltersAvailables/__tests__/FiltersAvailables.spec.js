const React = require("react");
const FiltersAvailables = require("../FiltersAvailables");
const { render, screen, fireEvent } = require("@testing-library/react");
const { getByText, getByRole, getByPlaceholderText } = screen;
const {
  data,
} = require("../../../../mocks/development/get/https/internal-api.mercadolibre.com/sites/MLC/");

describe("Component FiltersAvailables", () => {
  beforeEach(() => {
    component = render(<FiltersAvailables />);
  });

  it("should render correctly", () => {});
});
