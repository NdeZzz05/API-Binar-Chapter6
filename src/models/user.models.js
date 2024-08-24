const prisma = require("../config/prisma");

const USER_MODELS = {
  getAllUser: async (where) => {
    const result = await prisma.user.findMany({
      where,
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
      },
    });
    return result;
  },
  getUserById: async (id) => {
    const result = await prisma.user.findUnique({
      where: { id },
    });
    return result;
  },
  getPostUserById: async (id) => {
    const result = await prisma.post.findMany({
      where: { author_id: id },
      select: {
        id: true,
        title: true,
        post_picture: true,
        content: true,
        createdAt: true,
        updatedAt: true,
        category: {
          select: {
            name: true,
          },
        },
      },
    });
    return result;
  },
  updateUser: async (id, data) => {
    const result = await prisma.user.update({
      where: { id },
      data: {
        username: data.username,
        email: data.email,
        password: data.password,
        profile_picture: data.profile_picture,
      },
    });
    return result;
  },
  deleteUser: async (id) => {
    const result = await prisma.user.delete({
      where: { id },
    });
    return result;
  },
};

module.exports = USER_MODELS;
