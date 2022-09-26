const React = require("react");
const View = require("../view");
const { render, screen } = require("@testing-library/react");

describe("Home View", () => {
  let component;
  let i18n = { gettext: (text) => text };
  let originalLocation;

  beforeAll(() => {
    originalLocation = window.location;
    delete window.location;
    window.location = { href: "/" };
  });

  beforeEach(() => {
    component = render(<View i18n={i18n} />);
  });

  it("Should render correctly", () => {
    const { asFragment } = component;
    expect(asFragment()).toMatchSnapshot();
  });
});
