/* istanbul ignore file */
const React = require("react");
const config = require("nordic/config");
const I18nProvider = require("nordic/i18n/I18nProvider");
const ImageProvider = require("nordic/image/provider");
const View = require("./view");

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
