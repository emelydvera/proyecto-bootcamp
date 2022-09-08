const React = require("react");
const { useState } = React;
const PropTypes = require("prop-types");
const UrlGenerator = require("../../utils/urlGenerator");
const { useI18n } = require("nordic/i18n");
const Typography = require('@andes/typography');
const Modal = require('@andes/modal');


function FilterModal(props) {

  const { i18n } = useI18n();
  const { filter, urlGenerator } = props;
  const [showMore, setShowMore] = useState(false)

  return (
    <>
      <Typography
        className="filter__modal__show"
        component="p"
        size="m"
        color="link"
        onClick={() => setShowMore(true)}
      >
        {i18n.gettext("Mostrar más")}
      </Typography>

      <Modal
        isOpen={showMore}
        onClose={() => { setShowMore(false) }}
        title={filter.name}
        closeButtonLabel={i18n.gettext("Cerrar {0}", filter.name)}
        type="card"
      >

        <div
          className="filter__modal"
        >

          {filter.values.map((value, index) => (
            <Typography
              key={index}
              className="filter__modal__value"
              onClick={() => urlGenerator.setFilter(filter.id || value.query, value.id)}
              component="p"
              size="m"
              color="secondary"
            >
              {`${value.name}  `}
              <span className="filter__modal__results">({value.results})</span>
            </Typography>
          ))}

        </div>

      </Modal>
    </>

  );
}

FilterModal.propTypes = {
  filter: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
  }),
  urlGenerator: PropTypes.instanceOf(UrlGenerator).isRequired,
};

module.exports = FilterModal;
