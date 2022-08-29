/**
 * Module dependencies
 */
const router = require("nordic/ragnar").router();
const config = require("nordic/config");
const { layoutMiddleware } = require("nordic/layout");
const i18nMiddleware = require("nordic/i18n/middleware");
const polyfillsMiddleware = require("nordic/script/polyfills-middleware");

/**
 * Set up mocks
 */
require("../../mocks");

/**
 * Routers
 */
const homeRoute = require("../pages/home");
const productsRoute = require("../pages/products");
const product = require("../pages/product");
const error404 = require("../pages/error404");

/**
 * Use global middlewares
 */
router.use(layoutMiddleware());
router.use(i18nMiddleware(config.i18n));
router.use(polyfillsMiddleware(config.polyfillLimits));

/**
 * Redirect
 */
// router.get('/', (req, res) => res.redirect(`${config.ragnar.basePath}demo`));

/**
 * Mount routers
 */
router.use("/", homeRoute);
router.use("/listado", productsRoute);
router.use("/product", product);
router.use("/error404", error404);
router.use("/*", error404);

/**
 * Expose router
 */
module.exports = router;
