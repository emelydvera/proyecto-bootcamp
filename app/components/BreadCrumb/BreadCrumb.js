const React = require("react");
const Breadcrumb = require("@andes/breadcrumb");
const { useI18n } = require("nordic/i18n");
const PropTypes = require("prop-types");

const BreadCrumb = ({ path, productTitle }) => {
  const { i18n } = useI18n();

  const levels = path.map((level, index) => ({
    text: level.name,
    title: i18n.gettext("Ir a la sección {0}", level.name),
    id: (index + 1).toString(),
    href: `/listado?category=${level.id}`,
  }));

  if (productTitle) {
    levels.push({
      text: productTitle.trim().split(" ")[0],
      disabled: true,
      id: (levels.length + 1).toString(),
    });
  }

  return (
    <>
      <Breadcrumb
        levels={levels}
        aria-label={i18n.gettext("lista de páginas")}
        className="breadcrumb"
      />
    </>
  );
};

BreadCrumb.propTypes = {
  path: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    })
  ).isRequired,
  productTitle: PropTypes.string,
};

module.exports = BreadCrumb;
