const prisma = require("../config/prisma");

const AUTH_MODELS = {
  checkEmail: async (email) => {
    const result = await prisma.user.findUnique({ where: { email } });
    return result;
  },

  checkUsername: async (username) => {
    const result = await prisma.user.findUnique({ where: { username } });
    return result;
  },

  register: async (data) => {
    const { username, email, password } = data;

    const result = await prisma.user.create({
      data: {
        username,
        email,
        password,
      },
    });
    return result;
  },
};

module.exports = AUTH_MODELS;
