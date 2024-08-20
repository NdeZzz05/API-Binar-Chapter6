var express = require("express");
var router = express.Router();
const USER_CONTROLLER = require("../../../../controllers/user.controller");
const AUTH_MIDDLEWARE = require("../../../../middleware/authentication.middleware");
const ADMIN_ACCESS = require("../../../../middleware/authorization.middleware");
const { cloud } = require("../../../../config/storage/cloud");

router.get("/", AUTH_MIDDLEWARE, USER_CONTROLLER.getAllUser);
router.get("/:id", USER_CONTROLLER.getUserById);
router.get("/:id/posts", USER_CONTROLLER.getPostUserById);
router.put("/:id", cloud(["image/png", "image/jpeg"]).single("file"), USER_CONTROLLER.updateUser);
router.delete("/:id", USER_CONTROLLER.deleteUser);
router.put("/:id/upload-banner", cloud(["image/png", "image/jpeg"]).single("file"), USER_CONTROLLER.uploadBannerProfile);
router.get("/:id/qrcode", USER_CONTROLLER.qrMemberGenerator);

module.exports = router;
