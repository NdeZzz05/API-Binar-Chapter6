var express = require("express");
var router = express.Router();
const CATEGORY_CONTROLLER = require("../../../../controllers/category.controller");
const AUTH_MIDDLEWARE = require("../../../../middleware/authentication.middleware");
const ADMIN_ACCESS = require("../../../../middleware/authorization.middleware");

router.get("/", CATEGORY_CONTROLLER.getAllCategory);
router.get("/:id", CATEGORY_CONTROLLER.getCategoryById);
router.post("/", CATEGORY_CONTROLLER.createCategory);
router.put("/:id", CATEGORY_CONTROLLER.updateCategory);
router.delete("/:id", AUTH_MIDDLEWARE, ADMIN_ACCESS, CATEGORY_CONTROLLER.deleteCategory);

module.exports = router;
