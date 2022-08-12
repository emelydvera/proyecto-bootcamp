const normalizer = (products) => {
  return products.map((product) => product.buy_box_winner || product);
};

module.exports = normalizer;
