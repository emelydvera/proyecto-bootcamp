const router = require("nordic/ragnar").router();
const {
  fetchProducts,
  productDescription,
  productPathFromRoot,
  render,
} = require("./controller");

router.get(
  "/:id",
  fetchProducts,
  productDescription,
  productPathFromRoot,
  render
);

module.exports = router;
