const { NotFoundError, BadRequest } = require("../errors/customsErrors");
const CATEGORY_MODELS = require("../models/category.models");

const CATEGORY_SERVICE = {
  getAllCategory: async () => {
    const result = await CATEGORY_MODELS.getAllCategory();
    return result;
  },
  getCategoryById: async (id) => {
    const result = await CATEGORY_MODELS.getCategoryById(id);
    if (!result) {
      throw new NotFoundError("Category not found");
    }
    return result;
  },
  createCategory: async (data) => {
    // check if category name already exists
    const checkCategory = await CATEGORY_MODELS.getCategoryByName(data);
    if (checkCategory) {
      throw new BadRequest("Category name already exists");
    }
    const result = await CATEGORY_MODELS.createCategory(data);
    return result;
  },
  updateCategory: async (id, data) => {
    // check if category name already exists
    const checkCategory = await CATEGORY_MODELS.getCategoryByName(data);
    if (checkCategory) {
      throw new BadRequest("Category name already exists");
    }
    const result = await CATEGORY_MODELS.updateCategory(id, data);
    return result;
  },
  deleteCategory: async (id) => {
    const checkCategory = await CATEGORY_MODELS.getCategoryById(id);
    if (!checkCategory) {
      throw new NotFoundError("Category not found");
    }
    const result = await CATEGORY_MODELS.deleteCategory(id);
    return result;
  },
};

module.exports = CATEGORY_SERVICE;
