const React = require("react");
const ProductService = require("../../../services/productService");
const config = require("nordic/config");
const I18nProvider = require("nordic/i18n/I18nProvider");
const ImageProvider = require("nordic/image/provider");
const View = require("./view");

exports.fetchProducts = (req, res, next) => {
  const { id } = req.params;

  ProductService.getProductDetail(id)
    .then((response) => {
      res.locals.product = response;
      next();
    })
    .catch((error) => {
      res.redirect("/error404");
    });
};

exports.productDescription = (req, res, next) => {
  const { id } = req.params;
  ProductService.getProductDescription(id)
    .then((response) => {
      res.locals.description = response;
      next();
    })
    .catch((error) => {
      res.redirect("/error404");
    });
};

exports.render = (req, res) => {
  const imagesPrefix = config.assets.prefix;

  const ProductView = (props) => (
    <I18nProvider i18n={req.i18n}>
      <ImageProvider prefix={imagesPrefix}>
        <View {...props} />
      </ImageProvider>
    </I18nProvider>
  );

  res.render(
    ProductView,
    {
      product: res.locals.product,
      description: res.locals.description,
      quantity: req.query.quantity,
      amount: req.query.amount,
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
