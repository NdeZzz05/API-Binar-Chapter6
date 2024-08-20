const bcrypt = require("bcrypt");
const AUTH_MODELS = require("../models/auth.models");
const jwt = require("jsonwebtoken");
const { BadRequest } = require("../errors/customsErrors");
const { JWT_SECRET_KEY } = process.env;

const AUTH_SERVICE = {
  register: async (data) => {
    const checkEmail = await AUTH_MODELS.checkEmail(data.email);
    const checkUsername = await AUTH_MODELS.checkUsername(data.username);

    if (checkEmail || checkUsername) {
      throw new BadRequest("Registrasi gagal, Harap coba lagi");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    data.password = hashedPassword;

    const result = await AUTH_MODELS.register(data);
    return result;
  },
  login: async (data) => {
    const { password } = data;
    const result = await AUTH_MODELS.checkEmail(data.email);

    if (!result) throw new BadRequest("User tidak terdaftar");

    const isPasswordMatch = bcrypt.compareSync(password, result.password);
    if (!isPasswordMatch) throw new BadRequest("Email atau password salah");

    const payload_token = {
      id: result.id,
      email: result.email,
      role: result.role,
    };

    let token = jwt.sign(payload_token, JWT_SECRET_KEY);

    return {
      user: payload_token,
      token,
    };
  },
};

module.exports = AUTH_SERVICE;
