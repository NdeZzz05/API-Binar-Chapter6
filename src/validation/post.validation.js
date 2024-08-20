const JOI = require("joi");

const POST_VALIDATION = {
  create: (payload) => {
    const schema = JOI.object({
      title: JOI.string().required().max(50),
      content: JOI.string().required(),
      author_id: JOI.string().required(),
      category_id: JOI.string().required(),
    });
    return schema.validate(payload);
  },
};

module.exports = POST_VALIDATION;
