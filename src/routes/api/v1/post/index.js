var express = require("express");
var router = express.Router();
const { cloud } = require("../../../../config/storage/cloud");
const POST_CONTROLLER = require("../../../../controllers/post.controller");

router.get("/", POST_CONTROLLER.getAllPost);
router.get("/:id", POST_CONTROLLER.getPostById);
router.post("/", cloud(["image/png", "image/jpeg"]).single("file"), POST_CONTROLLER.createPost);
router.put("/:id", cloud(["image/png", "image/jpeg"]).single("file"), POST_CONTROLLER.updatePost);
router.delete("/:id", POST_CONTROLLER.deletePost);

module.exports = router;
