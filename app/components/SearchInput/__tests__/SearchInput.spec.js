const React = require("react");
const SearchInput = require("../SearchInput");
const { render, screen, fireEvent } = require("@testing-library/react");
const { getByText, getByRole, getByPlaceholderText } = screen;

describe("Component SearchInput", () => {
  let component;
  let i18n = { gettext: (text) => text };
  let originalLocation;

  beforeAll(() => {
    originalLocation = window.location;
    delete window.location;
    window.location = { href: "/" };
  });

  beforeEach(() => {
    component = render(<SearchInput i18n={i18n} />);
  });

  it("TextField should exist", () => {
    const textField = getByRole("textbox");
    expect(textField).toBeInTheDocument();
  });

  it("Button should exist", () => {
    const button = getByRole("button");
    expect(button).toBeInTheDocument();
  });

  it("Should render correctly", () => {
    const { asFragment } = component;
    expect(asFragment()).toMatchSnapshot;
  });

  it("Input works correctly", () => {
    const input = getByPlaceholderText("Buscar productos, marcas y más...");
    fireEvent.change(input, { target: { value: "mac" } });
    expect(input.value).toBe("mac");
  });

  it("Should redirect to products page when button is pressed", () => {
    const input = getByPlaceholderText("Buscar productos, marcas y más...");
    fireEvent.change(input, { target: { value: "mac" } });
    const button = getByText("Buscar");
    fireEvent.click(button);
    expect(window.location.href).toMatch("listado?q=mac");
  });

  it("Should show an error message", () => {
    const input = getByPlaceholderText("Buscar productos, marcas y más...");
    fireEvent.change(input, { target: { value: "k" } });
    screen.logTestingPlaygroundURL();
    const errorSpan = getByText("Escriba al menos 2 carácteres");
    expect(errorSpan).toBeInTheDocument();
  });
});
