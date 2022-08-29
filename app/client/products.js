require('../pages/products/styles.scss')

const React = require("react");
const hydrate = require("nordic/hydrate");
const I18n = require("nordic/i18n");
const I18nProvider = require("nordic/i18n/I18nProvider");
const ImageProvider = require("nordic/image/provider");
const ProductsView = require("../pages/products/view");

const { products, translations, imagesPrefix, baseUrl, query, filters, available_filters } = window.__PRELOADED_STATE__;

const i18n = new I18n({ translations });

hydrate(
  <I18nProvider i18n={i18n}>
    <ImageProvider prefix={imagesPrefix}>
      <ProductsView products={products} baseUrl={baseUrl} query={query} filters={filters} available_filters={available_filters}/>
    </ImageProvider>
  </I18nProvider>,
  document.getElementById("root-app")
);
