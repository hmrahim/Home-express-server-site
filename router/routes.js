const router = require("express").Router();
const {
  CartPostController,
  CartGetController,
  CartDeleteController,
  CartUpdateController,
  confrimOrder,
  getConfirmOrderController,
} = require("../controllers/CartController");
const {
  categoryGetController,
  categoryGetByIdController,
  categoryPostController,
  categoryPutController,
  categoryDeleteController,
} = require("../controllers/CategoryController");
const {
  productGetController,
  productPostController,
  productPutController,
  productFindOneById,
  productDeleteController,
} = require("../controllers/productController");
const {
  userGetController,
  userPostController,
  userPutController,
  userGetControllerBYEmail,
} = require("../controllers/UserController");
const categoryValidator = require("../validations/categoryValidator");
const productValidation = require("../validations/productValidation");
const userValidator = require("../validations/userValidation");

router.get("/product", productGetController);
router.post("/product", productValidation, productPostController);
router.get("/product/:id", productFindOneById);
router.put("/product/:id", productPutController);
router.delete("/product/:id", productDeleteController);

//================= Categor routes=================
router.post("/category", categoryValidator, categoryPostController);
router.get("/category", categoryGetController);
router.get("/category/:id", categoryGetByIdController);
router.put("/category/:id", categoryPutController);
router.delete("/category/:id", categoryDeleteController);

// =========================User Routes =============================
router.get("/user", userGetController);
router.get("/user/:email", userGetControllerBYEmail);
router.post("/user", userValidator, userPostController);
router.put("/user", userPutController);
// =========================Cart======================
router.post("/cart", CartPostController);
router.get("/cart/:email", CartGetController);
router.delete("/cart/:id", CartDeleteController);
router.put("/cart/:id", CartUpdateController);
router.post("/confirm-order", confrimOrder);
router.get("/confirm-order", getConfirmOrderController);
module.exports = router;
