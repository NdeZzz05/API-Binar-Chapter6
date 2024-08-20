const imageKitConfig = require("../config/lib/imagekit");
const { BadRequest } = require("../errors/customsErrors");
const CATEGORY_MODELS = require("../models/category.models");
const POST_MODELS = require("../models/post.models");
const USER_MODELS = require("../models/user.models");

const POST_SERVICE = {
  getAllPost: async () => {
    const result = await POST_MODELS.getAllPost();
    return result;
  },
  getPostById: async (id) => {
    const result = await POST_MODELS.getPostById(id);
    if (!result) {
      throw new NotFoundError("Post not found");
    }
    return result;
  },
  createPost: async (data) => {
    const { file, body } = data;

    // Check author
    const checkAuthor = await USER_MODELS.getUserById(body.author_id);
    if (!checkAuthor) throw new BadRequest("Author not found");

    // Check category
    const checkCategory = await CATEGORY_MODELS.getCategoryById(body.category_id);
    if (!checkCategory) throw new BadRequest("Category not found");

    // Image
    let imageUrl = null;
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
    if (!file) throw new BadRequest("file image required");

    const datas = {
      ...body,
      post_picture: imageUrl,
    };

    const result = await POST_MODELS.createPost(datas);
    return result;
  },
  updatePost: async (id, data) => {
    const { file, body } = data;

    // Check post
    const checkPost = await POST_MODELS.getPostById(id);
    if (!checkPost) throw new BadRequest("Post not found");

    // Check author
    const checkAuthor = await USER_MODELS.getUserById(body.author_id);
    if (!checkAuthor) throw new BadRequest("Author not found");

    // Check category
    const checkCategory = await CATEGORY_MODELS.getCategoryById(body.category_id);
    if (!checkCategory) throw new BadRequest("Category not found");

    let imageUrl = checkPost.post_picture;
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
      post_picture: imageUrl,
    };

    const result = await POST_MODELS.updatePost(id, datas);
    return result;
  },
  deletePost: async (id) => {
    // Check post
    const checkPost = await POST_MODELS.getPostById(id);
    if (!checkPost) throw new BadRequest("Post not found");

    // Check post picture
    if (!checkPost.post_picture) throw new BadRequest("Post picture not found");

    // Retrieve the file from ImageKit by URL
    const files = await imageKitConfig.listFiles({
      url: checkPost.post_picture,
    });

    // Mencari indeks gambar dengan URL yang cocok
    // Mencari file dengan URL yang cocok
    // split untuk menghilangkan query params
    const fileToRemove = files.find((file) => file.url.split("?")[0] === checkPost.post_picture);
    if (!fileToRemove) throw new BadRequest("Post picture not found on ImageKit.io");

    // Delete the file from ImageKit using the fileId
    await imageKitConfig.deleteFile(fileToRemove.fileId);

    const result = await POST_MODELS.deletePost(id);
    return result;
  },
};

module.exports = POST_SERVICE;
