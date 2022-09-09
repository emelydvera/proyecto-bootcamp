const React = require("react");
const PropTypes = require("prop-types");
const Typography = require("@andes/typography");
const UrlGenerator = require("../../utils/urlGenerator");
const { useI18n } = require("nordic/i18n");

function FilterValue(props) {
  const { id, value, urlGenerator } = props;
  const { i18n } = useI18n();

  return (
    <Typography
      className="filter__section__value"
      onClick={() => urlGenerator.setFilter(id, value.id)}
      component="p"
      size="m"
      color="secondary"
    >
      {i18n.gettext(value.name + "  ")}
      <span className="filter__section__value__results">({value.results})</span>
    </Typography>
  );
}

FilterValue.propTypes = {
  id: PropTypes.string,
  value: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
  urlGenerator: PropTypes.instanceOf(UrlGenerator).isRequired,
};

module.exports = FilterValue;
