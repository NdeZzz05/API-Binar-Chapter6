const JOI = require("joi");

const CATEGORY_VALIDATION = {
  create: (payload) => {
    const schema = JOI.object({
      name: JOI.string().required(),
    });
    return schema.validate(payload);
  },
};

module.exports = CATEGORY_VALIDATION;
