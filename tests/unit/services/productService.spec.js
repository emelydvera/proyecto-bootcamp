const ProductService = require('../../../services/productService');
const mock = require('nordic-dev/mocks')();
const apiDomain = 'https://api.mercadolibre.com/';

describe('ProductService', () => {

    beforeAll(() => {
        mock.intercept(apiDomain, ['/sites/*', '/items/*', '/categories/*'])
    })

    afterAll(() => {
        mock.restore(apiDomain, ['/sites/*', '/items/*', '/categories/*'])
    })

    describe('getProducts', () => {

        it('should return an object containing search results, filters,  available_filters, totalProducts ', async () => {

            const response = await ProductService.getProducts('MCO', { q: 'tablet' })
            expect(response).toEqual(expect.objectContaining({
                results: expect.any(Array),
                filters: expect.any(Array),
                available_filters: expect.any(Array),
                totalProducts: expect.any(Number),
            }))

        })

        it('should throw an error', async () => {

            expect.assertions(1);
            try {
                await ProductService.getProducts('MZYU', { q: 'tablet' });

            } catch (error) {
                expect(error).toBeInstanceOf(Error);
            }
        })


    })

    describe('getProductDetail', () => {

        it('should return an object of the product passed by parameter ', async () => {

            const id = 'MLA1104983845';
            const response = await ProductService.getProductDetail(id);
            expect(response).toEqual(expect.objectContaining({ id }))

        })

        it('should throw an error', async () => {

            expect.assertions(1);
            const id = '104983845';
            try {
                await ProductService.getProductDetail(id);

            } catch (error) {
                expect(error).toBeInstanceOf(Error)
            }

        })

    })

    describe('getProductDescription', () => {

        it('should return an object that contains the description', async () => {

            const id = 'MLA1104983845';
            const response = await ProductService.getProductDescription(id);
            expect(response).toEqual(expect.objectContaining({
                plain_text: expect.any(String)
            }))

        })
        it('should throw an error', async () => {

            expect.assertions(1);
            const id = '104983845';
            try {
                await ProductService.getProductDescription(id);

            } catch (error) {
                expect(error).toBeInstanceOf(Error)
            }

        })
    })

    describe('getProductPathFromRoot', () => {

        it('should return an array of object with the categories', async () => {

            const categoryId = 'MCO1648';
            const response = await ProductService.getProductPathFromRoot(categoryId);
            expect(response).toEqual(expect.arrayContaining([expect.objectContaining({
                id: expect.any(String),
                name: expect.any(String)
            })]))

        })
        
        it('should throw an error', async () => {

            expect.assertions(1);
            const categoryId = 'O1648';
            try {
                await ProductService.getProductPathFromRoot(categoryId);

            } catch (error) {
                expect(error).toBeInstanceOf(Error)
            }

        })
    })
})