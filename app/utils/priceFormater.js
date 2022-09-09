function amountFormater(amount) {
  const [priceWithoutCents, cents] = `${amount}`.split(".");
  const exp = /(\d)(?=(\d{3})+(?!\d))/g;
  const price = priceWithoutCents.toString().replace(exp, "$1.");

  return {
    fraction: price,
    cents: cents?.length === 1 && cents + '0' || cents?.slice(0, 2) || "00",
  };
}

module.exports = amountFormater;
