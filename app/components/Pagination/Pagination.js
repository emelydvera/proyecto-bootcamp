const React = require("react");
const { useState, useEffect } = React;

const PaginationComponent = require('@andes/pagination');

const PropTypes = require("prop-types");
const UrlGenerator = require("../../utils/urlGenerator");

const Pagination = ({
  totalProducts,
  urlGenerator,
  setData,
  i18n,
  limit,
  productsInitial,
  setOffset,
  offset
}) => {

  const totalPages = totalProducts > 1000 ? Math.ceil(1000 / limit) - 1 : Math.ceil(totalProducts / limit) - 1;
  const currentPage = parseInt(urlGenerator.getQueryByName('page'));

  const formatUrl = (href, page) => {
    urlGenerator.setQuery('page', page)
    return `${href}?${urlGenerator.getQueryString()}`;
  };


  return (
    <>
      {totalProducts > limit && (
        <section className="pagination">
          <PaginationComponent
            boundary={2}
            pageSelected={currentPage}
            pageQuantity={totalPages}
            href="/listado"
            formatUrl={formatUrl}
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
