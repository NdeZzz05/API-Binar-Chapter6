const imageKitConfig = require("../config/lib/imagekit");
const { BadRequest } = require("../errors/customsErrors");
const USER_MODELS = require("../models/user.models");

const USER_SERVICES = {
  getAllUser: async (data) => {
    const { name } = data;

    const where = {};
    if (name) {
      where.name = { contains: name, mode: "insensitive" }; // 'contains' digunakan untuk pencarian parsial, 'mode: insensitive' untuk pencarian case-insensitive
    }
    const result = await USER_MODELS.getAllUser(where);
    return result;
  },
  getUserById: async (id) => {
    const result = await USER_MODELS.getUserById(id);
    if (!result) throw new BadRequest("User not found");

    return result;
  },
  getPostUserById: async (id) => {
    const checkUser = await USER_MODELS.getUserById(id);
    if (!checkUser) throw new BadRequest("User not found");

    const result = await USER_MODELS.getPostUserById(id);

    return result;
  },
  updateUser: async (id, data) => {
    try {
      const { file, body } = data;

      const checkUser = await USER_MODELS.getUserById(id);
      if (!checkUser) throw new BadRequest("User not found");

      let imageUrl = checkUser.profile_picture;
      if (file) {
        const response = await imageKitConfig.upload({
          file: file.buffer.toString("base64"), // Required
          fileName: Date.now() + "-" + file.originalname,
          folder: "/binar-assets",
          tags: ["member-post"],
        });

        if (!response) throw new BadRequest("Something went wrong");

        imageUrl = response.url;
      }

      const datas = {
        ...body,
        profile_picture: imageUrl,
      };
      console.log(datas);

      const result = await USER_MODELS.updateUser(id, datas);
      return result;
    } catch (error) {
      throw error;
    }
  },
  deleteUser: async (id) => {
    const result = await USER_MODELS.deleteUser(id);
    if (!result) throw new BadRequest("User not found");

    return result;
  },
};

module.exports = USER_SERVICES;
