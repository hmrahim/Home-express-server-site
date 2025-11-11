const router = require("express").Router();
const { categoryGetController, categoryGetByIdController, categoryPostController, categoryPutController, categoryDeleteController } = require("../controllers/CategoryController");
const {
  productGetController,
  productPostController,
  productPutController,
  productFindOneById,
  productDeleteController,
} = require("../controllers/productController");
const categoryValidator = require("../validations/categoryValidator");
const productValidation = require("../validations/productValidation");

router.get("/product", productGetController);
router.post("/product", productValidation, productPostController);
router.get("/product/:id", productFindOneById);
router.put("/product/:id", productPutController);
router.delete("/product/:id", productDeleteController);

//================= Categor routes=================
router.post("/category",categoryValidator,categoryPostController)
router.get("/category",categoryGetController)
router.get("/category/:id",categoryGetByIdController)
router.put("/category/:id",categoryPutController)
router.delete("/category/:id",categoryDeleteController)

module.exports = router;
