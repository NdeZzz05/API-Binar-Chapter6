const { BadRequest } = require("../errors/customsErrors");
const POST_SERVICE = require("../services/post.service");
const POST_VALIDATION = require("../validation/post.validation");

const POST_CONTROLLER = {
  getAllPost: async (req, res) => {
    // code here
    try {
      const result = await POST_SERVICE.getAllPost(req.query);
      res.status(200).json({
        success: true,
        message: "Get all posts successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },
  getPostById: async (req, res, next) => {
    // code here
    try {
      const result = await POST_SERVICE.getPostById(req.params.id);

      res.status(200).json({
        success: true,
        message: "Get post by id successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },

  createPost: async (req, res, next) => {
    // code here
    try {
      const { error, value } = POST_VALIDATION.create(req.body);
      if (error) throw new BadRequest(error.details[0].message);

      const data = {
        file: req.file || null,
        body: value,
      };

      const result = await POST_SERVICE.createPost(data);
      res.status(200).json({
        success: true,
        message: "Post created successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },
  updatePost: async (req, res, next) => {
    // code here
    try {
      const { error, value } = POST_VALIDATION.create(req.body);
      if (error) throw new BadRequest(error.details[0].message);

      const data = {
        file: req.file || null,
        body: value,
      };

      const result = await POST_SERVICE.updatePost(req.params.id, data);
      res.status(200).json({
        success: true,
        message: "Post updated successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },
  deletePost: async (req, res, next) => {
    // code here
    try {
      const result = await POST_SERVICE.deletePost(req.params.id);
      res.status(200).json({
        success: true,
        message: "Post deleted successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = POST_CONTROLLER;
