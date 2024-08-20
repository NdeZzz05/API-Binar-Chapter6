const { UnauthorizedError } = require("../errors/customsErrors");
const jwt = require("jsonwebtoken");

const AUTH_UTILS = {
  decodeToken: (token, secret) => {
    return new Promise((resolve, reject) => {
      jwt.verify(token, secret, (err, decode) => {
        if (err) reject(new UnauthorizedError("Invalid token"));
        resolve(decode);
      });
    });
  },
};

module.exports = AUTH_UTILS;
