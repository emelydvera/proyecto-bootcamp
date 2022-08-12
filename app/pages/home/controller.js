const React = require("react");
const ProductService = require("../../../services/productService");
const config = require("nordic/config");
const I18nProvider = require("nordic/i18n/I18nProvider");
const ImageProvider = require("nordic/image/provider");
const View = require("./view");

exports.fetchProducts = (req, res, next) => {
  const { name, limit, offset } = req.query;
  const { siteId } = req.platform;

  ProductService.getProducts(siteId, name, limit, 0)
    .then((response) => {
      res.locals.products = response;
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
      imagesPrefix,
      translations: req.translations,
    },
    {
      navigationOptions: {
        type: "lite",
      },
    }
  );
};
