const prisma = require("../config/prisma");

const CATEGORY_MODELS = {
  getAllCategory: async () => {
    const result = await prisma.category.findMany({
      select: {
        id: true,
        name: true,
      },
    });
    return result;
  },
  getCategoryById: async (id) => {
    const result = await prisma.category.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
      },
    });
    return result;
  },
  getCategoryByName: async (data) => {
    const { name } = data;
    const result = await prisma.category.findFirst({
      where: { name },
      select: {
        id: true,
        name: true,
      },
    });
    return result;
  },
  createCategory: async (data) => {
    const { name } = data;
    const result = await prisma.category.create({
      data: {
        name,
      },
    });
    return result;
  },
  updateCategory: async (id, data) => {
    const { name } = data;
    const result = await prisma.category.update({
      where: { id },
      data: {
        name,
      },
    });
    return result;
  },
  deleteCategory: async (id) => {
    const result = await prisma.category.delete({
      where: { id },
    });
    return result;
  },
};

module.exports = CATEGORY_MODELS;
