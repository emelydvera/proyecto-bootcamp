const React = require("react");
const PropTypes = require("prop-types");
const Tag = require('@andes/tag');
const UrlGenerator = require("../../utils/urlGenerator");
const { useI18n } = require("nordic/i18n");


function FiltersApplied(props) {
  const { i18n } = useI18n();
  const { filters, urlGenerator } = props;

  return (
    <div>
      {filters.map(({ id, name, values }, index) => (
        <Tag
          key={index}
          label={values[0]?.name}
          closeButtonLabel={i18n.gettext('Eliminar filtro: {0}: {1}', name, values[0]?.name)}
          onClose={() => urlGenerator.removeFilter(id)}
          size="small"
          tabIndex={211}
        />
      ))}
    </div>
  );
}

FiltersApplied.propTypes = {
  filter: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
  urlGenerator: PropTypes.instanceOf(UrlGenerator).isRequired,
};

module.exports = FiltersApplied;
