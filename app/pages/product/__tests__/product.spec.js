const React = require("react");
const View = require("../view");
const { render, screen } = require("@testing-library/react");
const { getByLabelText, getByText, queryByLabelText, getByRole } = screen;
const productItem = require("../../../../mocks/test/get/https/api.mercadolibre.com/items/MLA1104983845.json");
const description = require("../../../../mocks/test/get/https/api.mercadolibre.com/items/MLA1104983845/description.json");
const I18nProvider = require("nordic/i18n/I18nProvider");

describe("Product page view", () => {
  const i18n = { gettext: (text) => text, npgettext: (text) => text };
  let props;

  beforeEach(() => {
    props = {
      product: {
        ...productItem.data,
        path: [],
      },
      description: description.data,
      quantity: "36",
      amount: "131944.42",
    };
  });

  it("should render component", () => {
    const component = render(
      <I18nProvider i18n={i18n}>
        <View {...props} />
      </I18nProvider>
    );

    const { asFragment } = component;
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render component with Breadcrumb and ProductView components", () => {
    const modifiedProps = {
      ...props,
      product: {
        ...productItem.data,
        path: [
          {
            id: "MCO1648",
            name: "Computación",
          },
        ],
      },
    };

    render(
      <I18nProvider i18n={i18n}>
        <View {...modifiedProps} />
      </I18nProvider>
    );

    const breadCrumb = getByLabelText("lista de páginas");
    const productDescriptionTitle = getByText("Descripción del producto");
    const availableQuantity = getByText(/Cantidad disponible/);
    const button = getByRole("button");

    expect(breadCrumb).toBeInTheDocument();
    expect(productDescriptionTitle).toBeInTheDocument();
    expect(availableQuantity).toBeInTheDocument();
    expect(button).toHaveTextContent("Comprar");
  });

  it("should render component without Breadcrumb component and with ProductView component", () => {
    const modifiedProps = {
      ...props,
      product: {
        ...productItem.data,
        path: [],
      },
    };

    render(
      <I18nProvider i18n={i18n}>
        <View {...modifiedProps} />
      </I18nProvider>
    );

    const breadCrumb = queryByLabelText("lista de páginas");
    const productDescriptionTitle = getByText("Descripción del producto");
    const availableQuantity = getByText(/Cantidad disponible/);
    const button = getByRole("button");

    expect(breadCrumb).toBeNull();
    expect(productDescriptionTitle).toBeInTheDocument();
    expect(availableQuantity).toBeInTheDocument();
    expect(button).toHaveTextContent("Comprar");
  });
});
