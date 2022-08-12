const React = require("react");
const { useState } = React;
const Image = require("nordic/image");
const Script = require("nordic/script");
const serialize = require("serialize-javascript");
const { injectI18n } = require("nordic/i18n");

function View(props) {
  const { products, i18n, translations } = props;
  const preloadedState = {
    products,
    i18n,
    translations,
  };

  const [state, setState] = useState("");

  console.log(state);

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
      <button onClick={() => setState("Hello 👋🏽")}>Pincha aquí</button>
      <Image
        className="demo-images__img"
        src="demo-image.jpg"
        alt={i18n.gettext("Mural painting")}
      />
    </>
  );
}

module.exports = injectI18n(View);
