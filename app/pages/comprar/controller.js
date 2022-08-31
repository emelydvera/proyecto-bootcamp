const React = require("react");
const ProductService = require("../../../services/productService");
const config = require("nordic/config");
const I18nProvider = require("nordic/i18n/I18nProvider");
const ImageProvider = require("nordic/image/provider");
const View = require("./view");

exports.fetchProduct = function fetchProduct(req, res, next) {
  const { productId, quantityToBuy } = req.query;

  ProductService.getProductDetail(productId)
    .then((response) => {
      res.locals.product = response;
      res.locals.quantityToBuy = quantityToBuy;
      next();
    })
    .catch((error) => {
      // res.redirect("/error404");
      next();
    });
};

exports.render = function render(req, res) {
  const CheckoutView = (props) => {
    return <View {...props} />;
  };

  res.render(CheckoutView, {
    product: res.locals.product,
    quantityToBuy: res.locals.quantityToBuy,
  });
};
