const React = require("react");
const { useState } = React;

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

module.exports = FilterItem;
