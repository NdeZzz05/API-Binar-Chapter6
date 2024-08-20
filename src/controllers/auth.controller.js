const { BadRequest } = require("../errors/customsErrors");
const AUTH_SERVICE = require("../services/auth.service");
const AUTH_VALIDATION = require("../validation/auth.validation");

const AUTH_CONTROLLER = {
  register: async (req, res, next) => {
    try {
      const { error, value } = AUTH_VALIDATION.register(req.body);
      if (error) throw new BadRequest(error.details[0].message);

      const result = await AUTH_SERVICE.register(value);
      res.status(200).json({
        success: true,
        message: "Successfully get regis",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },

  login: async (req, res, next) => {
    try {
      const result = await AUTH_SERVICE.login(req.body);
      res.status(200).json({
        success: true,
        message: "Successfully logged in",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = AUTH_CONTROLLER;
