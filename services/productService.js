const restclient = require("nordic/restclient")({
  timeout: 5000,
  baseURL: "https://api.mercadolibre.com",
});

const normalizer = require("./transforms/normalizer");

class ProductService {
  static getProducts(sitedId, params) {
    return restclient
      .get(`/sites/${sitedId}/search`, {
        params,
      })
      .then((response) => ({
        results: normalizer(response.data.results),
        filters: response.data.filters,
        available_filters: response.data.available_filters,
      }))
      .catch((error) => {
        console.error(error);
        return [];
      });
  }

  static getProductDetail(id) {
    return restclient
      .get(`/items/${id}`)
      .then((response) => response.data)
      .catch((error) => {
        console.log(error);
        throw new Error(error);
      });
  }

  static getProductDescription(id) {
    return restclient
      .get(`/items/${id}/description`)
      .then((response) => response.data)
      .catch((error) => {
        console.log(error);
        throw new Error(error);
      });
  }
}

module.exports = ProductService;
