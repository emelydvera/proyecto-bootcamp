const React = require("react");
const View = require("../view");
const { render, screen } = require("@testing-library/react");
const { getByLabelText, getByText, queryByLabelText, getByRole, getByAltText } =
  screen;
const mockProductWithNoEmptyPathFromRoot = require("../../../../mocks/pages/productMockWithNoEmptyPath.json");
const mockProductWithEmptyPathFromRoot = require("../../../../mocks/pages/productMockWithEmptyPath.json");
const mockProductDescription = require("../../../../mocks/pages/productDescriptionMock.json");
const I18nProvider = require("nordic/i18n/I18nProvider");

describe("Product page view", () => {
  const i18n = { gettext: (text) => text, npgettext: (text) => text };

  describe("Product with a non empty path from root array", () => {
    let component;
    const props = {
      product: mockProductWithNoEmptyPathFromRoot,
      description: mockProductDescription,
      quantiy: "5",
      amount: "4300",
    };

    beforeEach(() => {
      component = render(
        <I18nProvider i18n={i18n}>
          <View {...props} />
        </I18nProvider>
      );
    });

    it("should render component", () => {
      const { asFragment } = component;
      expect(asFragment()).toMatchSnapshot();
    });

    it("should render component with Breadcrumb when property path in product is not an empty array", () => {
      const breadCrumb = getByLabelText("lista de páginas");
      expect(breadCrumb).toBeInTheDocument();
    });

    it("should render product main image", () => {
      const productMainImage = getByAltText("product");
      expect(productMainImage).toBeInTheDocument();
    });

    it("should render product name", () => {
      const productName = getByRole("heading", {
        name: /Moto G20 64 Gb Azul Cielo 4 Gb Ram/i,
      });
      expect(productName).toHaveTextContent(
        mockProductWithNoEmptyPathFromRoot.title
      );
    });

    it("should render a button to buy (Comprar)", () => {
      const button = getByRole("button");
      expect(button).toHaveTextContent("Comprar");
    });
  });

  describe("Product with an empty path from root array", () => {
    let component;
    const props = {
      product: mockProductWithEmptyPathFromRoot,
      description: mockProductDescription,
      quantiy: "5",
      amount: "4300",
    };

    beforeEach(() => {
      component = render(
        <I18nProvider i18n={i18n}>
          <View {...props} />
        </I18nProvider>
      );
    });

    it("should render component", () => {
      const { asFragment } = component;
      expect(asFragment()).toMatchSnapshot();
    });

    it("should render component without Breadcrumb component when property path in product is an empty array", () => {
      const breadCrumb = queryByLabelText("lista de páginas");
      expect(breadCrumb).toBeNull();
    });

    it("should render product main image", () => {
      const productMainImage = getByAltText("product");
      expect(productMainImage).toBeInTheDocument();
    });

    it("should render product name", () => {
      const productName = getByRole("heading", {
        name: /Moto G20 64 Gb Azul Cielo 4 Gb Ram/i,
      });
      expect(productName).toHaveTextContent(
        mockProductWithEmptyPathFromRoot.title
      );
    });

    it("should render a button to buy (Comprar)", () => {
      const button = getByRole("button");
      expect(button).toHaveTextContent("Comprar");
    });
  });
});
