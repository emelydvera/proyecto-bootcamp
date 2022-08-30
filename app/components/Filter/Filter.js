const React = require("react");
const { useState } = React;
const PropTypes = require('prop-types');
const FilterItem = require("../FilterItem");

const Filter = ({ filters, available_filters, urlGenerator}) => {

  return (
    <aside>
      <ul>
        {
          filters.map(filter => (
              <li
                key={filter.id} 
                onClick={() => urlGenerator.removeFilter(filter.id)} 
              >{filter.name}: {filter.values[0].name}</li>
            )
          )
        }
      </ul>

      {
        available_filters.map( (filter, index) => (
          <FilterItem filter={filter} key={index} urlGenerator={urlGenerator}/>
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
