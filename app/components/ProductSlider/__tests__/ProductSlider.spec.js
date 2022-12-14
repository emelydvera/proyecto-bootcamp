const React = require('react');
const ProductSlider = require('..');
const { render, screen, fireEvent } = require('@testing-library/react');
const { getByAltText } = screen;


const { data } = require('../../../../mocks/test/get/https/api.mercadolibre.com/items/MLA1104983845.json')


describe('<ProductSlider/>', () => {

    let component;
    const product = {
        title: data.title,
        pictures: data.pictures
    }

    beforeEach(() => {

        component = render(<ProductSlider product={product} /> )

    })

    it('should render the components', () => {

        const { asFragment } = component;
        expect(asFragment()).toMatchSnapshot();

    });

    it('should change the parent image to the one that fires the event', () => {

        const img = document.querySelector("img[data-src='https://http2.mlstatic.com/D_887836-MLA47152640900_082021-O.jpg']");
        const mainImage = getByAltText('product');

        expect(mainImage).toHaveAttribute('src', 'https://http2.mlstatic.com/D_852458-MLA48270995220_112021-O.jpg')
        
        fireEvent.mouseOver(img);

        expect(mainImage).toHaveAttribute('src', 'https://http2.mlstatic.com/D_887836-MLA47152640900_082021-O.jpg')

    });

})