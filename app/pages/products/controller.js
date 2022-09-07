const React = require("react");
const ProductService = require("../../../services/productService");
const config = require("nordic/config");
const I18nProvider = require("nordic/i18n/I18nProvider");
const ImageProvider = require("nordic/image/provider");
const View = require("./view");

exports.fetchProducts = (req, res, next) => {
  const { siteId } = req.platform;
  const { page } = req.query;

  ProductService.getProducts(siteId, req.query)
    .then((response) => {
      res.locals.products = response.results;
      res.locals.filters = response.filters;
      res.locals.available_filters = response.available_filters;
      res.locals.totalProducts = response.totalProducts;
      next();
    })
    .catch(() => {
      return res.redirect("/error");
    });
};

exports.render = (req, res) => {
  const imagesPrefix = config.assets.prefix;

  const ProductsView = (props) => (
    <I18nProvider i18n={req.i18n}>
      <ImageProvider prefix={imagesPrefix}>
        <View {...props} />
      </ImageProvider>
    </I18nProvider>
  );

  res.render(
    ProductsView,
    {
      products: res.locals.products,
      imagesPrefix,
      translations: req.translations,
      filters: res.locals.filters,
      available_filters: res.locals.available_filters,
      baseUrl: req.baseUrl,
      query: req.query,
      totalProducts: res.locals.totalProducts,
    },
    {
      navigationOptions: {
        type: "lite",
      },
    }
  );
};
