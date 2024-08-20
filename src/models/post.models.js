const prisma = require("../config/prisma");

const POST_MODELS = {
  getAllPost: async () => {
    const result = await prisma.post.findMany({
      select: {
        id: true,
        title: true,
        post_picture: true,
        content: true,
        createdAt: true,
        updatedAt: true,
        author: {
          select: {
            username: true,
          },
        },
        category: {
          select: {
            name: true,
          },
        },
      },
    });
    return result;
  },
  getPostById: async (id) => {
    const result = await prisma.post.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        post_picture: true,
        content: true,
        createdAt: true,
        updatedAt: true,
        author: {
          select: {
            username: true,
          },
        },
        category: {
          select: {
            name: true,
          },
        },
      },
    });
    return result;
  },
  createPost: async (data) => {
    const result = await prisma.post.create({
      data,
    });
    return result;
  },
  updatePost: async (id, data) => {
    const result = await prisma.post.update({
      where: { id },
      data,
    });
    return result;
  },
  deletePost: async (id) => {
    const result = await prisma.post.delete({
      where: { id },
    });
    return result;
  },
};

module.exports = POST_MODELS;
