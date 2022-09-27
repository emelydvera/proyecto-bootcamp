const React = require("react");
const ProductInfo = require("../ProductInfo");
const { render, screen } = require("@testing-library/react");
const {
  data,
} = require("../../../../mocks/test/get/https/api.mercadolibre.com/items/MLA1104983845.json");

describe("must show product information", () => {
  it("matches snapshot", () => {
    const props = {
      product: data,
      quantity: "2",
      amount: "1200",
    };
    const { asFragment } = render(<ProductInfo {...props} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("product condition is new", () => {
    const props = {
      product: data,
      quantity: "2",
      amount: "1200",
    };

    render(<ProductInfo {...props} />);
    const span = document.querySelector(".info__use");
    expect(span).toBeInTheDocument();
    expect(span).toHaveTextContent("Nuevo");
  });

  it("the product is not specified", () => {
    const props = {
      product: { ...data, condition: "not_specified" },
      quantity: "2",
      amount: "1200",
    };
    render(<ProductInfo {...props} />);
    const span = document.querySelector(".info__use");
    expect(span).toBeInTheDocument();
    expect(span).toHaveTextContent("No Especifica");
  });

  it("product condition is used", () => {
    const props = {
      product: { ...data, condition: "used" },
      quantity: "2",
      amount: "1200",
    };
    render(<ProductInfo {...props} />);
    const span = document.querySelector(".info__use");
    expect(span).toBeInTheDocument();
    expect(span).toHaveTextContent("Usado");
  });

  it("product condition is empty", () => {
    const props = {
      product: { ...data, condition: "" },
      quantity: "2",
      amount: "1200",
    };
    render(<ProductInfo {...props} />);
    const span = document.querySelector(".info__use");
    expect(span).toBeInTheDocument();
    expect(span).toHaveTextContent("");
  });
});
