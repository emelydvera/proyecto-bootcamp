const React = require("react");
const View = require("../view");
const { render } = require("@testing-library/react");

describe("the 404 error component view", () => {
  const i18n = { gettext: (text) => text };

  it("matches snapshot", () => {
    const { asFragment } = render(<View i18n={i18n} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders error message in the view", () => {
    const { getByText } = render(<View i18n={i18n} />);
    expect(getByText("Parece que esta página no existe")).toBeInTheDocument();
  });
});
