const normalizerFilters = (filters) => {
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
        ...filter.values[0]
      })
    }

  });

  if (others.values.length >= 1) {
    others.values.sort((a, b) => a.results - b.results).reverse();
    available.push(others);
  }

  return available
};

module.exports = normalizerFilters;
