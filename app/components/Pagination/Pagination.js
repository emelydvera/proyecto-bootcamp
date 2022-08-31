const React = require("react");
const { useState, useEffect } = React;
const PropTypes = require("prop-types");
const UrlGenerator = require("../../utils/urlGenerator");
const restclient = require("nordic/restclient")({
  timeout: 5000,
  baseURL: "/api",
});

const Pagination = ({
  totalProducts,
  urlGenerator,
  setData,
  productsInitial,
  i18n,
}) => {
  const [offset, setOffset] = useState(0);

  const [limit, setLimit] = useState(10);

  useEffect(() => {
    if (offset === 0) {
      setData(productsInitial);
    } else {
      restclient
        .get("/getProducts", {
          params: {
            ...urlGenerator.getQueries(),
            limit,
            offset,
          },
        })
        .then((res) => {
          setData(res.data.results);
        })
        .catch((err) => setData([]));
    }
  }, [offset]);

  const handlePrevious = () => {
    setOffset(offset - limit);
  };

  const handleNext = () => {
    setOffset(offset + limit);
  };

  return (
    <>
      <button
        disabled={offset === 0}
        className="pagination__start button"
      >Volver Inicio</button>
      <section className="pagination">
        <button
          className={
            offset === 0
              ?
              "pagination__back button button--disabled"
              : "pagination__back button button--enabled"
          }
          tabIndex="207"
          aria-label={i18n.gettext("Página Anterior")}
          onClick={handlePrevious}
          disabled={offset === 0}
        >
          {i18n.gettext("Página Anterior")}
        </button>
        <button
          className={
            (limit + offset >= totalProducts)
              ?
              "pagination__next button button--disabled"
              : "pagination__next button button--enabled"
          }
          tabIndex="208"
          aria-label={i18n.gettext("Página Siguiente")}
          onClick={handleNext}
          disabled={limit + offset >= totalProducts}
        >
          {i18n.gettext("Página Siguiente")}
        </button>
      </section>
    </>
  );
};

Pagination.propTypes = {
  totalProducts: PropTypes.number.isRequired,
  urlGenerator: PropTypes.instanceOf(UrlGenerator).isRequired,
  setData: PropTypes.func.isRequired,
  productsInitial: PropTypes.arrayOf(PropTypes.object).isRequired,
  i18n: PropTypes.shape({
    gettext: PropTypes.func.isRequired,
  }).isRequired,
};

module.exports = Pagination;
