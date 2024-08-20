const { UnauthorizedError } = require("../errors/customsErrors");
const { decodeToken } = require("../utils/auth.utils");
const { JWT_SECRET_KEY } = process.env;

const AuthMiddleware = async (req, res, next) => {
  const TOKEN = req.header("Authorization");

  try {
    if (!TOKEN) throw new UnauthorizedError("Sorry, you have to log in first");

    const TOKEN_VALUE = TOKEN.split(" ")[1];

    const decoded = await decodeToken(TOKEN_VALUE, JWT_SECRET_KEY);
    req.user = decoded;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = AuthMiddleware;
