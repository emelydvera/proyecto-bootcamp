const React = require("react");
const { useState } = React;
const PropTypes = require('prop-types');
const UrlGenerator = require("../../utils/urlGenerator");

function FilterItem(props) {
  const { filter, urlGenerator } = props;
  const [show, setShow] = useState(false);

  // const handleClick = (filterId, valueId) => {
  //   urlGenerator.setQuery("limit", limit);
  //   urlGenerator.setFilter(filterId, valueId);
  // };

  return (
    <section className="filter_section" key={filter.id}>
      <h4 className="filter_section__name" onClick={() => setShow(!show)}>
        {` ${show ? "▲ " : "▼ "}${filter.name}`}
      </h4>
      <ul className="filter_section__list">
        {show &&
          filter.values.map((value) => (
            <li
              className="filter_section__list__item"
              key={filter.id + value.id}
            >
              <a onClick={() => urlGenerator.setFilter(filter.id, value.id)}>
                {value.name}
              </a>
            </li>
          ))}
      </ul>
    </section>
  );
}

FilterItem.propTypes = {
  filter: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
  urlGenerator: PropTypes.instanceOf(UrlGenerator).isRequired,
};

module.exports = FilterItem;
