const React = require("react");
const PropTypes = require("prop-types");
const Typography = require("@andes/typography");
const UrlGenerator = require("../../utils/urlGenerator");
const FilterModal = require("../FilterModal");
const FilterValue = require("../FilterValue");
const { useI18n } = require("nordic/i18n");

function FilterSection(props) {
  const { filter, urlGenerator } = props;
  const { i18n } = useI18n();

  return (
    <section className="filter__section">
      <Typography
        className="filter__section__name"
        component="p"
        type="title"
        size="xs"
        color="primary"
      >
        {i18n.gettext(filter.name)}
      </Typography>
      {filter.values.slice(0, 4).map((value, index) => (
        <FilterValue
          key={index}
          id={filter.id || value.query}
          value={value}
          urlGenerator={urlGenerator}
        />
      ))}
      {filter.values.length > 4 && (
        <FilterModal filter={filter} urlGenerator={urlGenerator} />
      )}
    </section>
  );
}

FilterSection.propTypes = {
  filter: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
  }),
  urlGenerator: PropTypes.instanceOf(UrlGenerator).isRequired,
};

module.exports = FilterSection;
