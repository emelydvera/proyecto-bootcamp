const React = require("react");
const ProductService = require("../../../services/productService");
const config = require("nordic/config");
const I18nProvider = require("nordic/i18n/I18nProvider");
const ImageProvider = require("nordic/image/provider");
const View = require("./view");

exports.fetchProducts = (req, res, next) => {
  const { siteId } = req.platform;

  ProductService.getProducts(siteId, req.query)
    .then((response) => {
      res.locals.products = response.results;
      res.locals.available_filters = response.available_filters
      next();
    })
    .catch((error) => {
      next(error);
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
      available_filters: res.locals.available_filters,
      imagesPrefix,
      translations: req.translations,
      query: req.query
    },
    {
      navigationOptions: {
        type: "lite",
      },
    }
  );
};
