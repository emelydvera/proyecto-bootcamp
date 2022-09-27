const React = require("react");
const ProductAttributes = require("../ProductAttributes");
const { render, screen } = require("@testing-library/react");
const { queryByText } = screen;
const mockAttributes = require("../../../../mocks/components/productAttributes/attributes.json");

describe("ProductAttribues component", () => {
  let component;
  const i18n = { gettext: (text) => text };

  beforeEach(() => {
    component = render(
      <ProductAttributes i18n={i18n} attributes={mockAttributes} />
    );
  });

  it("should render component", () => {
    const { asFragment } = component;
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render text title 'Características'", () => {
    const tableTitle = queryByText("Características");
    expect(tableTitle).toBeInTheDocument();
  });

  it("should render product model attribute and its value", () => {
    const model = queryByText("Modelo alfanumérico");
    const modelValue = queryByText("15ALC6");

    expect(model).toBeInTheDocument();
    expect(modelValue).toBeInTheDocument();
  });

  it("should render product brand attribute and its value", () => {
    const brand = queryByText("Marca");
    const brandValue = queryByText("Lenovo");

    expect(brand).toBeInTheDocument();
    expect(brandValue).toBeInTheDocument();
  });

  it("should render product detailed model attribute and its value", () => {
    const detailedModel = queryByText("Modelo detallado");
    const detailedModelValue = queryByText("82KU00AAUS");

    expect(detailedModel).toBeInTheDocument();
    expect(detailedModelValue).toBeInTheDocument();
  });
});
