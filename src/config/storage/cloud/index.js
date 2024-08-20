const multer = require("multer");
const { BadRequest } = require("../../../errors/customsErrors");

// Konfigurasi penyimpanan ke memory
// const storage = multer.memoryStorage();
// const cloudUpload = multer({
//   storage: storage,
//   limits: { fileSize: 10 * 1024 * 1024 },

//   fileFilter: function (req, file, cb) {
//     if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
//       return cb(new Error("Only image files are allowed!"), false);
//     }
//     cb(null, true);
//   },
// });

// Sama seperti di atas, untuk pengecekan file apa aja yg support diupload (tapi ini lebih dinamis), jadi bisa dicustom lewat parameter routesnya
function cloud(allowedTypes) {
  const storage = multer.memoryStorage();

  const cloudUpload = multer({
    storage: storage,
    limits: {
      fileSize: 2 * 1024 * 1024, // 2 MB
    },
    fileFilter: function (req, file, cb) {
      if (!allowedTypes.includes(file.mimetype)) {
        return cb(new BadRequest("File type is not supported"));
      }
      cb(null, true);
    },
  });

  return cloudUpload;
}

module.exports = { cloud };
