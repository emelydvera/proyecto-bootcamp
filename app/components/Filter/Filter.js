const React = require("react");
const { useState } = React;
const PropTypes = require("prop-types");
const FilterItem = require("../FilterItem");

const Filter = ({ filters, available_filters, urlGenerator }) => {
  return (
    <aside className="filters">
      {filters.length > 0 && (
        <h3 className="filters__availables">Filtrando por:</h3>
      )}
      <ul className="filters__list">
        {filters.map((filter) => (
          <li
            className="filters__list__item"
            key={filter.id}
            onClick={() => urlGenerator.removeFilter(filter.id)}
          >
            {`ⓧ ${filter.name}`}: {filter.values[0].name}
          </li>
        ))}
      </ul>
      <h3>Filtros:</h3>
      {available_filters.map((filter, index) => (
        <FilterItem filter={filter} key={index} urlGenerator={urlGenerator} />
      ))}
    </aside>
  );
};

Filter.propTypes = {
  i18n: PropTypes.shape({
    gettext: PropTypes.func.isRequired,
  }).isRequired,
};

module.exports = Filter;
