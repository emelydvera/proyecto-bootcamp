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
  i18n,
  limit,
  productsInitial,
}) => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (offset === 0 && limit === 10) {
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

  useEffect(() => {
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
      .catch(() => setData([]));
  }, [limit]);

  const handlePrevious = () => {
    if (offset - limit <= 0) {
      return setOffset(0);
    }
    return setOffset(offset - limit);
  };

  const handleNext = () => {
    if (offset + limit > 1000) {
      return setOffset(1000);
    }
    return setOffset(offset + limit);
  };

  const handleGoInitialPagination = () => {
    setOffset(0);
  };

  return (
    <>
      {totalProducts > limit && (
        <section className="pagination">
          <button
            disabled={offset === 0}
            className="pagination__start button"
            onClick={handleGoInitialPagination}
          >
            Volver Inicio
          </button>
          <button
            className="pagination__back button"
            tabIndex="207"
            aria-label={i18n.gettext("Página Anterior")}
            onClick={handlePrevious}
            disabled={offset === 0}
          >
            {i18n.gettext("Página Anterior")}
          </button>
          <button
            className="pagination__next button"
            tabIndex="208"
            aria-label={i18n.gettext("Página Siguiente")}
            onClick={handleNext}
            disabled={limit + offset >= totalProducts}
          >
            {i18n.gettext("Página Siguiente")}
          </button>
        </section>
      )}
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
