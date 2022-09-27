const React = require("react");
const Component404 = require("../Component404");
const { render } = require("@testing-library/react");

describe("Component Error 404", () => {
  const i18n = { gettext: (text) => text };

  it("matches snapshot", () => {
    const { asFragment } = render(<Component404 i18n={i18n} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders an error image", () => {
    const { getByAltText } = render(<Component404 i18n={i18n} />);
    expect(getByAltText("error image")).toBeInTheDocument();
  });

  it("renders error message", () => {
    const { getByText } = render(<Component404 i18n={i18n} />);
    expect(getByText("Parece que esta página no existe")).toBeInTheDocument();
  });

  it("render a redirect button", () => {
    const { getByText } = render(<Component404 i18n={i18n} />);
    expect(getByText("Ir a la página principal")).toBeInTheDocument();
  });

  it("ancore contains link and href attribute", () => {
    const { getByRole } = render(<Component404 i18n={i18n} />);
    expect(getByRole("link")).toHaveAttribute("href", "/");
  });
});
