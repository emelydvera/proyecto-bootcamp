const React = require("react");
const Image = require("nordic/image");

const options = [{ value: 5 }, { value: 10 }, { value: 15 }, { value: 20 }];

const SelectProductsPerPage = ({ setLimit, limit, setOffset }) => {
  const handleChange = (e) => {
    setOffset(0)
    setLimit(parseInt(e.target.value));
  };
  return (
    <div className="products__per-page">
      <span>Productos por página</span>
      <select
        className="products__per-page__select"
        onChange={handleChange}
        defaultValue={limit.toString()}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.value}
          </option>
        ))}
      </select>
      {/* <Image
        src="dropdown-image.svg"
        // lazyload="off"
        className="products__per-page__dropdown"
      ></Image> */}
    </div>
  );
};

module.exports = SelectProductsPerPage;
