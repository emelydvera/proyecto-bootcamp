const React = require("react");

const options = [{ value: 5 }, { value: 10 }, { value: 15 }, { value: 20 }];

const SelectProductsPerPage = ({ setLimit, limit }) => {
  const handleChange = (e) => {
    setLimit(parseInt(e.target.value));
  };
  return (
    <select
      className="products__per-page"
      onChange={handleChange}
      defaultValue={limit.toString()}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.value}
        </option>
      ))}
    </select>
  );
};

module.exports = SelectProductsPerPage;
