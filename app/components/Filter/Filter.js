const React = require("react");
const PropTypes = require("prop-types");
const FilterItem = require("../FilterItem");
const UrlGenerator = require("../../utils/urlGenerator");
const { useI18n } = require("nordic/i18n");

const Filter = ({ filters, available_filters, urlGenerator, limit }) => {
  const { i18n } = useI18n();

  return (
    <aside className="filters">
      {filters.length > 0 && (
        <h3 className="filters__availables">
          {i18n.gettext("Filtrando por:")}
        </h3>
      )}
      <ul className="filters__list">
        {filters.map(({ id, name, values }) => (
          <li
            className="filters__list__item"
            key={id}
            onClick={() => urlGenerator.removeFilter(id)}
          >
            {`ⓧ ${name}`}: {values[0].name}
          </li>
        ))}
      </ul>

      <h3>{i18n.gettext("Filtros:")}</h3>

      {available_filters.map((filter, index) => (
        <FilterItem
          filter={filter}
          key={index}
          urlGenerator={urlGenerator}
          limit={limit}
        />
      ))}
    </aside>
  );
};

Filter.propTypes = {
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
