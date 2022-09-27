const { fetchProduct } = require('../../../app/pages/buy/controller');
const httpMocks = require('node-mocks-http');
const mock = require('nordic-dev/mocks')();
const apiDomain = 'https://api.mercadolibre.com';
const eventEmitter = require("events").EventEmitter;

describe('fetchProduct - Buy', () => {

    beforeAll(() => {
        mock.intercept(apiDomain, ['/items/*']);
    });

    afterAll(() => {
        mock.restore(apiDomain, ['/items/*']);
    });

    it('should save an object with the description in res.locals.product and quantity to buy in res.locals.quantityToBuy', (done) => {

        const req = httpMocks.createRequest({
            method: 'GET',
            url: '/comprar',
            query: {
                productId: 'MLA1104983845',
                quantityToBuy: 1,
            }
        });
        const res = httpMocks.createResponse();

        fetchProduct(req, res, () => {
            expect(res.locals.product).toEqual(expect.objectContaining({ id: 'MLA1104983845' }));
            expect(res.locals.quantityToBuy).toBe(1)
            done()
        })

    })

    it('should redirect to error page', (done) => {

        const req = httpMocks.createRequest({
            method: 'GET',
            url: '/comprar',
            query: {
                productId: '110483845',
                quantityToBuy: 1,
            }
        });
        const res = httpMocks.createResponse({ eventEmitter });

        fetchProduct(req, res);
        res.on('end', ()=>{
            expect(res._getRedirectUrl()).toBe('/error404')
            done()
        })

    })

})