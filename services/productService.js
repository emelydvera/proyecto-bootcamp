const restclient = require("nordic/restclient")({
  timeout: 5000,
  baseURL: "https://api.mercadolibre.com",
});

const normalizer = require("./transforms/normalizer");

class ProductService {
  static getProducts(sitedId, q) {
    return restclient
      .get(`/sites/${sitedId}/search`, {
        params: {
          q
        },
      })
      .then((response) => normalizer(response.data.results))
      .catch((error) => {
        console.error(error);
        return [];
      });
  }
}

module.exports = ProductService;
