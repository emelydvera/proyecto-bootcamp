const React = require("react");
const PropTypes = require("prop-types");
const Typography = require('@andes/typography');
const UrlGenerator = require("../../utils/urlGenerator");


function FilterValue(props) {
  const { key, id, value, urlGenerator } = props;

  return (

    <Typography
      key={key}
      className="filter__section__value"
      onClick={() => urlGenerator.setFilter(id, value.id)}
      component="p"
      size="m"
      color="secondary"
    >
      {value.name + "  "}
      <span className="filter__section__value__results">({value.results})</span>
    </Typography>

  );
}

FilterValue.propTypes = {
  key: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
  }),
  urlGenerator: PropTypes.instanceOf(UrlGenerator).isRequired,
};

module.exports = FilterValue;
