const React = require("react");
const PropTypes = require("prop-types");
const Script = require("nordic/script");
const serialize = require("serialize-javascript");
const { injectI18n } = require("nordic/i18n");
const Style = require("nordic/style");
const SearchInput = require("../../components/SearchInput");

function View(props) {
  const { i18n, translations } = props;
  const preloadedState = {
    i18n,
    translations,
  };

  return (
    <>
      <Script>
        {`
          window.__PRELOADED_STATE__ = ${serialize(preloadedState, {
            isJSON: true,
          })};
        `}
      </Script>
      <Script src="vendor.js" />
      <Script src="home.js" />
      <Style href="home.css" />
      <SearchInput i18n={i18n} />
    </>
  );
}

View.propTypes = {
  i18n: PropTypes.shape({
    gettext: PropTypes.func.isRequired,
  }).isRequired,
  translations: PropTypes.object,
};

module.exports = injectI18n(View);
