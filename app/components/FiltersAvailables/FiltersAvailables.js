const React = require("react");
const PropTypes = require("prop-types");

const UrlGenerator = require("../../utils/urlGenerator");
const FilterSection = require("../FilterSection");

function FiltersAvailables(props) {
  const { available_filters, urlGenerator } = props;

  return (
    <div>
      {available_filters.map((filter, index) => (
        <FilterSection
          filter={filter}
          key={index}
          urlGenerator={urlGenerator}
        />
      ))}
    </div>
  );
}

FiltersAvailables.propTypes = {
  filter: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
  urlGenerator: PropTypes.instanceOf(UrlGenerator).isRequired,
};

module.exports = FiltersAvailables;
