const router = require("express").Router();
const {
  CartPostController,
  CartGetController,
  CartDeleteController,
  CartUpdateController,
  confrimOrder,
  getConfirmOrderController,
  getConfirmOrderByEmailController,
  postCustomarInfo,
  confirmOrder,
  confirmOrderController,
  DeleteAllCartController,
  getConfirmOrderByIdController,
  cancelledOrderController,
  updateConfirmOrderStatus,
  geAlltConfirmOrderByEmailController,
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
  productSeacrhController,
} = require("../controllers/productController");
const { getRiderController, getRiderByEmailController, getAllRidersDataController } = require("../controllers/RiderController");
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
router.get("/search", productSeacrhController);

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
router.post("/confirm-order", postCustomarInfo);

//============== confrim order route==========

router.get("/confirm-order", getConfirmOrderController);
router.get("/confirm-order/:id", getConfirmOrderByIdController);
router.get("/confirm-order/customer/:email", getConfirmOrderByEmailController);
router.get(
  "/confirm-order/history/:email",
  geAlltConfirmOrderByEmailController
);
router.put("/confirm-order/:email", confirmOrderController);
router.put("/cancel-order/:id", cancelledOrderController);
router.patch("/update-confirm-order/:id", updateConfirmOrderStatus);
module.exports = router;
// ================rider routes ==============
router.get("/riders", getRiderController);
router.get("/riders/:email", getRiderByEmailController);
router.get("/riders/all-data/:email",getAllRidersDataController)
