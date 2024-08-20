const express = require("express");
const router = express.Router();
const AUTH_ROUTER = require("./auth/index");
const USER_ROUTER = require("./user/index");
const CATEGORY_ROUTER = require("./category/index");
const POST_ROUTER = require("./post/index");

router.use("/auth", AUTH_ROUTER);
router.use("/users", USER_ROUTER);
router.use("/categories", CATEGORY_ROUTER);
router.use("/post", POST_ROUTER);

module.exports = router;
