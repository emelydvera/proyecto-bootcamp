const React = require("react");
const PropTypes = require("prop-types");

const Typography = require('@andes/typography');

const UrlGenerator = require("../../utils/urlGenerator");
const { useI18n } = require("nordic/i18n");
const FiltersApplied = require("../FiltersApplied");
const FiltersAvailables = require("../FiltersAvailables");

const Filter = ({ filters, available_filters, urlGenerator, totalProducts }) => {
  const { i18n } = useI18n();

  return (
    <aside className="filters">
      <Typography component="p" type="title" size="l">
        {urlGenerator.getQueryByName('q')}
      </Typography>
      <Typography component="p" size="l" color="secondary"  >
        {i18n.ngettext("{0} resultado", "{0} resultados", totalProducts, [totalProducts])}
      </Typography>

      <FiltersApplied filters={filters} urlGenerator={urlGenerator} />

      <FiltersAvailables available_filters={available_filters} urlGenerator={urlGenerator} />
    </aside>
  );
};

Filter.propTypes = {
  totalProducts: PropTypes.number.isRequired,
  filters: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  available_filters: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  urlGenerator: PropTypes.instanceOf(UrlGenerator).isRequired,
};

module.exports = Filter;
