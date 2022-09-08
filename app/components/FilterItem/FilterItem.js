const React = require("react");
const { useState } = React;
const PropTypes = require("prop-types");
const UrlGenerator = require("../../utils/urlGenerator");
const { useI18n } = require("nordic/i18n");
const Typography = require('@andes/typography');
const Modal = require('@andes/modal');


function FilterItem(props) {
  const { i18n } = useI18n();
  const { filter, urlGenerator } = props;
  const [showMore, setShowMore] = useState(false)

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


      {filter.values.slice(0, 4).map((value) => (

        <Typography
          className="filter__section__value"
          onClick={() => urlGenerator.setFilter(filter.id, value.id)}
          component="p"
          size="m"
          color="secondary"
        >
          {`${value.name}  `}
          <span className="results">({value.results})</span>
        </Typography>
      ))}

      {
        filter.values.length > 4 &&
        <Typography
          className="filter__section__modal__show"
          component="p"
          size="m"
          color="link"
          onClick={() => setShowMore(true)}
        >
          {i18n.gettext("Mostrar más")}
        </Typography>
      }

      <Modal
        isOpen={showMore}
        onClose={() => { setShowMore(false) }}
        title={filter.name}
        type="card"
      >
        <div
          className="filter__section__modal"
        >
          {filter.values.map((value) => (
            <Typography
              className="filter__section__value"
              onClick={() => urlGenerator.setFilter(filter.id, value.id)}
              component="p"
              size="m"
              color="secondary"
            >
              {`${value.name}  `}
              <span className="results">({value.results})</span>
            </Typography>
          ))}
        </div>
      </Modal>

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
