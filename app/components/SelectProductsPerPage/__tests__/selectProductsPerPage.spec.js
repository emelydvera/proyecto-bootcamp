const React = require("react");
// import { act } from "react-dom/test-utils";
const SelectProductsPerPage = require("../SelectProductPerPage");
const { render, screen, fireEvent, act } = require("@testing-library/react");
const { getByRole, getAllByRole } = screen;
const UrlGenerator = require("../../../utils/urlGenerator");
const { I18nProvider } = require("nordic/i18n");
jest.mock("../../../utils/urlGenerator");

describe("SelectProductsPerPage component", () => {
  const i18n = { gettext: (text) => text };
  Object.defineProperty(window, "location", {
    value: {
      href: "http://localhost",
    },
    configurable: true,
  });

  beforeEach(() => {
    UrlGenerator.mockClear();
  });

  it("should render component", async () => {
    const urlGenerator = new UrlGenerator();

    const { asFragment } = render(
      <I18nProvider i18n={i18n}>
        <SelectProductsPerPage urlGenerator={urlGenerator} />
      </I18nProvider>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("should invoke urlGenerator.setQuery when clicking a dropdown item", () => {
    const urlGenerator = new UrlGenerator();

    render(
      <I18nProvider i18n={i18n}>
        <SelectProductsPerPage urlGenerator={urlGenerator} />
      </I18nProvider>
    );

    const dropdown = getByRole("button");
    fireEvent.click(dropdown);

    const dropdownItems = getAllByRole("option");
    fireEvent.click(dropdownItems[0]); // this is the first item of the dropdown containing value 5

    expect(urlGenerator.setQuery).toHaveBeenCalled();
    expect(urlGenerator.setQuery).toHaveBeenCalledWith("limit", 5);
  });

  it("should invoke urlGenerator.getQueryString when clicking a dropdown item", () => {
    const urlGenerator = new UrlGenerator();
    jest
      .spyOn(urlGenerator, "getQueryString")
      .mockImplementation(() => "q=mac");

    render(
      <I18nProvider i18n={i18n}>
        <SelectProductsPerPage urlGenerator={urlGenerator} />
      </I18nProvider>
    );

    const dropdown = getByRole("button");
    fireEvent.click(dropdown);

    const dropdownItems = getAllByRole("option");
    fireEvent.click(dropdownItems[0]); // this is the first item of the dropdown containing value 5

    expect(urlGenerator.getQueryString).toHaveBeenCalled();
    expect(window.location.href).toBe("/listado?q=mac");
  });
});
