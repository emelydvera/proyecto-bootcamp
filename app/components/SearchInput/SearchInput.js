const React = require("react");
const PropTypes = require("prop-types");

const Button = require("@andes/button");
const { ButtonText } = Button;
const Form = require("@andes/form");

const TextField = require("@andes/textfield");
const { CodeInput } = require("@andes/textfield");

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
    <Form className="search__form" onSubmit={handleSubmit}>
      {/* <form
          className="search__form"
          onSubmit={handleSubmit}
          role={i18n.gettext("search")}
        >
          <label className="search__label" htmlFor="searchInput">
            {i18n.gettext("Buscar")}
          </label> */}
      {/* <div className="search__container"> */}
      {/* <input
            className="search__input"
            aria-label={i18n.gettext("Ingrese producto a buscar")}
            id="searchInput"
            type="text"
            minLength="2"
            placeholder={i18n.gettext("Buscar productos, marcas y más...")}
            value={value}
            onChange={handleChange}
            required
            tabIndex="11"
          /> */}
      <TextField
        className="search__form__input"
        aria-label={i18n.gettext("Ingrese producto a buscar")}
        id="searchInput"
        type="text"
        minLength="2"
        placeholder={i18n.gettext("Buscar productos, marcas y más...")}
        value={value}
        onChange={handleChange}
        required
        tabIndex="11"
      />
      <Button
        className="search__button"
        disabled={value.trim().length < 2}
        type="submit"
      >
        <ButtonText>{i18n.gettext("Buscar")}</ButtonText>
      </Button>
      {/* </div> */}
      {/* {!isMounted.current ? (
          <p className="search__alert"> </p>
        ) : value.trim().length >= 2 ? (
          <p className="search__alert"> </p>
        ) : (
          <p
            className="search__alert"
            aria-label={i18n.gettext("Escriba al menos 2 carácteres")}
            tabIndex="12"
          >
            {i18n.gettext("* Escriba al menos 2 carácteres")}
          </p> 
        )}*/}
    </Form>
  );
};

SearchInput.propTypes = {
  i18n: PropTypes.shape({
    gettext: PropTypes.func.isRequired,
  }).isRequired,
};

module.exports = SearchInput;
