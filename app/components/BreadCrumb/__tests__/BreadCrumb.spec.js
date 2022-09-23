const React = require('react');
const { render, screen } = require('@testing-library/react')
const BreadCrumb = require('..');

const path = [
  {
    "id": "MLA1648",
    "name": "Computación"
  },
  {
    "id": "MLA430687",
    "name": "Laptops y Accesorios"
  },
]

describe('BreadCrumb', () => {
  it('Should render correctly', () => {

    const { asFragment } = render(<BreadCrumb path={path} />)
    expect(asFragment()).toMatchSnapshot();

  })

  it('Should render the breadcrumb levels, with it custom href', () => {
    render(<BreadCrumb path={path} />)
    const levelOne = screen.queryByText(path[0].name);
    expect(levelOne).toBeInTheDocument()
    expect(levelOne).toHaveAttribute('href', expect.stringContaining(path[0].id))
    screen.debug(levelOne)
  })

  it('Should add the product title into the breadcrumb levels', () => {
    render(<BreadCrumb path={path} productTitle={'Macbook'} />)
    const productTitle = screen.queryByText(/Macbook/);
    expect(productTitle).toBeInTheDocument()
  })


})