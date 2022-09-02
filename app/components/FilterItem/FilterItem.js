const React = require("react");
const { useState } = React;
const PropTypes = require("prop-types");
const UrlGenerator = require("../../utils/urlGenerator");
const { useI18n } = require("nordic/i18n");

function FilterItem(props) {
  const { i18n } = useI18n();
  const { filter, urlGenerator } = props;

  return (
    <section
      className="filter_section"
      aria-label={i18n.gettext("Filtros de {0}", filter.name)}
      key={filter.id}
    >
      <details>
        <summary
          aria-label={i18n.gettext("{0}", filter.name)}
          className="filter_section__name"
        >
          {filter.name}
        </summary>
        <ul className="filter_section__list">
          {filter.values.map((value) => (
            <li
              className="filter_section__list__item"
              aria-label={i18n.gettext("{0}", value.name)}
              tabIndex={214}
              key={filter.id + value.id}
            >
              <a onClick={() => urlGenerator.setFilter(filter.id, value.id)}>
                {value.name}
              </a>
            </li>
          ))}
        </ul>
      </details>
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
