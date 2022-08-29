const React = require("react");
const { useState } = React;
const PropTypes = require('prop-types');
const FilterService = require('../../utils/FilterService');
const FilterItem = require("../FilterItem");

const Filter = ({ baseUrl, query, filters, available_filters }) => {

  const filterService = new FilterService(baseUrl, query, filters);

  return (
    <aside>
      <ul>
        {
          filters.map(filter => (
              <li
                key={filter.id} 
                onClick={() => filterService.removeFilter(filter.id)} 
              >{filter.name}: {filter.values[0].name}</li>
            )
          )
        }
      </ul>

      {
        available_filters.map( (filter, index) => (
          <FilterItem filter={filter} key={index} filterService={filterService}/>
        ))
      }
    </aside>
  );
};

Filter.propTypes = {
  i18n: PropTypes.shape({
      gettext: PropTypes.func.isRequired,
    }).isRequired,
}

module.exports = Filter;
