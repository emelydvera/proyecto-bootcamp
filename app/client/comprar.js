require('../pages/comprar/styles.scss');

const React = require("react");
const hydrate = require("nordic/hydrate");
const I18n = require("nordic/i18n");
const I18nProvider = require("nordic/i18n/I18nProvider");
const ImageProvider = require("nordic/image/provider");
const CheckoutView = require("../pages/comprar/view");

const { product, quantityToBuy } = window.__PRELOADED_STATE__;


hydrate(
  <CheckoutView product={product} quantityToBuy={quantityToBuy} />,
  document.getElementById("root-app")
);
