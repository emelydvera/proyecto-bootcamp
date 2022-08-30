const router = require("nordic/ragnar").router();
const ProductService = require("../services/productService");

router.get("/", (req, res) => {
  const { siteId } = req.platform;

  ProductService.getProducts(siteId, req.query)
    .then((response) => res.status(200).json(response))
    .catch((error) => {
      console.error(error);
      res.status(500).json([]);
    });
});

module.exports = router;
