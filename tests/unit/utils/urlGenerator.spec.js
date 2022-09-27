/**
* @jest-environment jsdom
*/

const UrlGenerator = require('../../../app/utils/urlGenerator');

const spyOnMethod = {
  setQuery: jest
    .spyOn(UrlGenerator.prototype, 'setQuery'),
  getQueryString: jest
    .spyOn(UrlGenerator.prototype, 'getQueryString'),
};

delete window.location;
window.location = { assign: jest.fn() };


describe('UrlGenerator', () => {

  const baseUrl = '/';
  const query = { name: 'Laptop', page: 2, price: '5000-10000' };
  let urlGenerator = new UrlGenerator(baseUrl, query);

  const defaultQuery = { limit: 10, ...query };

  beforeEach(() => {
    urlGenerator = new UrlGenerator(baseUrl, query);
    window.location.href = '/';
  })


  describe('constructor()', () => {

    it('urlGenerator should be instance of UrlGenerator', () => {
      expect(urlGenerator).toBeInstanceOf(UrlGenerator);
    })

    it('The urlGenerator instance should have it properties defined', () => {
      expect(urlGenerator.baseUrl).toBeDefined();
      expect(urlGenerator.query).toBeDefined();
    })

    it('The queries limit and page, should be defined by default if it´s values are not passed', () => {
      expect(urlGenerator.query).toEqual(defaultQuery);
    })

  })


  describe('setQuery()', () => {

    it('Should modify the query property passed if it already exist', () => {
      const queryId = 'limit';
      const newQueryValue = 20;
      urlGenerator.setQuery(queryId, newQueryValue);

      expect(urlGenerator.query).toEqual({ ...defaultQuery, [queryId]: newQueryValue });
    })

    it('Should add a new property to the query object if it does´nt exist', () => {
      const queryId = 'price';
      const queryValue = '0-6000';
      urlGenerator.setQuery(queryId, queryValue);

      const newQueryObject = { ...defaultQuery, [queryId]: queryValue };
      expect(urlGenerator.query).toEqual(newQueryObject);
    })
  })


  describe('setFilter()', () => {
    const queryId = 'price';
    const queryValue = '0-5000';

    beforeEach(() => {
      urlGenerator.setFilter(queryId, queryValue);
    })

    it('Should call setQuery method', () => {
      expect(spyOnMethod.setQuery).toHaveBeenCalled();
    })

    it('Should set the page to 1', () => {
      expect(urlGenerator.query.page).toBe(1);
    })

    it('Should add / modify the query, and navigate to the new location', () => {
      expect(window.location.href).toBe('/?page=1&limit=10&name=Laptop&price=0-5000&');
    })

  })

  describe('removeFilter()', () => {

    const queryId = 'price';

    beforeEach(() => {
      urlGenerator.removeFilter(queryId);
    })

    it('Should call setQuery method', () => {
      expect(spyOnMethod.setQuery).toHaveBeenCalled();
    })

    it('The query passed must be undefined in the query object of the class', () => {
      expect(urlGenerator.query.price).toBeUndefined();
    })

    it('Should set the page to 1', () => {
      expect(urlGenerator.query.page).toBe(1);
    })

    it('Should removed the query, and navigate to the new location', () => {
      expect(window.location.href).toBe('/?page=1&limit=10&name=Laptop&');
    })
  })

  describe('getNewUrl()', () => {
    it('Should call the method getQueryString()', () => {
      expect(spyOnMethod.getQueryString).toHaveBeenCalled();
    })

    it('Should generate and return the new URL', () => {
      expect(urlGenerator.getNewUrl()).toBe('/?page=2&limit=10&name=Laptop&price=5000-10000&');
    })
  })

  describe('getQueryString()', () => {
    it('Should generate the query string based on the query object', () => {
      expect(urlGenerator.getQueryString()).toBe('page=2&limit=10&name=Laptop&price=5000-10000&');
    })

    it('Should generate the query string based on the query object with out the page property', () => {
      expect(urlGenerator.getQueryString(false)).toBe('limit=10&name=Laptop&price=5000-10000&');
    })

  })

  describe('getQueryByName()', () => {
    it('Should return the query property value', () => {
      expect(urlGenerator.getQueryByName('limit')).toBe(10);
    })
  })

  describe('getQueries()', () => {
    it('Should return the query object', () => {
      expect(urlGenerator.getQueries()).toEqual(defaultQuery);
    })
  })

})