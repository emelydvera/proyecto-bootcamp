const router = require("nordic/ragnar").router();
const {
  fetchProduct,
  productDescription,
  productPathFromRoot,
  render,
} = require("./controller");

router.get(
  "/:id",
  fetchProduct,
  productDescription,
  productPathFromRoot,
  render
);

module.exports = router;
