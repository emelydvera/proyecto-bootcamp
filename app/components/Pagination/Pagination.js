const React = require("react");
const { useState, useEffect } = React;

const PaginationComponent = require('@andes/pagination');

const PropTypes = require("prop-types");
const UrlGenerator = require("../../utils/urlGenerator");

const Pagination = ({
  totalProducts,
  urlGenerator,
}) => {

  const limit = urlGenerator.getQueryByName('limit');
  const totalPages = totalProducts > 1000 ? Math.ceil(1000 / limit) - 1 : Math.ceil(totalProducts / limit) - 1;
  const currentPage = parseInt(urlGenerator.getQueryByName('page'));

  return (
    <>
      {totalProducts > limit && (
        <section className="pagination">
          <PaginationComponent
            boundary={2}
            pageSelected={currentPage}
            pageQuantity={totalPages}
            href={`/listado?page=$page&${urlGenerator.getQueryString(false)}`}
          />
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
  setOffset: PropTypes.func.isRequired,
  offset: PropTypes.number.isRequired,
};

module.exports = Pagination;
