const React = require("react");
const FiltersAvailables = require("../FiltersAvailables");
const { render, screen } = require("@testing-library/react");
const {
  data,
} = require("../../../../mocks/components/FilterAvailables/datamock.json");

const UrlGenerator = require("../../../utils/urlGenerator");

describe("Component FiltersAvailables", () => {
  const urlGenerator = new UrlGenerator();
  let component;

  beforeEach(() => {
    component = render(
      <FiltersAvailables
        urlGenerator={urlGenerator}
        available_filters={data.available_filters}
      />
    );
  });

  it("Should render correctly", () => {
    const { asFragment } = component;
    expect(asFragment()).toMatchSnapshot();
  });
});
