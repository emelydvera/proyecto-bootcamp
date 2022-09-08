const normalizerFilters = (filters = []) => {
  let available = []
  let others = {
    name: "Otras características",
    values: []
  };
  filters.forEach(filter => {
    if (filter.values.length > 1) {
      available.push(filter);
    } else {
      others.values.push({
        query: filter.id,
        name: filter.values[0].name,
        id: filter.values[0].id,
        results: filter.values[0].results
      })
    }

  });
  available.push(others)
  return available
};

module.exports = normalizerFilters;
