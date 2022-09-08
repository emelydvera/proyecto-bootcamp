const React = require("react");
const PropTypes = require("prop-types");
const { useI18n } = require("nordic/i18n");
const UrlGenerator = require("../../utils/urlGenerator");

const Dropdown = require("@andes/dropdown");
const { DropdownItem } = Dropdown;

const options = ["5", "10", "15", "20"];

const SelectProductsPerPage = ({ urlGenerator }) => {
  const { i18n } = useI18n();
  const initialLimit = urlGenerator.getQueryByName("limit");
  const handleChange = (e, value) => {
    urlGenerator.setQuery("limit", parseInt(value));
    window.location.href = `/listado?${urlGenerator.getQueryString()}`;
  };

  return (
    <div className="products__per-page">
      <Dropdown
        className="products__dropdown"
        label="Ordenar por"
        value={"" + initialLimit}
        position={false}
        size="compact"
        onChange={handleChange}
      >
        {options.map((value) => (
          <DropdownItem
            key={value}
            value={"" + value}
            primary={i18n.gettext("{0} resultados por pagina", value)}
          />
        ))}
      </Dropdown>
    </div>
  );
};

SelectProductsPerPage.propTypes = {
  urlGenerator: PropTypes.instanceOf(UrlGenerator).isRequired,
};

module.exports = SelectProductsPerPage;
