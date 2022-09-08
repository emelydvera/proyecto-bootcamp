const React = require("react");
const PropTypes = require("prop-types");
const UrlGenerator = require("../../utils/urlGenerator");
const Typography = require('@andes/typography');
const FilterModal = require("../FilterModal");


function FilterItem(props) {
  const { filter, urlGenerator } = props;

  return (

    <section className="filter__section">

      <Typography
        className="filter__section__name"
        component="p"
        type="title"
        size="xs"
        color="primary"
      >
        {filter.name}
      </Typography>


      {filter.values.slice(0, 4).map((value, index) => (

        <Typography
          key={index}
          className="filter__section__value"
          onClick={() => urlGenerator.setFilter(filter.id, value.id)}
          component="p"
          size="m"
          color="secondary"
        >
          {value.name}
          <span className="results">({value.results})</span>
        </Typography>
      ))}

      {
        filter.values.length > 4 &&
        <FilterModal filter={filter} urlGenerator={urlGenerator} />
      }



    </section>
  );
}

FilterItem.propTypes = {
  filter: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
  }),
  urlGenerator: PropTypes.instanceOf(UrlGenerator).isRequired,
};

module.exports = FilterItem;
