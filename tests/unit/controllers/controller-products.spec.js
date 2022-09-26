const { fetchProducts } = require('../../../app/pages/products/controller');
const mock = require('nordic-dev/mocks')();
const httpMocks = require('node-mocks-http');
const eventEmitter = require("events").EventEmitter;
const apiDomain = 'https://api.mercadolibre.com';

describe('Middleware fetchProducts', () => {
    beforeAll(() => {
        mock.intercept(apiDomain, ['/sites/*']);
    });

    afterAll(() => {
        mock.restore(apiDomain, ['/sites/*']);
    });

    it('when the response is successful it should save in res.locals an array of products, filters and available filters. In addition to the total number of products', (done) => {
        const req = httpMocks.createRequest({
            method: 'GET',
            baseUrl: '/products',
            query: { q: 'celular' },
            platform: { siteId: 'MLA' },
        });

        const res = httpMocks.createResponse();

        fetchProducts(req, res, () => {
            expect(res.locals.products).toBeInstanceOf(Array);
            expect(res.locals.filters).toBeInstanceOf(Array);
            expect(res.locals.available_filters).toBeInstanceOf(Array);
            expect(res.locals.totalProducts).toEqual(expect.any(Number));
            done();
        });
    });

    it('redirect to "/error404" if there is no product name or category in the query', () => {
        expect.assertions(1);
        const req = httpMocks.createRequest({
            method: 'GET',
            baseUrl: '/products',
            query: { limit: 10 },
            platform: { siteId: 'MLA' },
        });
        const res = httpMocks.createResponse();
        res.redirect = jest.fn();

        fetchProducts(req, res);
        expect(res.redirect).toHaveBeenCalledWith('/error404');

    });

    it('it redirect to "/error404" page when the request to the API returns an error', (done) => {
        expect.assertions(1);
        const req = httpMocks.createRequest({
            method: 'GET',
            baseUrl: '/products',
            query: { category: 'papas fritas' },
            platform: { siteId: 'MCC' },
        });
        const res = httpMocks.createResponse({ eventEmitter });
        fetchProducts(req, res);
        res.on('end', () => {
            expect(res._getRedirectUrl()).toBe('/error404');
            done();
        });
    });

});