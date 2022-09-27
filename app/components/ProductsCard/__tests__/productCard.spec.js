const React = require("react");
const ProductCard = require("../ProductsCard");
const { render, screen } = require("@testing-library/react");
const { getByRole, queryByText, getByLabelText } = screen;
const mockProductWithFreeShipping = require("../../../../mocks/components/productCard/productCardMockWithFreeShipping.json");
const mockProductWithoutFreeShipping = require("../../../../mocks/components/productCardMockWithoutFreeShipping.json");
const mockProductWithoutInstallments = require("../../../../mocks/components/productCardMockWithoutInstallments.json");
const mockProductWithFalsyAddress = require("../../../../mocks/components/productCardMockWithoutAddressState.json");

describe("ProductCard", () => {
  const i18n = { gettext: (text) => text };

  describe("ProuctCard with free shipping", () => {
    let component;
    const props = {
      product: mockProductWithFreeShipping,
      i18n,
      index: 1,
    };

    beforeEach(() => {
      component = render(<ProductCard {...props} />);
    });

    it("should render component", () => {
      const { asFragment } = component;
      expect(asFragment()).toMatchSnapshot();
    });

    it("should render the name of the product", () => {
      const productName = getByRole("heading", { level: 2 });
      expect(productName).toHaveTextContent(mockProductWithFreeShipping.title);
    });

    it("should render the image of the product", () => {
      const productImage = getByRole("img");
      expect(productImage).toHaveAttribute(
        "data-src",
        mockProductWithFreeShipping.thumbnail.replace("http", "https")
      );
    });

    it("should render the city of the product", () => {
      const productCity = queryByText("Antioquia");
      expect(productCity).toBeInTheDocument();
    });

    it("should render the price of the product", () => {
      const productPrice = queryByText(/252900/);
      expect(productPrice).toBeInTheDocument();
    });

    it("should render an anchor tag (<a></a >) with the href containing amount and quantity of the product", () => {
      const productLink = getByRole("link");
      expect(productLink).toHaveAttribute(
        "href",
        `/product/${mockProductWithFreeShipping.id}?quantity=${mockProductWithFreeShipping.installments.quantity}&amount=${mockProductWithFreeShipping.installments.amount}`
      );
    });

    it("should render a tag with 'Envío' when product has free shipping", () => {
      const productFreeShipping = queryByText("Envío");
      expect(productFreeShipping).not.toBeNull();
    });
  });

  describe("ProuctCard without free shipping", () => {
    let component;
    const props = {
      product: mockProductWithoutFreeShipping,
      i18n,
      index: 1,
    };

    beforeEach(() => {
      component = render(<ProductCard {...props} />);
    });

    it("should render component", () => {
      const { asFragment } = component;
      expect(asFragment()).toMatchSnapshot();
    });

    it("should render the name of the product", () => {
      const productName = getByRole("heading", { level: 2 });
      expect(productName).toHaveTextContent(
        mockProductWithoutFreeShipping.title
      );
    });

    it("should render the city of the product", () => {
      const productCity = queryByText("Bolívar");
      expect(productCity).toBeInTheDocument();
    });

    it("should render the price of the product", () => {
      const productPrice = queryByText(/474999/);
      expect(productPrice).toBeInTheDocument();
    });

    it("should render the image of the product", () => {
      const productImage = getByRole("img");
      expect(productImage).toHaveAttribute(
        "data-src",
        mockProductWithoutFreeShipping.thumbnail.replace("http", "https")
      );
    });

    it("should render an anchor tag (<a></a >) with the href containing amount and quantity of the product", () => {
      const productLink = getByRole("link");
      expect(productLink).toHaveAttribute(
        "href",
        `/product/${mockProductWithoutFreeShipping.id}?quantity=${mockProductWithFreeShipping.installments.quantity}&amount=${mockProductWithFreeShipping.installments.amount}`
      );
    });

    it("should not render a tag with 'Envío' when product has no free shipping", () => {
      const productFreeShipping = queryByText("Envío");
      expect(productFreeShipping).toBeNull();
    });
  });

  describe("ProuctCard without installments", () => {
    let component;
    const props = {
      product: mockProductWithoutInstallments,
      i18n,
      index: 1,
    };

    beforeEach(() => {
      component = render(<ProductCard {...props} />);
    });

    it("should render component", () => {
      const { asFragment } = component;
      expect(asFragment()).toMatchSnapshot();
    });

    it("should render the name of the product", () => {
      const productName = getByRole("heading", { level: 2 });
      expect(productName).toHaveTextContent(
        mockProductWithoutInstallments.title
      );
    });

    it("should render the city of the product", () => {
      const productCity = queryByText("Cundinamarca");
      expect(productCity).toBeInTheDocument();
    });

    it("should render the price of the product", () => {
      const productPrice = queryByText(/400000/);
      expect(productPrice).toBeInTheDocument();
    });

    it("should render the image of the product", () => {
      const productImage = getByRole("img");
      expect(productImage).toHaveAttribute(
        "data-src",
        mockProductWithoutInstallments.thumbnail.replace("http", "https")
      );
    });

    it("should render an anchor tag (<a></a >) with the href not containing amount and quantity of the product", () => {
      const productLink = getByRole("link");
      expect(productLink).toHaveAttribute(
        "href",
        `/product/${mockProductWithoutInstallments.id}`
      );
    });

    it("should not render a tag with 'Envío' when product has no free shipping", () => {
      const productFreeShipping = queryByText("Envío");
      expect(productFreeShipping).toBeNull();
    });
  });

  describe("ProuctCard with state_name property empty or undefined", () => {
    let component;
    const props = {
      product: mockProductWithFalsyAddress,
      i18n,
      index: 1,
    };

    beforeEach(() => {
      component = render(<ProductCard {...props} />);
    });

    it("should render component", () => {
      const { asFragment } = component;
      expect(asFragment()).toMatchSnapshot();
    });

    it("should render the name of the product", () => {
      const productName = getByRole("heading", { level: 2 });
      expect(productName).toHaveTextContent(mockProductWithFalsyAddress.title);
    });

    it("should render 'Sin ubicación' when the city of is not available in the product", () => {
      const productCity = getByLabelText("Sin ubicación");
      expect(productCity).toBeInTheDocument();
    });

    it("should render the price of the product", () => {
      const productPrice = queryByText(/400000/);
      expect(productPrice).toBeInTheDocument();
    });

    it("should render the image of the product", () => {
      const productImage = getByRole("img");
      expect(productImage).toHaveAttribute(
        "data-src",
        mockProductWithFalsyAddress.thumbnail.replace("http", "https")
      );
    });
  });
});
