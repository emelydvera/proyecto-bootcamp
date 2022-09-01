const React = require("react");

const options = [{ value: 5 }, { value: 10 }, { value: 15 }, { value: 20 }];

const SelectProductsPerPage = ({ setLimit, limit }) => {
  const handleChange = (e) => {
    setLimit(e.target.value);
  };
  return (
    <select onChange={handleChange} defaultValue={limit}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.value}
        </option>
      ))}
    </select>
  );
};

module.exports = SelectProductsPerPage;
