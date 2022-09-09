const React = require("react");
const PropTypes = require("prop-types");
const Button = require("@andes/button");
const Form = require("@andes/form");
const TextField = require("@andes/textfield");
const { ButtonText } = Button;
const { useState, useRef } = React;

const SearchInput = ({ i18n }) => {
  const [value, setValue] = useState("");
  const isMounted = useRef(false);

  const handleChange = (e) => {
    isMounted.current = true;
    setValue(() => e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.href = `listado?q=${value}`;
    setTimeout(() => setValue(() => ""), 1000);
  };

  return (
    <div className="search__container">
      <Form className="search__form" onSubmit={handleSubmit}>
        <TextField
          className="search__form__input"
          aria-label={i18n.gettext("Ingrese producto a buscar")}
          type="text"
          placeholder={i18n.gettext("Buscar productos, marcas y más...")}
          value={value}
          onChange={handleChange}
          tabIndex="11"
          message={
            value.trim().length === 1
              ? i18n.gettext("Escriba al menos 2 carácteres")
              : ""
          }
          modifier={value.trim().length === 1 ? "error" : "default"}
        />
        <Button
          className="search__form__button"
          disabled={value.trim().length < 2}
          spinnerLabel="Cargando"
          type="submit"
        >
          <ButtonText>{i18n.gettext("Buscar")}</ButtonText>
        </Button>
      </Form>
    </div>
  );
};

SearchInput.propTypes = {
  i18n: PropTypes.shape({
    gettext: PropTypes.func.isRequired,
  }).isRequired,
};

module.exports = SearchInput;
