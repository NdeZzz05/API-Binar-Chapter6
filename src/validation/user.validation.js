const JOI = require("joi");

const USER_VALIDATION = {
  updateUser: (payload) => {
    const schema = JOI.object({
      email: JOI.string().email().required(),
      username: JOI.string().min(3).max(30).required(),
      password: JOI.string().min(8).pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#\\$%\\^&\\*])")).required().messages({
        "string.pattern.base": "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      }),
    });
    return schema.validate(payload);
  },
};

module.exports = USER_VALIDATION;
