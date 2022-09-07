const normalizer = (products) => {
  return products.map((product) =>
    product.buy_box_winner || product)
    .filter(product => product.title);
};

module.exports = normalizer;
