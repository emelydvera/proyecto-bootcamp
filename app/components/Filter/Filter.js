const React = require("react");
const { useState } = React;
const PropTypes = require('prop-types');
const FilterService = require('../../../services/FilterService');
const FilterItem = require("../FilterItem");

const Filter = ({ query, available_filters }) => {
  const filterService = new FilterService(query);

  const handleNewUrl = (e) => {
    window.location.href = `listado${filterService.getNewUrl()}`;
  }

  return (
    <aside>
      <button onClick={handleNewUrl} >Filtrar</button>
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
