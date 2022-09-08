const restclient = require("nordic/restclient")({
  timeout: 5000,
});

const normalizer = require("./transforms/normalizer");

class ProductService {
  static getProducts(sitedId, params) {

    let { page = 1, limit = 10 } = params;

    page--;

    return restclient
      .get(`/sites/${sitedId}/search`, {
        params: {
          limit: 10,
          page: 1,
          ...params,
          offset: page * limit
        },
      })
      .then((response) => {
        return {
          results: normalizer(response.data.results),
          filters: response.data.filters,
          available_filters: response.data.available_filters,
          totalProducts: response.data.paging.total
        }
      })
      .catch((error) => {
        console.error(error);
        return ({
          results: [],
          filters: [],
          available_filters: [],
          totalProducts: 0
        });
      });
  }

  static getProductDetail(id) {
    return restclient
      .get(`/items/${id}`)
      .then((response) => response.data)
      .catch((error) => {
        throw new Error(error);
      });
  }

  static getProductDescription(id) {
    return restclient
      .get(`/items/${id}/description`)
      .then((response) => response.data)
      .catch((error) => {
        throw new Error(error);
      });
  }
}

module.exports = ProductService;
