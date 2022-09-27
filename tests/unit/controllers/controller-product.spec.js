const {
  fetchProduct,
  productDescription,
  productPathFromRoot,
} = require("../../../app/pages/product/controller");
const eventEmitter = require("events").EventEmitter;
const httpMocks = require("node-mocks-http");
const mock = require("nordic-dev/mocks")();
const apiDomain = "https://api.mercadolibre.com";

describe("Product controller middlewares", () => {
  beforeAll(() => {
    mock.intercept(apiDomain, ["/items/*", "/categories/*"]);
  });

  afterAll(() => {
    mock.restore(apiDomain, ["/items/*", "/categories/*"]);
  });

  describe("fetProducts middleware", () => {
    it("should save a product (object) in res.locals.product", (done) => {
      const req = httpMocks.createRequest({
        method: "GET",
        url: "/product",
        params: {
          id: "MCO847774027",
        },
      });

      const res = httpMocks.createResponse();

      fetchProduct(req, res, () => {
        expect(res.locals.product).toBeInstanceOf(Object);
        expect(res.locals.product.id).toBe("MCO847774027");
        done();
      });
    });

    it("should redirect to /error404 when passed an invalid id", (done) => {
      const req = httpMocks.createRequest({
        method: "GET",
        url: "/product",
        params: {
          id: "PRC847774027",
        },
      });

      const res = httpMocks.createResponse({
        eventEmitter,
      });

      fetchProduct(req, res);

      res.on("end", () => {
        expect(res._getRedirectUrl()).toBe("/error404");
        done();
      });
    });
  });

  describe("productDescription middleware", () => {
    it("should save product description (object) with a plain_text property in res.locals.description", (done) => {
      const req = httpMocks.createRequest({
        method: "GET",
        url: "/product",
        params: {
          id: "MCO883390429",
        },
      });

      const res = httpMocks.createResponse();

      productDescription(req, res, () => {
        expect(res.locals.description).toBeInstanceOf(Object);
        expect(res.locals.description).toHaveProperty("plain_text");
        done();
      });
    });

    it("should redirect to /error404 when passed an invalid id", (done) => {
      const req = httpMocks.createRequest({
        method: "GET",
        url: "/product",
        params: {
          id: "PRJ883390429",
        },
      });

      const res = httpMocks.createResponse({
        eventEmitter,
      });

      productDescription(req, res);

      res.on("end", () => {
        expect(res._getRedirectUrl()).toBe("/error404");
        done();
      });
    });
  });

  describe("productPathFromRoot middleware", () => {
    it("should save an array containing product path from root in res.locals.product.path", (done) => {
      const expected = [
        {
          id: "MCO1648",
          name: "Computación",
        },
        {
          id: "MCO430687",
          name: "Portátiles y Accesorios",
        },
        {
          id: "MCO1652",
          name: "Portátiles",
        },
      ];
      const req = httpMocks.createRequest({
        method: "GET",
        url: "/product",
      });
      const res = httpMocks.createResponse({
        locals: { product: { category_id: "MCO1652" } },
      });

      productPathFromRoot(req, res, () => {
        expect(res.locals.product.path).toBeInstanceOf(Array);
        expect(res.locals.product.path).toEqual(expected);
        done();
      });
    });

    it("should redirect to /error404 when passed a non-existing caterogy id", (done) => {
      const req = httpMocks.createRequest({
        method: "GET",
        url: "/product",
      });
      const res = httpMocks.createResponse({
        eventEmitter,
        locals: { product: { category_id: "ZPM1XL3" } },
      });

      productPathFromRoot(req, res);

      res.on("end", () => {
        expect(res._getRedirectUrl()).toBe("/error404");
        done();
      });
    });

    it("should redirect to /error404 when passed a non-existing caterogy id", (done) => {
      const req = httpMocks.createRequest({
        method: "GET",
        url: "/product",
      });
      const res = httpMocks.createResponse({
        eventEmitter,
        locals: { product: { category_id: "ZPM1XL3" } },
      });

      productPathFromRoot(req, res);

      res.on("end", () => {
        expect(res._getRedirectUrl()).toBe("/error404");
        done();
      });
    });
  });
});
