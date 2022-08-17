const router = require("nordic/ragnar").router();
const { fetchProducts, productDescription, render } = require("./controller");

router.get("/:id", fetchProducts, productDescription, render);

module.exports = router;
