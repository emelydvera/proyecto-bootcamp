const React = require("react");
const Pagination = require("../Pagination");
const { render, screen, fireEvent } = require("@testing-library/react");
const { queryByLabelText, getAllByRole, queryByTitle, debug } = screen;
const UrlGenerator = require("../../../utils/urlGenerator");

describe("Pagination component", () => {
  let urlGenerator = new UrlGenerator();

  it("should render component", () => {
    const { asFragment } = render(
      <Pagination urlGenerator={urlGenerator} totalProducts={10} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render PaginationComponent when totalProducts is smaller than 1000", () => {
    render(<Pagination urlGenerator={urlGenerator} totalProducts={200} />);
    const paginationNav = queryByLabelText("Paginación");
    expect(paginationNav).not.toBeNull();
    expect(paginationNav).toBeInTheDocument();
  });

  it("should render pagination pages when totalProducts is higher than 1000", async () => {
    render(<Pagination urlGenerator={urlGenerator} totalProducts={1002} />);
    const paginationNav = queryByLabelText("Paginación");
    expect(paginationNav).not.toBeNull();
  });

  it("should not render PaginationComponent when totalProducts is smaller than limit", () => {
    render(<Pagination urlGenerator={urlGenerator} totalProducts={2} />);
    const paginationNav = queryByLabelText("Paginación");
    expect(paginationNav).toBeNull();
  });
});
