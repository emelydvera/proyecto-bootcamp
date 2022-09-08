function amountFormater(amount) {
  const [priceWithoutCents, cents] = `${amount}`.split(".");
  const exp = /(\d)(?=(\d{3})+(?!\d))/g;
  const price = priceWithoutCents.toString().replace(exp, "$1.");

  return {
    fraction: price,
    cents: cents || "00",
  };
}
module.exports = amountFormater;
