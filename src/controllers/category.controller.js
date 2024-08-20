const { BadRequest } = require("../errors/customsErrors");
const CATEGORY_SERVICE = require("../services/category.service");
const CATEGORY_VALIDATION = require("../validation/category.validation");

const CATEGORY_CONTROLLER = {
  getAllCategory: async (req, res, next) => {
    try {
      const result = await CATEGORY_SERVICE.getAllCategory();
      res.status(200).json({
        success: true,
        message: "Categories fetched successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },
  getCategoryById: async (req, res, next) => {
    try {
      const result = await CATEGORY_SERVICE.getCategoryById(req.params.id);
      res.status(200).json({
        success: true,
        message: "Category fetched successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },
  createCategory: async (req, res, next) => {
    try {
      const { error, value } = CATEGORY_VALIDATION.create(req.body);

      if (error) throw new BadRequest(error.details[0].message);

      const result = await CATEGORY_SERVICE.createCategory(value);
      res.status(200).json({
        success: true,
        message: "Category created successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },
  updateCategory: async (req, res, next) => {
    try {
      const { error, value } = CATEGORY_VALIDATION.create(req.body);

      if (error) throw new BadRequest(error.details[0].message);
      const result = await CATEGORY_SERVICE.updateCategory(req.params.id, value);
      res.status(200).json({
        success: true,
        message: "Category updated successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },
  deleteCategory: async (req, res, next) => {
    try {
      const result = await CATEGORY_SERVICE.deleteCategory(req.params.id);
      res.status(200).json({
        success: true,
        message: "Category deleted successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = CATEGORY_CONTROLLER;
