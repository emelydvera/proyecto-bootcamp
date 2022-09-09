const restclient = require("nordic/restclient")({
  timeout: 5000,
  baseURL: "https://api.mercadolibre.com/",
});

const normalizer = require("./transforms/normalizer");
const normalizerFilters = require("./transforms/normalizerFilters");

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
          offset: page * limit,
        },
      })
      .then((response) => {
        return {
          results: normalizer(response.data.results),
          filters: response.data.filters,
          available_filters: normalizerFilters(response.data.available_filters),
          totalProducts: response.data.paging.primary_results,
        };
      })
      .catch((error) => {
        console.error(error);
        return {
          results: [],
          filters: [],
          available_filters: [],
          totalProducts: 0,
        };
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

  static getProductPathFromRoot(categoryId) {
    return restclient
      .get(`/categories/${categoryId}`)
      .then((response) => {
        return response.data.path_from_root;
      })
      .catch((error) => {
        throw new Error(error);
      });
  }
}

module.exports = ProductService;
