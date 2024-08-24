const upload = require("../config/storage");
const imageKitConfig = require("../config/lib/imagekit");
const USER_SERVICES = require("../services/user.service");
const qr = require("node-qr-image");
const USER_VALIDATION = require("../validation/user.validation");
const { BadRequest } = require("../errors/customsErrors");

const USER_CONTROLLER = {
  getAllUser: async (req, res, next) => {
    try {
      const result = await USER_SERVICES.getAllUser(req.query);
      res.status(200).json({
        success: true,
        message: "Users fetched successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },
  getUserById: async (req, res, next) => {
    try {
      const result = await USER_SERVICES.getUserById(req.params.id);
      res.status(200).json({
        success: true,
        message: "User fetched successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },
  getPostUserById: async (req, res, next) => {
    try {
      const result = await USER_SERVICES.getPostUserById(req.params.id);
      res.status(200).json({
        success: true,
        message: "User's posts fetched successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },
  updateUser: async (req, res, next) => {
    try {
      const { error, value } = USER_VALIDATION.updateUser(req.body);
      if (error) throw new BadRequest(error.details[0].message);

      const data = {
        file: req.file || null,
        body: value,
      };

      const result = await USER_SERVICES.updateUser(req.params.id, data);
      res.status(200).json({
        success: true,
        message: "User updated successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },
  deleteUser: async (req, res, next) => {
    try {
      const result = await USER_SERVICES.deleteUser(req.params.id);
      res.status(200).json({
        success: true,
        message: "User deleted successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },

  uploadBannerProfile: async (req, res, next) => {
    const file = req.file;
    // if (!file) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "No file uploaded",
    //   });
    // }

    // Pakai Promise
    // Manggil config imagekit
    imageKitConfig
      .upload({
        // buffer: suatu file yang sudah dibentuk jadi suatu code
        file: file.buffer.toString("base64"), // Required
        fileName: file.originalname,
        // untuk memasukkan file ke dalam folder di imagekit
        folder: "/binar-assets",
        // optional boleh pakai atau tidak
        tags: ["member-banner"],
      })
      .then((response) => {
        // Success
        console.log(response);
        res.json({
          message: "POST Member API",
          data: response,
        });
      })
      .catch((error) => {
        // Failure
        console.log(error);
        res.status(400).json({
          message: error,
        });
      });
  },
  qrMemberGenerator: async (req, res) => {
    const value_qr = {
      name: "biaya tambahan",
      price: 1000,
      expired: "2021-12-31",
    };
    const qr_image = qr.image(JSON.stringify(value_qr), { type: "png", size: 100 });
    ////// Ini langsung response outputnya qr qode
    // res.type("png");
    // qr_image.pipe(res);

    ////// config untuk simpan file hasil qr code nya
    // [1]
    // const outputDir = path.join(__dirname, "../public/images");
    // const outputFile = path.join(outputDir, `qr-${req.params.id}.png`);
    // const writeStream = fs.createWriteStream(outputFile);
    // qr_image.pipe(writeStream);

    // [2]
    // qr_image.pipe(fs.createWriteStream(`../public/images/qr-${req.params.id}.png`));
    // res.status(200).json({
    //   message: "QR Code generated successfully",
    //   data: `qr-${req.params.id}.png`,
    // });

    // [3] disimpan ke imagekitio
    let chunks = [];
    qr_image.on("data", (chunk) => {
      chunks.push(chunk);
    });
    qr_image.on("end", () => {
      const buffer = Buffer.concat(chunks);
      // Promise
      imageKitConfig
        .upload({
          file: buffer.toString("base64"), // Required
          fileName: "qr-code-" + req.params.id + ".png",
          folder: "/binar-assets",
          tags: ["member-qr"],
        })
        .then((response) => {
          // Success
          console.log(response);
          res.json({
            message: "POST Member API",
            data: response,
          });
        })
        .catch((error) => {
          // Failure
          console.log(error);
          res.status(400).json({
            message: error,
          });
        });
    });
  },
};

module.exports = USER_CONTROLLER;
